<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const onClick = () => {
  router.push('/#about')
}
</script>

<template>
 <div class="wrapper">
  <div class="wrap">
    <div class="content">
      <h1>Дополни свою реальность</h1>
      <p>
        Уникальная коллекция виртуальных туров<br />
        по учреждениям системы дополнительного образования города Кирово-Чепецка
      </p>
      <button @click="onClick">О проекте</button>
    </div>
  </div>
  <div class="video-wrapper">
    <div class="video-background"></div>
    <video controls class="video" playsinline autoplay loop>
      <source src="/src/assets/bg.mp4" type="video/mp4" />
    </video>
  </div>
 </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}

.wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
}

.video-background {
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}

.video-wrapper {
  position: relative;
  width: 100%;
  /* ширина */
  height: 700px;
  overflow: hidden;
}

.video {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  user-select: none;
  touch-action: none;
}

h1 {
  display: flex;
  /* элементы в блок */
  font-size: 64px;
  /* размер текста */
  color: #ffffff;
  /* цвет текста */
  margin: 0%;
  /* убрать все отступы*/
}

p {
  display: flex;
  /* элементы в блок */
  font-size: 20px;
  /* размер текста */
  color: #ffffff;
  /* цвет текста */
  margin: 20px 0px 30px;
  /*отступы по часовой*/
  line-height: 25px;
}

button {
  font-size: 20px;
  /* размер текста */
  background-color: rgba(45, 45, 45, 0%);
  /* цвет кнопки */
  border: 3px solid #ffffff;
  /* цвет и размер рамки */
  text-align: center;
  /* текст по центру */
  color: #ffffff;
  /* цвет текста */
  padding: 20px 70px;
  /* отступы сверху\снизу и слева\справа от текста*/
}
</style>
