<script setup lang="ts">
interface Props {
  history: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="history">
    <div class="content">
      <h1>История учреждения</h1>
      <div class="list">
        <div class="item" v-for="historyEl of history">
          <img src="/src/assets/mark.svg" />
          <p>{{ historyEl }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history {
  padding: 0px 0px 60px; /* отступы сверху\снизу */
}

h1 {
  font-size: 36px; /* рамзер текста */
  padding-bottom: 30px; /* отступ снизу */
  text-align: center; /* текст по центру */
  margin: 0%; /* нет внутренних отступов */
  color: #2d2d2d; /* цвет текста */
}

.list {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 30px; /* отступ между элементами */
}

.item {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
  align-items: center; /* элементы по центру по вертикали*/
}

p {
  font-size: 20px; /* рамзер текста */
  text-align: justify; /* текст по ширине */
  line-height: 40px; /* отступы между строками */
  color: #2d2d2d; /* цвет текста */
  margin: 0%; /* нет внутренних отступов */
  align-items: center; /* элементы по центру */
  padding-left: 15px; /* отступ слева */
}
</style>
