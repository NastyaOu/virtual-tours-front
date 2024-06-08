<script setup lang="ts">
import { useRouter } from 'vue-router'
import { isAuthenticated, removeToken } from '../../auth'
import AuthorizationBox from './AuthorizationBox.vue'
import { onMounted, ref } from 'vue'
import ConfirmExitBox from './ConfirmExitBox.vue'

const router = useRouter()

const isAuthorizationBoxShow = ref(false)
const isExitBoxOpen = ref(false)

const onLogout = () => {
  isExitBoxOpen.value = true
}

const onExitBoxClose = (result: boolean) => {
  isExitBoxOpen.value = false

  if (result) logout()
}

const onLogin = () => {
  isAuthorizationBoxShow.value = true
}

const logout = () => {
  removeToken()
  router.push('/')
  updateAuthenticated()
}

const onAuthorizationBoxClose = () => {
  isAuthorizationBoxShow.value = false
  updateAuthenticated()
}

const authenticated = ref(isAuthenticated())

const updateAuthenticated = () => {
  authenticated.value = isAuthenticated()
}
</script>

<template>
  <header>
    <div class="content content-header">
      <RouterLink :to="'/'">
        <img src="/src/assets/logo.png" title="Логотип" alt="Логотип" width="63" height="63" />
      </RouterLink>
      <nav v-if="!authenticated">
        <RouterLink to="/#about">
          <a>О проекте</a>
        </RouterLink>
        <RouterLink to="/#organizations">
          <a>Организации</a>
        </RouterLink>
      </nav>

      <nav v-else>
        <RouterLink to="/admin/staff">
          <a>Администраторы</a>
        </RouterLink>
        <RouterLink to="/admin/organizations">
          <a>Организации</a>
        </RouterLink>
      </nav>
      <button
        @click="
          () => {
            authenticated ? onLogout() : onLogin()
          }
        "
      >
        {{ authenticated ? 'Выйти' : 'Войти' }}
      </button>
    </div>
  </header>

  <AuthorizationBox
    v-if="isAuthorizationBoxShow"
    @close="onAuthorizationBoxClose"
  ></AuthorizationBox>

  <ConfirmExitBox v-if="isExitBoxOpen" @close="onExitBoxClose"></ConfirmExitBox>
</template>

<style scoped>
header {
  background: #2d2d2d; /* цвет шапки */
  padding: 20px 0px; /* отступы */
}

.content-header {
  display: flex; /* элементы в блок */
  align-items: center; /* элементы по центру по вертикали*/
  justify-content: space-between; /* элементы по ширине */

  position: relative;
}

nav {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex; /* элементы в блок */
  color: #ffffff; /* цвет текста */
  font-size: 20px; /* размер текста */
  gap: 80px; /* отступ между элементами */
}

a {
  color: #ffffff; /* цвет текста */
  text-decoration: none;
}

button {
  font-size: 20px; /* размер текста */
  background-color: rgba(45, 45, 45, 0%); /* цвет кнопки */
  border: 2px solid #ffffff; /* цвет и размер рамки */
  text-align: center; /* текст по центру */
  color: #ffffff; /* цвет текста */
  padding: 20px 60px; /* отступы от текста*/
}
</style>
