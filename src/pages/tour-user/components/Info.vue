<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  text: string
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const formattedText = ref('')

const onClose = () => {
  emit('close')
}

onMounted(() => {
  formattedText.value = props.text.replaceAll('•	', '<br/>•	')
})
</script>

<template>
  <div class="modal">
    <button @click="onClose">
      <img src="/src/assets/close2.svg" />
    </button>
    <div class="text">
      <p v-html="formattedText">
        
      </p>
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
  background: rgba(45, 45, 45, 80%); /* цвет окна */
}

.text {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 10px; /* отступы между элементами*/
  width: 600px; /* ширина */
  height: 400px; /* высота */
  position: relative; /* относительное положение */
  margin: 30px; /* отступы */
  overflow-y: auto;
}

button {
  display: flex; /* элементы в блок */
  position: absolute; /* абсолютное положение */
  top: 0; /* отступ от верхнего края элемента */
  right: 0; /* отступ от правого края элемента */
}

p {
  font-family: Rubik, sans-serif; /* шрифт */
  font-size: 20px; /* рамзер текста */
  text-align: justify; /* текст по ширине */
  line-height: 40px; /* отступы внтри текста*/
  color: #fff; /* цвер текста */
  margin: 0%; /* отступы */
  padding-right: 10px;
}
</style>
