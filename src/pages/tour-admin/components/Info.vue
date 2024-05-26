<script setup lang="ts">
import { ref } from 'vue'
import ConfirmDelBox from './../../shared/ConfirmDelBox.vue'
import EditInfo from './EditInfo.vue'
import type { IInfoBlock } from '@/interfaces/Location'

interface Props {
  infoBlock: IInfoBlock
}

interface Emits {
  (e: 'close'): void
  (e: 'edit', idInfoBlock: number, text: string): any
  (e: 'delete', idInfoBlock: number): number
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const onClose = () => {
  emit('close')
}

const isDelBoxOpen = ref(false)

const onDelete = () => {
  isDelBoxOpen.value = true
}

const onDelBoxClose = (result: boolean) => {
  isDelBoxOpen.value = false

  if (!result) return

  emit('delete', props.infoBlock.idInfoBlock)
  emit('close')
}

const isEditInfoOpen = ref(false)

const onEdit = () => {
  isEditInfoOpen.value = true
}

const onEditInfoClose = (text?: string) => {
  isEditInfoOpen.value = false

  if (text) emit('edit', props.infoBlock.idInfoBlock, text)
}
</script>

<template>
  <div v-show="!isDelBoxOpen && !isEditInfoOpen" class="modal">
    <div class="btn" @click="onClose">
      <img src="/src/assets/close2.svg" />
    </div>
    <div class="text">
      <div class="button">
        <div>
          <img src="/src/assets/editinfo.svg" @click="onEdit" />
        </div>
        <div>
          <img src="/src/assets/del2.svg" @click="onDelete" />
        </div>
      </div>
      <p>
        {{ infoBlock.text }}
      </p>
    </div>
  </div>

  <ConfirmDelBox v-if="isDelBoxOpen" @close="onDelBoxClose"></ConfirmDelBox>
  <EditInfo v-if="isEditInfoOpen" @close="onEditInfoClose"></EditInfo>
</template>

<style scoped>
.modal {
  position: fixed; /* фиксированное положение */
  top: 50%; /* отступ от верхнего края элемента */
  left: 50%; /* отступ от левого края элемента */
  transform: translate(-50%, -50%); /* центрирование элемента */
  z-index: 1; /* находится поверх страницы */
  background: rgba(45, 45, 45, 80%); /* цвет окна */
}

.text {
  display: flex; /* элементы в блок */
  flex-direction: column; /* элементы в столбец */
  gap: 10px; /* отступы между элементами*/
  width: 600px; /* ширина */
  height: 400px; /* высота */
  position: relative; /* относительное положение */
  margin: 30px; /* отступы */
}

.button {
  display: flex; /* элементы в блок */
  flex-direction: row; /* элементы в стрроку */
  gap: 4px; /* отступы между элементами*/
  align-items: flex-start; /* расположение сверху */
  justify-content: flex-end; /* расположение справа */
}

.btn {
  display: flex; /* элементы в блок */
  position: absolute; /* абсолютное положение */
  top: 0; /* отступ от верхнего края элемента */
  right: 0; /* отступ от правого края элемента */
}

p {
  font-family: Rubik, sans-serif; /* шрифт */
  font-size: 20px; /* рамзер текста */
  text-align: justify; /* текст по ширине */
  line-height: 40px; /* отступы внутри текста*/
  color: #fff; /* цвет текста */
  margin: 0%; /* отступы */
}
</style>
