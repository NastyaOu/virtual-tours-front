<script setup lang="ts">
import Video from './components/Video.vue'
import Photo from './components/Photo.vue'
import Info from './components/Info.vue'

import { TresCanvas, useTexture } from '@tresjs/core'
import { MathUtils, Texture, Vector3 } from 'three'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getLocation, getLocations } from '@/services/location-service'
import {
  type ITransition,
  type IInfoBlock,
  type ILocation,
  type IMedia
} from '@/interfaces/Location'
import { getFileName } from '@/helpers'

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

const lon = ref(0)
const lat = ref(0)

const onPointerDownMouseX = ref(0)
const onPointerDownMouseY = ref(0)
const onPointerDownLon = ref(0)
const onPointerDownLat = ref(0)

const onPointerDown = (event: PointerEvent) => {
  if (event.isPrimary === false) return

  onPointerDownMouseX.value = event.clientX
  onPointerDownMouseY.value = event.clientY

  onPointerDownLon.value = lon.value
  onPointerDownLat.value = lat.value

  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
}

const onPointerMove = (event: PointerEvent) => {
  if (event.isPrimary === false) return

  lon.value = (onPointerDownMouseX.value - event.clientX) * 0.1 + onPointerDownLon.value
  lat.value = (event.clientY - onPointerDownMouseY.value) * 0.1 + onPointerDownLat.value
}

const onPointerUp = (event: PointerEvent) => {
  if (event.isPrimary === false) return

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

const route = useRoute()

const locations = ref<ILocation[]>([])

const infoBlocks = ref<IInfoBlock[]>([])

const isInfoOpen = ref(false)
const currentInfo = ref('')

const photos = ref<IMedia[]>([])

const isPhotoOpen = ref(false)
const currentPhoto = ref('')

const videos = ref<IMedia[]>([])

const isVideoOpen = ref(false)
const currentVideo = ref('')

const transitions = ref<ITransition[]>([])

const show = ref(false)

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)

  getLocations(Number(route.params.id)).then((res) => {
    locations.value = res

    loadLocation(locations.value[0].idLocation)
  })
})

const loadLocation = (idLocation: number) => {
  show.value = false

  getLocation(idLocation).then((res) => {
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
  const radius = 7
  const theta = MathUtils.degToRad(coordX)
  const phi = MathUtils.degToRad(coordY)

  const x = radius * Math.sin(theta) * Math.cos(phi)
  const y = radius * Math.sin(theta) * Math.sin(phi)
  const z = radius * Math.cos(theta)

  return new Vector3(x, y, z)
}

const getLookAt = (coordX: number, coordY: number) => {
  return new Vector3().subVectors(zeroCoords.value, getPosition(coordX, coordY)).normalize()
}

const onInfoClick = (idInfoBlock: number) => {
  currentInfo.value = infoBlocks.value.find(
    (infoBlock) => infoBlock.idInfoBlock === idInfoBlock
  )!.text

  isInfoOpen.value = true
}

const onInfoClose = () => {
  isInfoOpen.value = false
  currentInfo.value = ''
}

const onPhotoClick = (idMedia: number) => {
  currentPhoto.value = getFileName(photos.value.find((photo) => photo.idMedia === idMedia)!.fileSrc)

  isPhotoOpen.value = true
}

const onPhotoClose = () => {
  isPhotoOpen.value = false
  currentPhoto.value = ''
}

const onVideoClick = (idMedia: number) => {
  currentVideo.value = getFileName(videos.value.find((video) => video.idMedia === idMedia)!.fileSrc)

  isVideoOpen.value = true
}

const onVideoClose = () => {
  isVideoOpen.value = false
  currentVideo.value = ''
}

const onTransitionClick = (idTransition: number) => {
  const idLocation = transitions.value.find(
    (transition) => transition.idTransition === idTransition
  )?.idTargetLocation

  loadLocation(idLocation!)
}
</script>

<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>

  <Info v-if="isInfoOpen" :text="currentInfo" @close="onInfoClose"></Info>
  <Photo v-if="isPhotoOpen" :src="currentPhoto" @close="onPhotoClose"></Photo>
  <Video v-if="isVideoOpen" :src="currentVideo" @close="onVideoClose"></Video>

  <TresCanvas v-if="show" window-size>
    <TresPerspectiveCamera :look-at="cameraLookAt" :position="zeroCoords"> </TresPerspectiveCamera>

    <TresMesh :scale="meshScale" :position="zeroCoords">
      <TresSphereGeometry :args="[sphereRadius, 60, 60]"> </TresSphereGeometry>
      <TresMeshBasicMaterial :side="1" :map="backgroundMap"> </TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="infoBlock in infoBlocks"
      :key="infoBlock.idInfoBlock"
      :look-at="getLookAt(infoBlock.coordX, infoBlock.coordY)"
      :position="getPosition(infoBlock.coordX, infoBlock.coordY)"
      @click="onInfoClick(infoBlock.idInfoBlock)"
    >
      <TresPlaneGeometry :args="[0.3, 0.3]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnInfoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="photo in photos"
      :key="photo.idMedia"
      :look-at="getLookAt(photo.coordX, photo.coordY)"
      :position="getPosition(photo.coordX, photo.coordY)"
      @click="onPhotoClick(photo.idMedia)"
    >
      <TresPlaneGeometry :args="[0.3, 0.3]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnPhotoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="video in videos"
      :key="video.idMedia"
      :look-at="getLookAt(video.coordX, video.coordY)"
      :position="getPosition(video.coordX, video.coordY)"
      @click="onVideoClick(video.idMedia)"
    >
      <TresPlaneGeometry :args="[0.3, 0.3]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnVideoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="transition in transitions"
      :key="transition.idTransition"
      :look-at="getLookAt(transition.coordX, transition.coordY)"
      :position="getPosition(transition.coordX, transition.coordY)"
      @click="onTransitionClick(transition.idTransition)"
    >
      <TresPlaneGeometry :args="[0.3, 0.3]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnTransitionMap"></TresMeshBasicMaterial>
    </TresMesh>
  </TresCanvas>
</template>

<style scoped>
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
