<script setup lang="ts">
import { ref } from 'vue'
import { axiosInstance } from '@/axios-instance'
import { setToken } from '@/auth'
import { useRouter } from 'vue-router'

interface Emits {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
const router = useRouter()

const login = ref('')
const password = ref('')

const error = ref('')

const onLogin = () => {
  axiosInstance
    .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      login: login.value,
      password: password.value
    })
    .then((response) => {
      setToken(response.data.token)
      router.push('/admin')
      onClose()
    })
    .catch((err) => {
      error.value = err.response.data
    })
}

const onClose = () => {
  emit('close')
}
</script>

<template>
  <div class="modal">
    <div class="content">
      <div class="header-logo">
        <img src="/src/assets/logo.png" title="Логотип" alt="Логотип" width="63" height="63" />
        <h1>Авторизация</h1>
      </div>
      <form>
        <div class="input-field">
          <label>Логин</label>
          <input type="text" v-model="login" />
        </div>
        <div class="input-field">
          <label>Пароль</label>
          <input type="password" v-model="password" />
        </div>
        <div class="input-field" v-if="error">
          <label>{{ error }}</label>
        </div>
      </form>

      <div class="button">
        <button @click="onLogin">Войти</button>
        <button @click="onClose">Отменить</button>
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
  z-index: 3; /* находится поверх страницы */
  padding: 50px 60px 60px; /* отступы окна */
  background: rgba(45, 45, 45, 80%); /* цвет окна */
}

.header-logo {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
  align-items: center; /* элементы по центру по вертикали */
  padding-bottom: 50px; /* отступ */
}

h1 {
  padding-top: 20px; /* ИСПРАВИТЬ! */
  padding-left: 135px; /* ИСПРАВИТЬ! */
  font-size: 36px; /* рамзер текста */
  padding-bottom: 30px; /* отступ снизу */
  margin: 0%; /* нет внутренних отступов */
  color: #fff; /* цвет текста */
}

form {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 30px; /* отступ между элементами */
  padding-bottom: 20px; /* отступ снизу */
  justify-content: space-between; /* элементы по ширине */
}

.input-field {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
  justify-content: space-between; /* элементы по ширине */
}

label {
  font-size: 20px; /* рамзер текста */
  color: #fff; /* цвет текста */
  margin: 0%; /* нет внутренних отступов */
  padding-right: 40px; /* элементы отступ справа */
}

input {
  width: 460px; /* ширина */
  border: 1px solid #2d2d2d; /* цвет */
}

.button {
  display: flex; /* элементы в блок */
  justify-content: center; /* элемент по центру по горизонтали */
  gap: 30px; /* отступы между элементами */
}

button {
  font-size: 20px; /* размер текста */
  background-color: rgba(45, 45, 45, 0%); /* цвет кнопки */
  border: 2px solid #fff; /* цвет и размер рамки */
  text-align: center; /* текст по центру */
  color: #fff; /* цвет текста */
  width: 240px; /* ширина */
  height: 65px; /* высота */
  margin-top: 30px; /* отступ сверху */
}
</style>
