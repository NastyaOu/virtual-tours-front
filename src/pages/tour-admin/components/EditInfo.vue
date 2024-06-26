<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConfirmSaveAddBox from '@/pages/shared/ConfirmSaveAddBox.vue'
import type { IInfoBlock } from '@/interfaces/Location';

interface Props {
  infoBlock:IInfoBlock
}

interface Emits {
  (e: 'close', text?: string): string | void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const text = ref('')

// изначальный текст передается в качестве пропа
onMounted(()=>{
  text.value=props.infoBlock.text
})

const onCancelBtnClick = () => {
  emit('close')
}

const isSaveAddBoxOpen = ref(false)

const onSaveAddBtnClick = () => {
  if (!text.value) {
    error.value = 'Сначала введите текст'
    return
  }

  error.value = ''
  isSaveAddBoxOpen.value = true
}

const onSaveAddBoxClose = (result: boolean) => {
  isSaveAddBoxOpen.value = false

  if (!result) return

  if (text.value) emit('close', text.value)
}

const error = ref('')
</script>

<template>
  <div v-show="!isSaveAddBoxOpen" class="modal">
    <div class="content">
      <h1>Редактирование информации</h1>
      <input type="text" v-model="text" />
      <p class="error">{{ error }}</p>
      <div class="button">
        <button @click="onSaveAddBtnClick">Сохранить</button>
        <button @click="onCancelBtnClick">Отменить</button>
      </div>
    </div>
  </div>

  <ConfirmSaveAddBox v-if="isSaveAddBoxOpen" @close="onSaveAddBoxClose"></ConfirmSaveAddBox>
</template>

<style scoped>
.modal {
  position: fixed; /* фиксированное положение */
  top: 50%; /* отступ от верхнего края элемента */
  left: 50%; /* отступ от левого края элемента */
  transform: translate(-50%, -50%); /* центрирование элемента */
  z-index: 1; /* находится поверх страницы */
  background: rgba(45, 45, 45, 80%); /* цвет окна */
  padding: 30px; /* отступы окна */
}

h1 {
  display: flex;
  font-size: 36px; /* рамзер текста */
  padding-bottom: 20px; /* отступ снизу */
  margin: 0%; /* нет внутренних отступов */
  color: #fff; /* цвет текста */
  justify-content: center; /* элементы по центру */
}

input {
  width: 100%; /* ширина */
  height: 100%; /* высота */
  margin-bottom: 20px; /* отступ снизу */
  color: #2d2d2d; /* цвет текста */
  font-family: Rubik, sans-serif; /* шрифт */
}

.button {
  display: flex; /* элементы в блок */
  justify-content: center; /* элемент по центру по горизонтали */
  gap: 30px; /* отступ между элементами */
}

button {
  font-size: 20px; /* размер текста */
  background-color: rgba(45, 45, 45, 0%); /* цвет кнопки */
  border: 2px solid #fff; /* цвет и размер рамки */
  text-align: center; /* текст по центру */
  color: #fff; /* цвет текста */
  width: 240px; /* ширина */
  height: 65px; /* высота */
}

.error {
  color: #fff;
  margin-bottom: 20px;
}
</style>
