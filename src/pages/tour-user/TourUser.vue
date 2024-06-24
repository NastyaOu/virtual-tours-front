<script setup lang="ts">
import Video from './components/Video.vue'
import Photo from './components/Photo.vue'
import Info from './components/Info.vue'

import { TresCanvas, useTexture } from '@tresjs/core'
import { MathUtils, Texture, Vector3 } from 'three'
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

// засчет этого осуществляется вращение камерой
// cameraLookAt-это computed свойство(как бы прокаченная реактивная переменная, которая постоянно обновляется)
// снижает производительность приложения, но она обеспечивает актуальные данные
const cameraLookAt = computed(() => {
  // переходим к другим системам координат(нам надо из двух(x и y) в три(x,y,z, которые будут в сферической системе координат))
  lat.value = Math.max(-85, Math.min(85, lat.value))
  const phi = MathUtils.degToRad(90 - lat.value)
  const theta = MathUtils.degToRad(lon.value)

  // формулы с википедии(сферическая система координат), только y и z наоборот
  const x = sphereRadius * Math.sin(phi) * Math.cos(theta)
  const y = sphereRadius * Math.cos(phi)
  const z = sphereRadius * Math.sin(phi) * Math.sin(theta)

  // возвращает координаты, куда надо смотреть
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

// функция загрузки локации, запрашивает айди
const loadLocation = (idLocation: number) => {
  show.value = false

  // передает айди дальше, когда запрашивает с бэкенда локацию
  getLocation(idLocation).then((res) => {
    infoBlocks.value = res.infoBlocks
    photos.value = res.media.filter((media) => media.type === 'photo')
    videos.value = res.media.filter((media) => media.type === 'video')
    transitions.value = res.transitions

    // делаем из фотографии текстуру, текстура накладывается на элемент в 3д пространстве(в этой библиотеке нужно использовать текстуру, а не просто изображение)
    useTexture({
      map: getFileName(res.image)
    }).then((res) => {
      const backgroundTexture = res

      backgroundMap.value = backgroundTexture.map
    })
  })

  // спустя 100 миллисекунд показывает загруженную локацию(для избежания ошибки, когда фото не загружалось)
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

// запоминаем какой открывается инфоблок и просто открываем модальное окно
const onInfoClick = (idInfoBlock: number) => {
  currentInfo.value = infoBlocks.value.find(
    (infoBlock) => infoBlock.idInfoBlock === idInfoBlock
  )!.text

  isInfoOpen.value = true
}

// закрываем окно и опустошаем текущий инфоблок
const onInfoClose = () => {
  isInfoOpen.value = false
  currentInfo.value = ''
}

const onPhotoClick = (idMedia: number) => {
  currentPhoto.value = getFileName(photos.value.find((photo) => photo.idMedia === idMedia)!.fileSrc)

  isPhotoOpen.value = true
}

// закрываем окно и удаляем текущее фото
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

const router = useRouter()

const onBackButtonClick = () => {
  router.push(`/organization/${route.params.id}`)
}
</script>

<template>
  <button @click="onBackButtonClick" class="back-button">Назад</button>

  <div class="loader-container">
    <div class="loader"></div>
  </div>

  <!-- если окно открыто, принимаем какие-то данные и реагируем на клоуз -->
  <Info v-if="isInfoOpen" :text="currentInfo" @close="onInfoClose"></Info>
  <Photo v-if="isPhotoOpen" :src="currentPhoto" @close="onPhotoClose"></Photo>
  <Video v-if="isVideoOpen" :src="currentVideo" @close="onVideoClose"></Video>

  <!-- tres это надстройка над оригинальной библиотекой tree.js. она позволяет прямо в коде template писать tree.js функционал в формате формате тегов -->
   <!-- в основе любого 3д элемента всегда лежит  Canvas-->
    <!-- проп window-size для того, чтобы расстягивать тур на всю страницу. output-color-space назначает цветовое пространство, чтобы не было засветления в цветах-->
     <!-- управляется засчет переменной show -->
  <TresCanvas v-if="show" window-size output-color-space="srgb-linear">
    <!-- камера-то есть точка обзора. мы управляем направлением, куда она смотрит(look-at) и ее позицией(position, изначально 0)-->
    <TresPerspectiveCamera :look-at="cameraLookAt" :position="zeroCoords"> </TresPerspectiveCamera>

    <!-- создается сфера -->
     <!-- выворачиваем сферу по координате х(meshScale), чтобы мы могли видеть сферу в нужном нам фопмате и натянуть на нее изображение -->
      <!-- позиция нулевая, то есть мы находимся в центре сферы -->
    <TresMesh :scale="meshScale" :position="zeroCoords">
      <!-- геометрия сферы модержит радиус -->
      <TresSphereGeometry :args="[sphereRadius, 60, 60]"> </TresSphereGeometry>
      <!-- в материал в текстуру(map) загружаем текстуру, которую мы создавали при загрузке локации. 
       так рисуется вывернутая сфера, у которой натянута текстура нашего изображения локации -->
      <TresMeshBasicMaterial :side="1" :map="backgroundMap"> </TresMeshBasicMaterial>
    </TresMesh>

    <!-- вью позволяет выводит различные элементы циклически. это позволяет динамически их выводить. для этого требуется ключевое слово v-for
     затем мы берем элемент infoBlock из массива infoBlocks -->
     <!-- key ключ требуется для внутренних механизмов вью, и он позволяет более правильно обновлять все эти элементы. 
      в качестве ключа должно быть что-то уникальное, у нас это идентификатор информационного блока -->
      <!-- look-at как и у камеры. только здесь мы из нулевых координат вычитаем координаты инфоблока и нормализуем.
       таким образом мы получаем направление, в котором должна смотреть наш Mesh -->
       <!-- position позиция вычисляется в зависимости от координат x и y(как в бд хранятся). снова переходим к сферической системе координат -->
        <!-- click, то есть открывается при нажатии на него -->
    <TresMesh
      v-for="infoBlock in infoBlocks"
      :key="infoBlock.idInfoBlock"
      :look-at="getLookAt(infoBlock.coordX, infoBlock.coordY)"
      :position="getPosition(infoBlock.coordX, infoBlock.coordY)"
      @click="onInfoClick(infoBlock.idInfoBlock)"
    >
    <!-- плоская геометрия размером 30 на 30 -->
      <TresPlaneGeometry :args="[30, 30]"></TresPlaneGeometry>
      <!-- точно также натягивается материал, у которого прозрачный фон(transparent) и одна только текстура(map), которая представляет собои изображение кнопки -->
      <TresMeshBasicMaterial transparent :map="btnInfoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="photo in photos"
      :key="photo.idMedia"
      :look-at="getLookAt(photo.coordX, photo.coordY)"
      :position="getPosition(photo.coordX, photo.coordY)"
      @click="onPhotoClick(photo.idMedia)"
    >
      <TresPlaneGeometry :args="[30, 30]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnPhotoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="video in videos"
      :key="video.idMedia"
      :look-at="getLookAt(video.coordX, video.coordY)"
      :position="getPosition(video.coordX, video.coordY)"
      @click="onVideoClick(video.idMedia)"
    >
      <TresPlaneGeometry :args="[30, 30]"></TresPlaneGeometry>
      <TresMeshBasicMaterial transparent :map="btnVideoMap"></TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh
      v-for="transition in transitions"
      :key="transition.idTransition"
      :look-at="getLookAt(transition.coordX, transition.coordY)"
      :position="getPosition(transition.coordX, transition.coordY)"
      @click="onTransitionClick(transition.idTransition)"
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

.loader-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* отвечает за загрузку(три точки) */
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
