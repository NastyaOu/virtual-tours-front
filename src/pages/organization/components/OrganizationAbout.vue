<script setup lang="ts">
interface Props {
  name: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <section>
    <div class="content">
      <h1>{{ name }}</h1>
      <p>
        {{ description }}
      </p>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 60px 0; /* отступы сверху\снизу */
}

h1 {
  font-size: 36px; /* рамзер текста */
  padding-bottom: 30px; /* отступы */
  text-align: center; /* текст по центру */
  margin: 0%; /* отступы */
  color: #2d2d2d; /* цвет текста */
}

p {
  font-size: 20px; /* рамзер текста */
  text-align: justify; /* текст по ширине */
  line-height: 40px; /* отступ внутри текста */
  color: #2d2d2d; /* цвет текста */
  margin: 0%; /* отступы */
}
</style>
