<script setup lang="ts">
import ConfirmAddBox from '@/pages/shared/ConfirmAddBox.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createOrganization } from '@/services/organization-service'

const router = useRouter()

const name = ref('')
const description = ref('')
const history = ref([''])
const fileInput = ref()

const onAddHistoryBtnClick = () => {
  history.value.push('')
}

const onDelHistoryBtnClick = (index: number) => {
  history.value.splice(index, 1)
}

const isAddBoxOpen = ref(false)

const error = ref('')

// при нажатии добавить открывается окно(isAddBoxOpen)
const onAddBtnClick = () => {
  error.value = ""
 
  // если поля имя или описание или история или изображение пустые то выводим ошибку
  if (name.value.trim() === "" || description.value.trim() === "" || history.value.some(historyEl => historyEl.trim() === "")|| !fileInput.value.files[0]) {
    error.value = 'Заполните все поля'
    return
  }
// иначе проходим дальше и открываем модальное окно
  isAddBoxOpen.value = true
}

// при нажатии на отменить происходит переход на стр организаций
const onCancelBtnClick = () => {
  router.push('/admin/organizations')
}

// при закрытии окна формируем оъект FormData(body)
const onAddBoxClose = (result: boolean) => {
  // закрываем модальное окно
  isAddBoxOpen.value = false

  // если ошибка, то продолжаем создание организации
  if (!result) return

  // создаем параметр с типом FormData, в которой будет body
  const formData = new FormData()

  
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('history', JSON.stringify(history.value)) 
  // перед отправкой запроса в FormData, мы добавим файловый инпут, его значение и первый из файлов
  formData.append('image', fileInput.value.files[0])

  // затем вызовем функцию createOrganization для создания организации с данными организации
  createOrganization(formData).catch((err) => {
    // эррор для незаполненных полей
    error.value = err.response.data
  })

  if (error.value.length) return

  // если ошибки нет, то возврат на страницу организаций
  router.push('/admin/organizations')
}
</script>

<template>
  <aside>
    <div class="content">
      <h1>Добавление организации</h1>
      <div class="list">
        <div class="item">
          <label>Название организации</label>
          <input type="text" v-model="name" />
        </div>
        <div class="item">
          <label>Описание организации</label>
          <input type="text" v-model="description" />
        </div>
        <div class="item">
          <label>История организации</label>
          <div class="items">
            <input type="text" v-model="history[0]" />
            <div v-for="(historyEl, index) of history.slice(1, history.length)" class="item">
              <!-- v-model обеспечивает двустороннюю привязку данных; при изменении данных в нем(в инпуте), они отобразятся в родителе add (const history = ref(['']))-->
              <input type="text" v-model="history[index + 1]" />
              <img src="/src/assets/close.svg" @click="onDelHistoryBtnClick(index + 1)" />
            </div>
            <div class="btn">
              <img src="/src/assets/add.svg" @click="onAddHistoryBtnClick" />
            </div>
          </div>
        </div>

       
        <div class="item">
          <label>Изображение</label>
          <div class="item">
            <!-- v-model для файлов не существует, реф-это как бы айди, который обновляется -->
            <input ref="fileInput" type="file" />
          </div>
        </div>
        <div class="item">
          <label>{{ error }}</label>
        </div>
      </div>
      <div class="button">
        <button @click="onAddBtnClick">Добавить</button>
        <button @click="onCancelBtnClick">Отменить</button>
      </div>
    </div>
  </aside>

  <!-- v-if делаем его видимость зависимость от переменной isAddBoxOpen(т.е. если оно открыто)-->
  <ConfirmAddBox v-if="isAddBoxOpen" @close="onAddBoxClose"></ConfirmAddBox>
</template>

<style scoped>
aside {
  padding: 60px 0px; /* отступы сверху\снизу */
}

h1 {
  font-size: 36px; /* рамзер текста */
  padding-bottom: 30px; /* отступ снизу */
  margin: 0%; /* нет внутренних отступов */
  color: #2d2d2d; /* цвет текста */
  text-align: center; /* текст по центру */
}

.list {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 30px; /* отступ между элементами */
  padding-bottom: 30px; /* отступ снизу */
  justify-content: space-between; /* элементы по ширине */
}

.item {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
  justify-content: space-between; /* текст по ширине */
}

label {
  font-size: 20px; /* рамзер текста */
  text-align: justify; /* текст по ширине */
  color: #2d2d2d; /* цвет текста */
  margin: 0%; /* нет внутренних отступов */
  align-items: center; /* элементы по центру */
}

input {
  width: 920px; /* ширина */
}

.items {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в колонну */
  gap: 10px; /* отступ между элементами */
}

.items .item {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в строку */
  gap: 5px; /* отступ между элементами */

  position: relative;
}

.items .item > img {
  position: absolute;
  left: calc(100% + 5px);
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.btn > img {
  width: 30px;
  aspect-ratio: 1 / 1;
  cursor: pointer;
}

.button {
  display: flex; /* элементы в блок */
  justify-content: center; /* элементы по центру */
  gap: 30px; /* отступ между элементами */
}

button {
  font-size: 20px; /* размер текста */
  background-color: rgba(45, 45, 45, 0%); /* цвет кнопки */
  border: 2px solid #2d2d2d; /* цвет и размер рамки */
  text-align: center; /* текст по центру */
  color: #2d2d2d; /* цвет текста */
  padding: 20px 70px; /* отступы сверху\снизу и слева\справа от текста*/
}
</style>
