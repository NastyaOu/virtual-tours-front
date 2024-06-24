<script setup lang="ts">
import { ref } from 'vue'
import ConfirmAddBox from '@/pages/shared/ConfirmAddBox.vue'

interface Emits {
  (e: 'close', file?: File): File | void
}

const emit = defineEmits<Emits>()

const fileInput = ref()

const onCancelBtnClick = () => {
  emit('close')
}

const isAddBoxOpen = ref(false)

const onAddBtnClick = () => {
  const file = fileInput.value.files[0]
  if (!file) {
    error.value = 'Сначала выберите файл'
    return
  }

  error.value = ''
  isAddBoxOpen.value = true
}

const onAddBoxClose = (result: boolean) => {
  isAddBoxOpen.value = false

  if (!result) return

  const file = fileInput.value.files[0]
  if (file) emit('close', file)
}

const error = ref('')
</script>

<template>
  <div v-show="!isAddBoxOpen" class="modal">
    <div class="content">
      <h1>Добавление видеозаписи</h1>
      <input ref="fileInput" type="file" />
      <p class="error">{{ error }}</p>

      <div class="button">
        <button @click="onAddBtnClick">Добавить</button>
        <button @click="onCancelBtnClick">Отменить</button>
      </div>
    </div>
  </div>

  <ConfirmAddBox v-if="isAddBoxOpen" @close="onAddBoxClose"></ConfirmAddBox>
</template>

<style scoped>
.modal {
  position: fixed; /* фиксированное положение */
  top: 50%; /* отступ от верхнего края элемента */
  left: 50%; /* отступ от левого края элемента */
  transform: translate(-50%, -50%); /* центрирование элемента */
  z-index: 1; /* находится поверх страницы */
  background: rgba(45, 45, 45, 80%); /* цвет окна */
  padding: 30px; /* отступы окна */
}

h1 {
  display: flex; /* элементы в блок */
  font-size: 36px; /* рамзер текста */
  padding-bottom: 30px; /* отступ снизу */
  margin: 0%; /* нет внутренних отступов */
  color: #fff; /* цвет текста */
  justify-content: center; /* элементы по центру */
}

input {
  width: 100%; /* ширина */
  height: 100%; /* высота */
  margin-bottom: 30px; /* шиотступ снизурина */
  color: #fff; /* цвет текста */
  font-family: Rubik, sans-serif; /* шрифт */
}

.button {
  display: flex; /* элементы в блок */
  justify-content: center; /* элемент по центру по горизонтали */
  gap: 30px; /* отступ между элементами */
}

button {
  font-size: 20px; /* размер текста */
  background-color: rgba(45, 45, 45, 0%); /* цвет кнопки */
  border: 2px solid #fff; /* цвет и размер рамки */
  text-align: center; /* текст по центру */
  color: #fff; /* цвет текста */
  width: 240px; /* ширина */
  height: 65px; /* высота */
}

.error {
  color: #fff;
  margin-bottom: 20px;
}
</style>
