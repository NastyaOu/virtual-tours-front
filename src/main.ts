import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import { routes } from './routes'
import { isAuthenticated } from './auth'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash)
      return {
        selector: to.hash,
        behavior: 'smooth'
      }

    return { top: 0 }
  },
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isAuthenticated())
    return {
      name: ''
    }
})

createApp(App).use(router).mount('#app')
