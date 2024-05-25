<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConfirmDelBox from './../../shared/ConfirmDelBox.vue'
import type { IOrganization } from '@/interfaces/Organization'
import { deleteOrganization, getOrganizations } from '@/services/organization-service'

const organizations = ref<IOrganization[]>()

onMounted(() => {
  refreshOrganizations()
})

const refreshOrganizations = () => {
  getOrganizations().then((res) => {
    organizations.value = res
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
    deleteOrganization(deleteCandidate.value)
    setTimeout(refreshOrganizations, 100)
  } else deleteCandidate.value = 0
}
</script>

<template>
  <aside>
    <div class="content">
      <h1>Организации</h1>
      <div class="list">
        <div class="item" v-for="organization of organizations" :key="organization.idOrganization">
          <RouterLink :to="`organizations/${organization.idOrganization}/locations`">
            <p>{{ organization.name }}</p>
          </RouterLink>
          <RouterLink :to="`organizations/${organization.idOrganization}`">
            <img src="/src/assets/edit.svg" />
          </RouterLink>
          <img src="/src/assets/del.svg" @click="onDelBtnClick(organization.idOrganization)" />
        </div>
      </div>
      <RouterLink to="organizations/new">
        <img src="/src/assets/add.svg" />
      </RouterLink>
    </div>
  </aside>

  <ConfirmDelBox v-if="isDelBoxOpen" @close="onDelBoxClose"></ConfirmDelBox>
</template>

<style scoped>
aside {
  padding: 60px 0px;
  /* отступы сверху\снизу */
}

h1 {
  font-size: 36px;
  /* рамзер текста */
  padding-bottom: 30px;
  /* отступ снизу */
  margin: 0%;
  /* нет внутренних отступов */
  color: #2d2d2d;
  /* цвет текста */
  text-align: center;
  /* текст по центру */
}

.list {
  display: flex;
  /* элементы в блок */
  flex-direction: column;
  /* элементы в колонну */
  gap: 30px;
  /* отступ между элементами */
  padding-bottom: 15px;
  /* отступ снизу */
}

.item {
  display: flex;
  /* элементы в блок */
  flex-direction: row;
  /* элементы в строку */
  align-items: center;
  /* элементы по центру по вертикали*/
}

.item > * {
  text-decoration: none;
  cursor: pointer;
}

p {
  font-size: 20px;
  /* рамзер текста */
  text-align: justify;
  /* текст по ширине */
  color: #2d2d2d;
  /* цвет текста */
  margin: 0%;
  /* нет внутренних отступов */
  align-items: center;
  /* элементы по центру */
  padding-right: 20px;
  /* отступ справа */
}

img {
  padding-right: 4px;
  /* отступ справа */
}
</style>
