<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  name: string
  link: string
  imgSrc: string
}

const props = defineProps<Props>()

const router = useRouter()

const onClick = () => {
  router.push(props.link)
}
</script>

<template>
  <div class="wrap" :style="`background-image: url('${imgSrc}');`">
    <div class="content wrap-content">
      <h1>{{ name }}</h1>
      <button @click="onClick">Посетить</button>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  background-color: rgba(0, 0, 0, 0.5);/* фон */
  background-blend-mode: color;
  background-size: cover;
  background-position: 50% 50%;
  padding: 240px 0px; /* отступы */
}

.wrap-content {
  display: flex; /* элементы в блок */
  align-items: center; /* элементы по центру*/
  flex-direction: column; /* элементы в колонну */
}

h1 {
  display: flex; /* элементы в блок */
  font-size: 48px; /* рамзер текста */
  color: #ffffff; /* цвет текста */
  margin: 0%; /* нет внутренних отступов */
  padding-bottom: 50px; /* отступ снизу*/
}

button {
  font-size: 20px; /* размер текста */
  background-color: rgba(45, 45, 45, 0%); /* цвет кнопки */
  border: 3px solid #ffffff; /* цвет и размер рамки */
  text-align: center; /* текст по центру */
  color: #ffffff; /* цвет текста */
  padding: 20px 73px; /* отступы сверху\снизу и слева\справа от текста*/
}
</style>
