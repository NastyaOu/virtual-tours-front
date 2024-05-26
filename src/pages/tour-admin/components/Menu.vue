<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Emits {
  (e: 'close'): void
  (e: 'add-video'): void
  (e: 'add-photo'): void
  (e: 'add-info'): void
  (e: 'add-transition'): void
}

const emit = defineEmits<Emits>()

const menu = ref()

const onMouseUp = (event: MouseEvent) => {
  if (!menu.value.contains(event.target)) {
    emit('close')
  }
}

const onAddVideoClick = () => {
  emit('add-video')
  emit('close')
}

const onAddPhotoClick = () => {
  emit('add-photo')
  emit('close')
}

const onAddInfoClick = () => {
  emit('add-info')
  emit('close')
}

const onAddTransitionClick = () => {
  emit('add-transition')
  emit('close')
}

onMounted(() => {
  document.addEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <div ref="menu" class="modal">
    <div class="buttons">
      <button @click="onAddVideoClick">Добавить видеозапись</button>
      <button @click="onAddPhotoClick">Добавить изображение</button>
      <button @click="onAddInfoClick">Добавить информацию</button>
      <button @click="onAddTransitionClick">Добавить переход</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed; /* фиксированное положение */
  top: 100px;
  right: 20px;
  z-index: 1; /* находится поверх страницы */
  padding: 30px; /* отступы окна */
  background: rgba(45, 45, 45, 80%); /* цвет окна */
}

.buttons {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 20px; /* отступы между лементами*/
}

.buttons > button {
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 20px;
  background: transparent;
  border: none;
  color: #fff; /* цвет */
  text-align: center; /* текст по центру*/
}
</style>
