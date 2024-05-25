<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConfirmDelBox from './../../shared/ConfirmDelBox.vue'
import type { ILocation } from '@/interfaces/Location'
import { deleteLocation, getLocations } from '@/services/location-service'
import { useRoute } from 'vue-router'

const route = useRoute()

const locations = ref<ILocation[]>()

onMounted(() => {
  refreshLocations()
})

const refreshLocations = () => {
  getLocations(Number(route.params.id)).then((res) => {
    locations.value = res
  })
}

const isDelBoxOpen = ref(false)
const deleteCandidate = ref(0)

const onDelBtnClick = (id: number) => {
  deleteCandidate.value = id
  isDelBoxOpen.value = true
}

const onDelBoxClose = (result: boolean) => {
  isDelBoxOpen.value = false

  if (result) {
    deleteLocation(deleteCandidate.value)
    setTimeout(refreshLocations, 100)
  } else deleteCandidate.value = 0
}
</script>

<template>
  <aside>
    <div class="content">
      <h1>Локации</h1>
      <div class="list">
        <div class="item" v-for="location of locations" :key="location.idLocation">
          <RouterLink :to="`locations/${location.idLocation}/tour`">
            <p>{{ location.name }}</p>
          </RouterLink>
          <RouterLink :to="`locations/${location.idLocation}`">
            <img src="/src/assets/edit.svg" />
          </RouterLink>
          <img src="/src/assets/del.svg" @click="onDelBtnClick(location.idLocation)" />
        </div>
      </div>
      <RouterLink to="locations/new">
        <img src="/src/assets/add.svg" />
      </RouterLink>
    </div>
  </aside>

  <ConfirmDelBox v-if="isDelBoxOpen" @close="onDelBoxClose"></ConfirmDelBox>
</template>

<style scoped>
aside {
  padding: 60px 0px; /* отступы сверху\снизу */
}

h1 {
  font-size: 36px; /* рамзер текста */
  padding-bottom: 30px; /* отступ снизу */
  margin: 0%; /* нет внутренних отступов */
  color: #2d2d2d; /* цвет текста */
  text-align: center; /* текст по центру */
}

.list {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 30px; /* отступ между элементами */
  padding-bottom: 15px; /* отступ снизу */
}

.item {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
  align-items: center; /* элементы по центру по вертикали*/
}

.item > * {
  cursor: pointer;
  text-decoration: none;
}

p {
  font-size: 20px; /* рамзер текста */
  text-align: justify; /* текст по ширине */
  color: #2d2d2d; /* цвет текста */
  margin: 0%; /* нет внутренних отступов */
  align-items: center; /* элементы по центру */
  padding-right: 20px; /* отступ справа */
}

img {
  padding-right: 4px; /* отступ справа */
}
</style>
