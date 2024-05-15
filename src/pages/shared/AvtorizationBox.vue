<template>
    <modal>
        <div class="content">
            <div class="header-logo">
                <img src="/src/assets/logo.png" title="Логотип" alt="Логотип" width="63" height="63">
                <h1>Авторизация</h1>
            </div>
            <list>
                <item>
                    <label>Логин</label>
                    <input type="text">
                </item>
                <item>
                    <label>Пароль</label>
                    <input type="password">
                </item>
            </list>
            <div class="button">
                <button>Войти</button>
                <button>Отменить</button>
            </div>
        </div>
    </modal>
</template>

<style scoped>
modal {
    position: fixed; /* фиксированное положение */
    top: 50%; /* отступ от верхнего края элемента */
    left: 50%; /* отступ от левого края элемента */
    transform: translate(-50%,-50%);  /* центрирование элемента */
    z-index: 1;  /* находится поверх страницы */
    padding: 50px 60px 60px; /* отступы окна */
    background: rgba(45, 45, 45, 80%); /* цвет окна */
}

.header-logo {
    display: flex;    /* элементы в блок */
    flex-direction: row;    /* элементы в строку */
    align-items: center; /* элементы по центру по вертикали */
    padding-bottom: 50px;  /* отступ */
}

h1 {
    padding-top: 20px; /* ИСПРАВИТЬ! */
    padding-left: 135px; /* ИСПРАВИТЬ! */
    font-size: 36px;    /* рамзер текста */
    padding-bottom: 30px;    /* отступ снизу */
    margin: 0%;    /* нет внутренних отступов */
    color: #fff;    /* цвет текста */
}

list {
    display: flex;    /* элементы в блок */
    flex-direction: column;    /* элементы в колонну */
    gap: 30px;    /* отступ между элементами */
    padding-bottom: 20px;    /* отступ снизу */
    justify-content: space-between;    /* элементы по ширине */
}

item {
    display: flex;    /* элементы в блок */
    flex-direction: row;    /* элементы в строку */
    justify-content: space-between; /* элементы по ширине */
}

label {
    font-size: 20px;    /* рамзер текста */
    color: #fff;    /* цвет текста */
    margin: 0%;    /* нет внутренних отступов */
    padding-right: 40px; /* элементы отступ справа */
}

input {
    width: 460px;  /* ширина */
    border: 1px solid #2D2D2D; /* цвет */
}

.button {
    display: flex; /* элементы в блок */
    justify-content: center; /* элемент по центру по горизонтали */
    gap: 30px;  /* отступы между элементами */
}

button {
    font-size: 20px;    /* размер текста */
    background-color: rgba(45, 45, 45, 0%);    /* цвет кнопки */
    border: 2px solid #fff;    /* цвет и размер рамки */
    text-align: center;    /* текст по центру */
    color: #fff;    /* цвет текста */
    width: 240px;  /* ширина */
    height: 65px;  /* высота */
    margin-top: 30px;  /* отступ сверху */
}
</style>