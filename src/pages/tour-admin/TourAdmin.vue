<script setup lang="ts">
import Video from './components/Video.vue'
import Photo from './components/Photo.vue'
import Info from './components/Info.vue'
import Menu from './components/Menu.vue'
import AddVideo from './components/AddVideo.vue'
import AddPhoto from './components/AddPhoto.vue'
import AddInfo from './components/AddInfo.vue'
import AddTransition from './components/AddTransition.vue'
import ConfirmDelBox from '@/pages/shared/ConfirmDelBox.vue'

import { TresCanvas, useTexture, type ThreeEvent } from '@tresjs/core'
import { MathUtils, Texture, Vector3, type Intersection } from 'three'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getLocation, getLocations } from '@/services/location-service'
import {
  type ITransition,
  type IInfoBlock,
  type ILocation,
  type IMedia
} from '@/interfaces/Location'
import { getFileName } from '@/helpers'
import { createInfoBlock, updateInfoBlock, deleteInfoBlock } from '@/services/info-block-service'
import { createMedia, updateMedia, deleteMedia } from '@/services/media-service'
import { createTransition, updateTransition, deleteTransition } from '@/services/transition-service'

const route = useRoute()

const meshScale = new Vector3(-1, 1, 1)

const btnVideoTexture = await useTexture({
  map: '/src/assets/btn_video.svg'
})
const btnVideoMap = btnVideoTexture.map

const btnPhotoTexture = await useTexture({
  map: '/src/assets/btn_photo.svg'
})
const btnPhotoMap = btnPhotoTexture.map

const btnInfoTexture = await useTexture({
  map: '/src/assets/btn_info.svg'
})
const btnInfoMap = btnInfoTexture.map

const btnTransitionTexture = await useTexture({
  map: '/src/assets/btn_transition.svg'
})
const btnTransitionMap = btnTransitionTexture.map

const sphereRadius = 500

const isDraggingCamera = ref(false)
const isDraggingObject = ref(false)

const lon = ref(0)
const lat = ref(0)

const onPointerDownMouseX = ref(0)
const onPointerDownMouseY = ref(0)
const onPointerDownLon = ref(0)
const onPointerDownLat = ref(0)

const onHoveredObjectPointerDownMouseX = ref(0)
const onHoveredObjectPointerDownMouseY = ref(0)
const onHoveredObjectPointerDownLon = ref(0)
const onHoveredObjectPointerDownLat = ref(0)

const onPointerDown = (event: PointerEvent) => {
  if (event.isPrimary === false) return

  isDraggingCamera.value = true
  isDraggingObject.value = false

  onPointerDownMouseX.value = event.clientX
  onPointerDownMouseY.value = event.clientY

  onPointerDownLon.value = lon.value
  onPointerDownLat.value = lat.value

  if (hoveredObject.value) {
    isDraggingCamera.value = false
    isDraggingObject.value = true

    onHoveredObjectPointerDownMouseX.value = event.clientX
    onHoveredObjectPointerDownMouseY.value = event.clientY

    onHoveredObjectPointerDownLon.value = hoveredObject.value.coordX
    onHoveredObjectPointerDownLat.value = hoveredObject.value.coordY
  }

  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
}

const onPointerMove = (event: PointerEvent) => {
  if (event.isPrimary === false) return

  if (isDraggingCamera.value) {
    lon.value = (onPointerDownMouseX.value - event.clientX) * 0.1 + onPointerDownLon.value
    lat.value = (event.clientY - onPointerDownMouseY.value) * 0.1 + onPointerDownLat.value
  }

  if (isDraggingObject.value) {
    hoveredObject.value!.coordX =
      (onHoveredObjectPointerDownMouseX.value - event.clientX) * -0.055 +
      onHoveredObjectPointerDownLon.value
    hoveredObject.value!.coordY =
      (onHoveredObjectPointerDownMouseY.value - event.clientY) * 0.055 +
      onHoveredObjectPointerDownLat.value

    console.log(hoveredObject.value)
  }
}

const onPointerUp = (event: PointerEvent) => {
  if (event.isPrimary === false) return
  isDraggingCamera.value = false

  if (isDraggingObject.value) {
    isDraggingObject.value = false

    switch (hoveredObjectType.value) {
      case 'info':
        const infoBlock = hoveredObject.value as IInfoBlock
        updateInfoBlock(
          infoBlock.idInfoBlock,
          infoBlock.text,
          infoBlock.coordX,
          infoBlock.coordY
        ).then(() => {
          refreshLocation()
        })
        break
      case 'media':
        const media = hoveredObject.value as IMedia
        updateMedia(media.idMedia, media.coordX, media.coordY).then(() => {
          refreshLocation()
        })
        break
      case 'transition':
        const transition = hoveredObject.value as ITransition
        updateTransition(transition.idTransition, transition.coordX, transition.coordY).then(() => {
          refreshLocation()
        })
    }
  }

  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
}

const cameraLookAt = computed(() => {
  lat.value = Math.max(-85, Math.min(85, lat.value))
  const phi = MathUtils.degToRad(90 - lat.value)
  const theta = MathUtils.degToRad(lon.value)

  const x = sphereRadius * Math.sin(phi) * Math.cos(theta)
  const y = sphereRadius * Math.cos(phi)
  const z = sphereRadius * Math.sin(phi) * Math.sin(theta)

  return [x, y, z]
})

const zeroCoords = ref<Vector3>(new Vector3(0, 0, 0))
const backgroundMap = ref<Texture>()

const locations = ref<ILocation[]>([])

const infoBlocks = ref<IInfoBlock[]>([])

const isInfoOpen = ref(false)
const currentInfoBlock = ref<IInfoBlock>()

const photos = ref<IMedia[]>([])

const isPhotoOpen = ref(false)
const currentPhoto = ref<IMedia>()

const videos = ref<IMedia[]>([])

const isVideoOpen = ref(false)
const currentVideo = ref<IMedia>()

const transitions = ref<ITransition[]>([])

const show = ref(false)

const refreshLocation = () => {
  getLocation(Number(route.params.locationId)).then((res) => {
    infoBlocks.value = res.infoBlocks
    photos.value = res.media.filter((media) => media.type === 'photo')
    videos.value = res.media.filter((media) => media.type === 'video')
    transitions.value = res.transitions
  })
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)

  getLocations(Number(route.params.id)).then((res) => {
    locations.value = res.filter(
      (location) => location.idLocation !== Number(route.params.locationId)
    )

    loadLocation()
  })
})

const loadLocation = () => {
  show.value = false

  getLocation(Number(route.params.locationId)).then((res) => {
    infoBlocks.value = res.infoBlocks
    photos.value = res.media.filter((media) => media.type === 'photo')
    videos.value = res.media.filter((media) => media.type === 'video')
    transitions.value = res.transitions

    useTexture({
      map: getFileName(res.image)
    }).then((res) => {
      const backgroundTexture = res

      backgroundMap.value = backgroundTexture.map
    })
  })

  setTimeout(() => {
    show.value = true
  }, 100)
}

const getPosition = (coordX: number, coordY: number) => {
  const radius = 490

  coordY = Math.max(-85, Math.min(85, coordY))
  const phi = MathUtils.degToRad(90 - coordY)
  const theta = MathUtils.degToRad(coordX)

  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return new Vector3(x, y, z)
}

const getLookAt = (coordX: number, coordY: number) => {
  return new Vector3().subVectors(zeroCoords.value, getPosition(coordX, coordY)).normalize()
}

const isMenuOpen = ref(false)

const onAddBtnClick = () => {
  isMenuOpen.value = true
}

const onMenuClose = () => {
  isMenuOpen.value = false
}

const onInfoClick = (index: number) => {
  currentInfoBlock.value = infoBlocks.value[index]

  isInfoOpen.value = true
}

const onInfoClose = () => {
  isInfoOpen.value = false
}

const onInfoEdit = (idInfoBlock: number, text: string) => {
  const infoBlock = infoBlocks.value.find((infoBlock) => infoBlock.idInfoBlock === idInfoBlock)

  updateInfoBlock(idInfoBlock, text, infoBlock!.coordX, infoBlock!.coordY).then((res) => {
    currentInfoBlock.value = res
  })

  refreshLocation()
}

const onInfoDelete = (idInfoBlock: number) => {
  deleteInfoBlock(idInfoBlock).then(() => {
    refreshLocation()
  })
}

const isAddInfoOpen = ref(false)

const onAddInfo = () => {
  isAddInfoOpen.value = true
}

const onAddInfoClose = (text?: string) => {
  isAddInfoOpen.value = false

  if (!text) return

  createInfoBlock(Number(route.params.locationId), text, 0, 0).then(() => {
    refreshLocation()
  })
}

const onPhotoClick = (index: number) => {
  currentPhoto.value = photos.value[index]

  isPhotoOpen.value = true
}

const onPhotoClose = () => {
  isPhotoOpen.value = false
}

const onMediaDelete = (idMedia: number) => {
  deleteMedia(idMedia).then(() => {
    refreshLocation()
  })
}

const isAddPhotoOpen = ref(false)

const onAddPhoto = () => {
  isAddPhotoOpen.value = true
}

const onAddPhotoClose = (file?: File) => {
  isAddPhotoOpen.value = false

  if (!file) return

  const formData = new FormData()

  formData.append('coordX', '0')
  formData.append('coordY', '0')
  formData.append('type', 'photo')
  formData.append('file', file)

  createMedia(Number(route.params.locationId), formData).then(() => {
    refreshLocation()
  })
}

const onVideoClick = (index: number) => {
  currentVideo.value = videos.value[index]
  isVideoOpen.value = true
}

const onVideoClose = () => {
  isVideoOpen.value = false
}

const isAddVideoOpen = ref(false)

const onAddVideo = () => {
  isAddVideoOpen.value = true
}

const onAddVideoClose = (file?: File) => {
  isAddVideoOpen.value = false

  if (!file) return

  const formData = new FormData()

  formData.append('coordX', '0')
  formData.append('coordY', '0')
  formData.append('type', 'video')
  formData.append('file', file)

  createMedia(Number(route.params.locationId), formData).then(() => {
    refreshLocation()
  })
}

const isAddTransitionOpen = ref(false)

const onAddTransition = () => {
  isAddTransitionOpen.value = true
}

const onAddTransitionClose = (location?: ILocation) => {
  isAddTransitionOpen.value = false

  if (!location) return

  createTransition(Number(route.params.locationId), 0, 0, location.idLocation).then(() => {
    refreshLocation()
  })
}

const isDelBoxOpen = ref(false)
const deleteCandidate = ref(0)

const onTransitionClick = (idTransition: number) => {
  deleteCandidate.value = idTransition
  isDelBoxOpen.value = true
}

const onDelBoxClose = (result: boolean) => {
  isDelBoxOpen.value = false

  if (result) {
    deleteTransition(deleteCandidate.value).then(() => {
      refreshLocation()
    })
  } else deleteCandidate.value = 0
}

const hoveredObject = ref<IInfoBlock | IMedia | ITransition>()
const hoveredObjectType = ref<'info' | 'media' | 'transition'>()

const onPointerEnter = (type: 'info' | 'media' | 'transition', id: number) => {
  if (isDraggingCamera.value) return

  switch (type) {
    case 'info':
      hoveredObjectType.value = 'info'
      hoveredObject.value = infoBlocks.value.find((infoBlock) => infoBlock.idInfoBlock === id)
      break
    case 'media':
      hoveredObjectType.value = 'media'
      hoveredObject.value =
        photos.value.find((photo) => photo.idMedia === id) ||
        videos.value.find((video) => video.idMedia === id)
      break
    case 'transition':
      hoveredObjectType.value = 'transition'
      hoveredObject.value = transitions.value.find((transition) => transition.idTransition === id)
  }
}

const onPointerLeave = () => {
  hoveredObject.value = undefined
}

const router = useRouter()

const onBackButtonClick = () => {
  router.push(`/admin/organizations/${route.params.id}/locations`)
}
</script>

<template>
  <button @click="onBackButtonClick" class="back-button">Назад</button>

  <div class="loader-container">
    <div class="loader"></div>
  </div>

  <div class="btn">
    <img src="/src/assets/add.svg" width="60px" height="60px" @click="onAddBtnClick" />
  </div>

  <Menu
    v-if="isMenuOpen"
    @close="onMenuClose"
    @add-video="onAddVideo"
    @add-photo="onAddPhoto"
    @add-info="onAddInfo"
    @add-transition="onAddTransition"
  ></Menu>
  <AddVideo v-if="isAddVideoOpen" @close="onAddVideoClose"></AddVideo>
  <AddPhoto v-if="isAddPhotoOpen" @close="onAddPhotoClose"></AddPhoto>
  <AddInfo v-if="isAddInfoOpen" @close="onAddInfoClose"></AddInfo>
  <AddTransition
    v-if="isAddTransitionOpen"
    :locations="locations"
    @close="onAddTransitionClose"
  ></AddTransition>

  <Info
    v-if="isInfoOpen"
    :info-block="currentInfoBlock!"
    @close="onInfoClose"
    @edit="onInfoEdit"
    @delete="onInfoDelete"
  ></Info>
  <Photo
    v-if="isPhotoOpen"
    :photo="currentPhoto!"
    @close="onPhotoClose"
    @delete="onMediaDelete"
  ></Photo>
  <Video
    v-if="isVideoOpen"
    :video="currentVideo!"
    @close="onVideoClose"
    @delete="onMediaDelete"
  ></Video>

  <ConfirmDelBox v-if="isDelBoxOpen" @close="onDelBoxClose"></ConfirmDelBox>

  <TresCanvas v-if="show" window-size output-color-space="srgb-linear">
    <TresPerspectiveCamera :look-at="cameraLookAt" :position="zeroCoords"> </TresPerspectiveCamera>

    <TresMesh :scale="meshScale" :position="zeroCoords">
      <TresSphereGeometry :args="[sphereRadius, 60, 60]"> </TresSphereGeometry>
      <TresMeshBasicMaterial :side="1" :map="backgroundMap"> </TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="(infoBlock, index) in infoBlocks"
      :key="infoBlock.idInfoBlock"
      :look-at="getLookAt(infoBlock.coordX, infoBlock.coordY)"
      :position="getPosition(infoBlock.coordX, infoBlock.coordY)"
      @click="onInfoClick(index)"
      @pointer-enter="onPointerEnter('info', infoBlock.idInfoBlock)"
      @pointer-leave="onPointerLeave"
    >
      <TresPlaneGeometry :args="[30, 30]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnInfoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="(photo, index) in photos"
      :key="photo.idMedia"
      :look-at="getLookAt(photo.coordX, photo.coordY)"
      :position="getPosition(photo.coordX, photo.coordY)"
      @click="onPhotoClick(index)"
      @pointer-enter="onPointerEnter('media', photo.idMedia)"
      @pointer-leave="onPointerLeave"
    >
      <TresPlaneGeometry :args="[30, 30]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnPhotoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="(video, index) in videos"
      :key="video.idMedia"
      :look-at="getLookAt(video.coordX, video.coordY)"
      :position="getPosition(video.coordX, video.coordY)"
      @click="onVideoClick(index)"
      @pointer-enter="onPointerEnter('media', video.idMedia)"
      @pointer-leave="onPointerLeave"
    >
      <TresPlaneGeometry :args="[30, 30]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnVideoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="(transition, index) in transitions"
      :key="transition.idTransition"
      :look-at="getLookAt(transition.coordX, transition.coordY)"
      :position="getPosition(transition.coordX, transition.coordY)"
      @click="onTransitionClick(transition.idTransition)"
      @pointer-enter="onPointerEnter('transition', transition.idTransition)"
      @pointer-leave="onPointerLeave"
    >
      <TresPlaneGeometry :args="[30, 30]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnTransitionMap"></TresMeshBasicMaterial>
    </TresMesh>
  </TresCanvas>
</template>

<style scoped>
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
  font-size: 20px; /* размер текста */
  background-color: rgba(45, 45, 45, 0%); /* цвет кнопки */
  border: 2px solid #fff; /* цвет и размер рамки */
  text-align: center; /* текст по центру */
  color: #fff; /* цвет текста */
  width: 240px; /* ширина */
  height: 65px; /* высота */
}

.btn {
  display: flex; /* элементы в блок */
  padding: 20px 20px; /* отступы */
  align-items: flex-end; /* элементы снизу */
  justify-content: flex-end; /* элементы справа */
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.btn > * {
  cursor: pointer;
}

.loader-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 60px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100% / 3) 100%;
  animation: l7 1s infinite linear;
}
@keyframes l7 {
  33% {
    background-size:
      calc(100% / 3) 0%,
      calc(100% / 3) 100%,
      calc(100% / 3) 100%;
  }
  50% {
    background-size:
      calc(100% / 3) 100%,
      calc(100% / 3) 0%,
      calc(100% / 3) 100%;
  }
  66% {
    background-size:
      calc(100% / 3) 100%,
      calc(100% / 3) 100%,
      calc(100% / 3) 0%;
  }
}
</style>
