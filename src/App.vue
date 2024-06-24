<script setup lang="ts">
import Footer from './pages/shared/Footer.vue'
import Header from './pages/shared/Header.vue'
</script>

<template>
  <div class="layout">
    <Header></Header>
    <main>
      <!-- для асинхронных операций, для запросов к серверу -->
      <Suspense> 
        <!-- в зависимости от действий пользователя выдет контент, смотрит на текущую откурутю ссылку -->
        <router-view></router-view> 
      </Suspense>
    </main>
    <Footer></Footer>
  </div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  cursor: pointer;
  background: transparent;
  border: none;
}

template {
  width: 100%;
  /* ширина */
  margin: auto;
  /* отступы */
  font-family: Rubik, sans-serif;
  /* шрифт */
}

.content {
  margin: auto;
  /* отступы */
  max-width: 1170px;
  /* макс ширина */
  width: 100%;
  /* ширина */
  font-family: Rubik, sans-serif;
  /* шрифт */
}

html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  height: 100%;
}

.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

input:not([type="radio"]) {
  padding: 0 10px;
  width: 920px;
  height: 24px; 
  border: 1px solid #2d2d2d; /* цвет */
}

input:focus {
  outline: none;
}

input[type="file"] {
  border: none;
  padding: 0%;
}
</style>
