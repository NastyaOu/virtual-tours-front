import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Tres from '@tresjs/core'

import App from './App.vue'
import { routes } from './routes'
import { isAuthenticated } from './auth'

// создание роутера
const router = createRouter({
  // куда переходим, откуда и позиция прокрутки
  scrollBehavior(to, from, savedPosition) {
    // если с якорем
    if (to.hash)
      return {
    // то находим элемент с якорем
        el: to.hash,
        // и мягким способом к нему прокручиваем
        behavior: 'smooth'
      }

    // если якоря нет, то к началу страницы
    return { top: 0 }
  },
  // пути
  routes, 
  history: createWebHistory()
})

// для каждого маршрута, перед каждым переходом
router.beforeEach((to, from) => {
  // если пользователь не авторизован, то возвращаем его на главную страницу
  if (to.meta.requiresAuth && !isAuthenticated())
    return {
      name: ''
    }
})

// создает приложение, использует роутер, импользует трес
createApp(App).use(router).use(Tres).mount('#app') 
