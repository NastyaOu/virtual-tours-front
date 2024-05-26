<script setup lang="ts">
import type { ILocation } from '@/interfaces/Location'
import { ref } from 'vue'
import ConfirmAddBox from '@/pages/shared/ConfirmAddBox.vue'

interface Props {
  locations: ILocation[]
}

interface Emits {
  (e: 'close', location?: ILocation): ILocation | void
}

const emit = defineEmits<Emits>()
defineProps<Props>()

const selectedLocation = ref<ILocation>()

const onCancelBtnClick = () => {
  emit('close')
}

const isAddBoxOpen = ref(false)

const onAddBtnClick = () => {
  if (!selectedLocation.value) {
    error.value = 'Сначала выберите локацию'
    return
  }

  error.value = ''
  isAddBoxOpen.value = true
}

const onAddBoxClose = (result: boolean) => {
  isAddBoxOpen.value = false

  if (!result) return

  if (selectedLocation.value) emit('close', selectedLocation.value)
}

const error = ref('')
</script>

<template>
  <div v-show="!isAddBoxOpen" class="modal">
    <div class="content">
      <h1>Добавление перехода</h1>
      <p>Выберите локацию для перехода</p>
      <div class="radio">
        <div class="item" v-for="location in locations" :key="location.idLocation">
          <input
            type="radio"
            :id="location.idLocation.toString()"
            :value="location"
            v-model="selectedLocation"
          />
          <label :for="location.idLocation.toString()">{{ location.name }}</label>
        </div>
      </div>
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
  padding-bottom: 20px; /* отступ снизу */
  margin: 0%; /* нет внутренних отступов */
  color: #fff; /* цвет текста */
  justify-content: center; /* элементы по центру */
}

p {
  display: flex; /* элементы в блок */
  font-size: 20px; /* рамзер текста */
  padding-bottom: 20px; /* отступ снизу */
  margin: 0%; /* нет внутренних отступов */
  color: #fff; /* цвет текста */
  justify-content: center; /* элементы по центру */
}

.radio {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 10px; /* отступы между элементами*/
  padding-bottom: 20px; /* отступ снизу */
  max-height: 400px;
  overflow: auto;
}

.item {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
}

input {
  display: flex; /* элементы в блок */
  align-items: center; /* элементы по центру по вертикали */
  margin: 0%; /* отступы */
}

label {
  display: flex; /* элементы в блок */
  font-size: 20px; /* рамзер текста */
  margin: 0%; /* нет внутренних отступов */
  color: #fff; /* цвет текста */
  padding-left: 4px; /* отступ слева */
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
