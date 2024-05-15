<template>
    <modal>
        <div class="content">
            <h1>Добавление информации</h1>
            <input type="text">
            <div class="button">
                <button>Добавить</button>
                <button>Отменить</button>
            </div>
        </div>
    </modal>
</template>

<style scoped>
modal {
    position: fixed;     /* фиксированное положение */
    top: 50%;     /* отступ от верхнего края элемента */
    left: 50%;     /* отступ от левого края элемента */
    transform: translate(-50%, -50%);  /* центрирование элемента */
    z-index: 1;     /* находится поверх страницы */
    background: rgba(45, 45, 45, 80%);     /* цвет окна */
    padding: 30px; /* отступы окна */
}

h1 {
    display: flex;
    font-size: 36px;    /* рамзер текста */
    padding-bottom: 20px;    /* отступ снизу */
    margin: 0%;    /* нет внутренних отступов */
    color: #fff;    /* цвет текста */
    justify-content: center;  /* элементы по центру */
}

input {
    width: 100%;  /* ширина */
    height: 100%;  /* высота */
    margin-bottom: 20px;  /* отступ снизу */
    color: #2D2D2D;  /* цвет текста*/
    font-family: Rubik, sans-serif; /* шрифт */
}

.button {
    display: flex; /* элементы в блок */
    justify-content: center; /* элемент по центру по горизонтали */
    gap: 30px;  /* отступ между элементами */
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