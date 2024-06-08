<template>
    <div class="wrap">
        <div class="btn">
            <img src="/src/assets/add1.svg" width="60px" height="60px">
        </div>
        <img src="/src/assets/btn_video.svg">
        <img src="/src/assets/btn_photo.svg">
        <img src="/src/assets/btn_info.svg">
        <img src="/src/assets/btn_transition.svg">
        <div class="button">
            <button>Подтвердить</button>
            <button>Отменить</button>
        </div>
    </div>
</template>

<style scoped>
.wrap {
    background: url('./src/assets/school.png'); /* фон */
    height: 615px;  /* высота */
    background-size: cover;    /* чтобы была одна картинка */
}

.btn {
    display: flex;   /* элементы в блок */
    padding: 20px 20px;  /* отступы */
    align-items: flex-end;  /* элементы снизу */
    justify-content: flex-end;  /* элементы справа */
}

.button {
    display: flex; /* элементы в блок */
    justify-content: center; /* элемент по центру по горизонтали */
    gap: 30px;  /* отступы между элементами*/
    align-items: flex-end;  /* элементы снизу по вертикали */
}

button {
    font-size: 20px;    /* размер текста */
    background-color: rgba(45, 45, 45, 0%);    /* цвет кнопки */
    border: 2px solid #fff;    /* цвет и размер рамки */
    text-align: center;    /* текст по центру */
    color: #fff;    /* цвет текста */
    width: 240px;  /* ширина */
    height: 65px;  /* высота */
}
</style>