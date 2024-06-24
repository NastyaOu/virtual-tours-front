<script setup lang="ts">
interface Emits {
  // е-название эмита
  (e: 'close', result: boolean): boolean
}

const emit = defineEmits<Emits>()

const onClose = (result: boolean) => {
  // внутрь проспы, наружу-эмиты
  emit('close', result)
}
</script>

<template>
  <div class="modal">
    <div class="content">
      <h1>Подтвердить добавление</h1>
      <div class="button">
        <button @click="onClose(true)">Подтвердить</button>
        <button @click="onClose(false)">Отменить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed; /* фиксированное положение */
  top: 50%; /* отступ от верхнего края элемента */
  left: 50%; /* отступ от левого края элемента */
  transform: translate(-50%, -50%); /* центрирование элемента */
  z-index: 1; /* находится поверх страницы */
  padding: 30px; /* отступы окна */
  background: rgba(45, 45, 45, 80%); /* цвет окна */
}

h1 {
  display: flex;
  font-size: 36px; /* рамзер текста */
  padding-bottom: 20px; /* отступ снизу */
  margin: 0%; /* нет внутренних отступов */
  color: #fff; /* цвет текста */
  align-items: center; /* текст по центру по вертикали */
  justify-content: center;
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
</style>
