<script setup lang="ts">
import ConfirmAddBox from '@/pages/shared/ConfirmAddBox.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isAddBoxOpen = ref(false)

const onAddBtnClick = () => {
  isAddBoxOpen.value = true
}

const onCancelBtnClick = () => {
  router.push('/admin/organizations/1/locations')
}

const onAddBoxClose = (result: boolean) => {
  isAddBoxOpen.value = false
}
</script>

<template>
  <aside>
    <div class="content">
      <h1>Добавление локации</h1>
      <div class="list">
        <div class="item">
          <label>Название локации</label>
          <input type="text" />
        </div>
        <div class="item">
          <label>Изображение</label>
          <div class="item">
            <input type="file" />
            <img src="/src/assets/close.svg" />
          </div>
        </div>
        <div class="btn">
          <img src="/src/assets/add.svg" />
        </div>
      </div>
      <div class="button">
        <button @click="onAddBtnClick">Добавить</button>
        <button @click="onCancelBtnClick">Отменить</button>
      </div>
    </div>
  </aside>

  <ConfirmAddBox v-if="isAddBoxOpen" @close="onAddBoxClose"></ConfirmAddBox>
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
  padding-bottom: 30px;
  /* отступ снизу */
  justify-content: space-between;
  /* элементы по ширине */
}

.item {
  display: flex;
  /* элементы в блок */
  flex-direction: row;
  /* элементы в строку */
  justify-content: space-between;
  /* текст по ширине */
}

label {
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

input {
  width: 920px;
  /* ширина */
  border: 1px solid #2d2d2d;
  /* цвет */
}

.item {
  display: flex;
  /* элементы в блок */
  flex-direction: row;
  /* элементы в строку */
  gap: 5px;
  /* отступ между элементами */
}

.btn {
  padding-left: 250px;
  /* отступ слева */
}

.button {
  display: flex;
  /* элементы в блок */
  justify-content: center;
  /* элементы по центру */
  gap: 30px;
  /* отступ между элементами */
}

button {
  font-size: 20px;
  /* размер текста */
  background-color: rgba(45, 45, 45, 0%);
  /* цвет кнопки */
  border: 2px solid #2d2d2d;
  /* цвет и размер рамки */
  text-align: center;
  /* текст по центру */
  color: #2d2d2d;
  /* цвет текста */
  padding: 20px 70px;
  /* отступы сверху\снизу и слева\справа от текста*/
}
</style>
