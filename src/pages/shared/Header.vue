<template>
    <header>
        <div class="content content-header">
            <img src="/src/assets/logo.png" title="Логотип" alt="Логотип" width="63" height="63">
            <nav>
                <a>О проекте</a>
                <a>Организации</a>
            </nav>
            <button>Войти</button>
        </div>
    </header>
</template>

<style scoped>
header {
    background: #2D2D2D;    /* цвет шапки */
    padding: 20px 0px;    /* отступы */
}

.content-header {
    display: flex;    /* элементы в блок */
    align-items: center;    /* элементы по центру по вертикали*/
    justify-content: space-between;    /* элементы по ширине */
}

nav {
    display: flex;    /* элементы в блок */
    color: #FFFFFF;    /* цвет текста */
    font-size: 20px;    /* размер текста */
    gap: 80px;    /* отступ между элементами */
}

button {
    font-size: 20px;    /* размер текста */
    background-color: rgba(45, 45, 45, 0%);    /* цвет кнопки */
    border: 2px solid #FFFFFF; /* цвет и размер рамки */
    text-align: center;    /* текст по центру */
    color: #FFFFFF;    /* цвет текста */
    padding: 20px 60px;    /* отступы от текста*/
}
</style>