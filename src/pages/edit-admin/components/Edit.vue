<script setup lang="ts">
import ConfirmSaveAddBox from '@/pages/shared/ConfirmSaveAddBox.vue'
import { getOneStaff, updateStaff } from '@/services/staff-service'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const lastname = ref('')

const route = useRoute()

onMounted(() => {
  getOneStaff(Number(route.params.id)).then((res) => {
    name.value = res.name
    lastname.value = res.lastname
  })
})

const isSaveAddBoxOpen = ref(false)

const error = ref('')

const onSaveAddBtnClick = () => {
  error.value = ""

  if (name.value.trim() === "" || lastname.value.trim() === "") {
    error.value = 'Заполните все поля'
    return
  }

  isSaveAddBoxOpen.value = true
}

const onCancelBtnClick = () => {
  router.push('/admin/staff')
}

const onSaveAddBoxClose = (result: boolean) => {
  isSaveAddBoxOpen.value = false

  if (!result) return

  updateStaff(Number(route.params.id), name.value, lastname.value).catch((err) => {
    error.value = err.response.data
  })

  if (error.value.length) return

  router.push('/admin/staff')
}
</script>

<template>
  <aside>
    <div class="content">
      <h1>Редактирование администратора</h1>
      <div class="list">
        <div class="item">
          <label>Фамилия</label>
          <input type="text" v-model="lastname" />
        </div>
        <div class="item">
          <label>Имя</label>
          <input type="text" v-model="name" />
        </div>
        <div class="item">
          <label>{{ error }}</label>
        </div>
        <!-- <div class="item">
          <label>Логин</label>
          <input type="text" />
        </div>
        <div class="item">
          <label>Пароль</label>
          <input type="text" />
        </div> -->
      </div>
      <div class="button">
        <button @click="onSaveAddBtnClick">Сохранить</button>
        <button @click="onCancelBtnClick">Отменить</button>
      </div>
    </div>
  </aside>

  <ConfirmSaveAddBox v-if="isSaveAddBoxOpen" @close="onSaveAddBoxClose"></ConfirmSaveAddBox>
</template>

<style scoped>
aside {
  padding: 60px 0px;
  /* отступы сверху\снизу */
}

h1 {
  font-size: 36px;
  /* рамзер текста */
  padding-bottom: 30px;
  /* отступ снизу */
  margin: 0%;
  /* нет внутренних отступов */
  color: #2d2d2d;
  /* цвет текста */
  text-align: center;
  /* текст по центру */
}

.list {
  display: flex;
  /* элементы в блок */
  flex-direction: column;
  /* элементы в колонну */
  gap: 30px;
  /* отступ между элементами */
  padding-bottom: 30px;
  /* отступ снизу */
  justify-content: space-between;
  /* элементы по ширине */
}

.item {
  display: flex;
  /* элементы в блок */
  flex-direction: row;
  /* элементы в строку */
  justify-content: space-between;
}

label {
  font-size: 20px;
  /* рамзер текста */
  text-align: justify;
  /* текст по ширине */
  color: #2d2d2d;
  /* цвет текста */
  margin: 0%;
  /* нет внутренних отступов */
  align-items: center;
  /* элементы по центру */
}

input {
  width: 920px;
  /* ширина */
}

.items {
  display: flex;
  /* элементы в блок */
  flex-direction: column;
  /* элементы в колонну */
  gap: 10px;
  /* отступ между элементами */
}

.item {
  display: flex;
  /* элементы в блок */
  flex-direction: row;
  /* элементы в строку */
  gap: 5px;
  /* отступ между элементами */
}

.btn {
  padding-left: 250px;
  /* отступ слева */
}

.button {
  display: flex;
  /* элементы в блок */
  justify-content: center;
  /* элементы по центру */
  gap: 30px;
  /* отступ между элементами */
}

button {
  font-size: 20px;
  /* размер текста */
  background-color: rgba(45, 45, 45, 0%);
  /* цвет кнопки */
  border: 2px solid #2d2d2d;
  /* цвет и размер рамки */
  text-align: center;
  /* текст по центру */
  color: #2d2d2d;
  /* цвет текста */
  padding: 20px 70px;
  /* отступы сверху\снизу и слева\справа от текста*/
}
</style>
