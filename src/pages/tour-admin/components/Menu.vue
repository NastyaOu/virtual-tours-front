<template>
    <modal>
        <div class="button">
            <btn>Добавить видеозапись</btn>
            <btn>Добавить изображение</btn>
            <btn>Добавить информацию</btn>
            <btn>Добавить переход</btn>
        </div>
    </modal>
</template>

<style scoped>
modal {
    position: fixed; /* фиксированное положение */
    z-index: 1;  /* находится поверх страницы */
    padding: 30px; /* отступы окна */
    background: rgba(45, 45, 45, 80%); /* цвет окна */
}

.button {
    display: flex; /* элементы в блок */
    flex-direction: column;  /* элементы в колонну */
    gap: 20px;  /* отступы между лементами*/
    color: #fff;  /* цвет */
    text-align: center; /* текст по центру*/
}
</style>