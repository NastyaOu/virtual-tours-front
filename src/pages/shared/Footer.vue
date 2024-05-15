<template>
    <footer>
        <div class="content">
            <div class="footer-content">
                <img src="/src/assets/logo.png" title="Логотип" alt="Логотип" width="63" height="63">
                <nav>
                    <a>О проекте</a>
                    <a>Организации</a>
                </nav>
            </div>
            <p>
            © Кванториум, Кирово-Чепецк<br>Использование материалов сайта согласуется с администрацией учреждений.
            </p>
        </div>
    </footer>
</template>

<style scoped>
footer {
    background: #2D2D2D; /* цвет подвала */
    padding: 60px 0px; /* отступы шапки */
}

.footer-content {
    display: flex; /* элементы в блок */
}

nav {
    display: flex; /* элементы в блок */
    align-items: center;
    color: #FFFFFF;  /* цвет текста*/
    font-size: 20px; /* размер текста*/
    gap: 80px; /* отступы между элементами*/
    padding-left: 363px;
}

p {
    text-align: center; /* текст по центру*/
    color: #FFFFFF; /* цвет текста*/
    padding-top: 10px;  /* цотступ сверхувет */
    margin: 0%;  /* отступы внутр */
    line-height: 25px;  /* отступы внутри текста */
}
</style>