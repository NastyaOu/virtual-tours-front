<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConfirmDelBox from './../../shared/ConfirmDelBox.vue'
import type { IStaff } from '@/interfaces/Staff'
import { deleteStaff, getStaff } from '@/services/staff-service'

const staff = ref<IStaff[]>()

const refreshStaff = () => {
  getStaff().then((res) => {
    staff.value = res
  })
}

onMounted(() => {
  refreshStaff()
})

const isDelBoxOpen = ref(false)
const deleteCandidate = ref(0)

const onDelBtnClick = (id: number) => {
  deleteCandidate.value = id
  isDelBoxOpen.value = true
}

const onDelBoxClose = (result: boolean) => {
  isDelBoxOpen.value = false

  if (result) {
    deleteStaff(deleteCandidate.value)
    setTimeout(refreshStaff, 100)
  } else deleteCandidate.value = 0
}
</script>

<template>
  <aside>
    <div class="content">
      <h1>Администраторы</h1>
      <div class="list">
        <div class="item" v-for="staffEl of staff" :key="staffEl.idStaff">
          <div class="item-content">
            <p>{{ staffEl.lastname }}</p>
            <p>{{ staffEl.name }}</p>
          </div>
          <RouterLink :to="`staff/${staffEl.idStaff}`">
            <img src="/src/assets/edit.svg" />
          </RouterLink>
          <img src="/src/assets/del.svg" @click="onDelBtnClick(staffEl.idStaff)" />
        </div>
      </div>
      <RouterLink to="staff/new">
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

.item > img {
  cursor: pointer;
}

.item-content {
  display: flex;
  /* элементы в блок */
  flex-direction: row;
  /* элементы в строку */
  align-items: center;
  /* элементы по центру по вертикали*/
  padding-right: 20px;
  /* оступ справа */
  gap: 6px;
  /* отступ между элементами */
}

p {
  display: flex;
  /* элементы в блок */
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
}

img {
  padding-right: 4px;
  /* отступ справа */
}
</style>
