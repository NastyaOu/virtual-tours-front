<script setup lang="ts">
import ConfirmAddBox from '@/pages/shared/ConfirmAddBox.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createOrganization } from '@/services/organization-service'

const router = useRouter()

const name = ref('')
const description = ref('')
const history = ref([''])
const fileInput = ref()

const onAddHistoryBtnClick = () => {
  history.value.push('')
}

const onDelHistoryBtnClick = (index: number) => {
  history.value.splice(index, 1)
}

const isAddBoxOpen = ref(false)

const error = ref('')

const onAddBtnClick = () => {
  error.value = ""

  if (name.value.trim() === "" || description.value.trim() === "" || history.value.some(historyEl => historyEl.trim() === "")|| !fileInput.value.files[0]) {
    error.value = 'Заполните все поля'
    return
  }

  isAddBoxOpen.value = true
}

const onCancelBtnClick = () => {
  router.push('/admin/organizations')
}

const onAddBoxClose = (result: boolean) => {
  isAddBoxOpen.value = false

  if (!result) return

  const formData = new FormData()

  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('history', JSON.stringify(history.value))
  formData.append('image', fileInput.value.files[0])

  createOrganization(formData).catch((err) => {
    error.value = err.response.data
  })

  if (error.value.length) return

  router.push('/admin/organizations')
}
</script>

<template>
  <aside>
    <div class="content">
      <h1>Добавление организации</h1>
      <div class="list">
        <div class="item">
          <label>Название организации</label>
          <input type="text" v-model="name" />
        </div>
        <div class="item">
          <label>Описание организации</label>
          <input type="text" v-model="description" />
        </div>
        <div class="item">
          <label>История организации</label>
          <div class="items">
            <input type="text" v-model="history[0]" />
            <div v-for="(historyEl, index) of history.slice(1, history.length)" class="item">
              <input type="text" v-model="history[index + 1]" />
              <img src="/src/assets/close.svg" @click="onDelHistoryBtnClick(index + 1)" />
            </div>
            <div class="btn">
              <img src="/src/assets/add.svg" @click="onAddHistoryBtnClick" />
            </div>
          </div>
        </div>

       
        <div class="item">
          <label>Изображение</label>
          <div class="item">
            <input ref="fileInput" type="file" />
          </div>
        </div>
        <div class="item">
          <label>{{ error }}</label>
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
  padding-bottom: 30px; /* отступ снизу */
  justify-content: space-between; /* элементы по ширине */
}

.item {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
  justify-content: space-between; /* текст по ширине */
}

label {
  font-size: 20px; /* рамзер текста */
  text-align: justify; /* текст по ширине */
  color: #2d2d2d; /* цвет текста */
  margin: 0%; /* нет внутренних отступов */
  align-items: center; /* элементы по центру */
}

input {
  width: 920px; /* ширина */
}

.items {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 10px; /* отступ между элементами */
}

.items .item {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
  gap: 5px; /* отступ между элементами */
}

.items .item > img {
  cursor: pointer;
}

.btn > img {
  width: 30px;
  aspect-ratio: 1 / 1;
  cursor: pointer;
}

.button {
  display: flex; /* элементы в блок */
  justify-content: center; /* элементы по центру */
  gap: 30px; /* отступ между элементами */
}

button {
  font-size: 20px; /* размер текста */
  background-color: rgba(45, 45, 45, 0%); /* цвет кнопки */
  border: 2px solid #2d2d2d; /* цвет и размер рамки */
  text-align: center; /* текст по центру */
  color: #2d2d2d; /* цвет текста */
  padding: 20px 70px; /* отступы сверху\снизу и слева\справа от текста*/
}
</style>
