<template>
    <div class="wrap">
        <div class="content wrap-content">
            <h1>МБУ ДО ДШИ им. Г.И. Бабко</h1>
            <button>Посетить</button>
        </div>
    </div>
</template>

<style scoped>
.wrap {
    background: url('./src/assets/school.png'); /* фон */
    padding: 240px 0px; /* отступы */
}

.wrap-content {
    display: flex;    /* элементы в блок */
    align-items: center;    /* элементы по центру*/
    flex-direction: column;    /* элементы в колонну */
}

h1 {
    display: flex;   /* элементы в блок */
    font-size: 48px;   /* рамзер текста */
    color: #FFFFFF;   /* цвет текста */
    margin: 0%; /* нет внутренних отступов */
    padding-bottom: 50px; /* отступ снизу*/
}

button {
    font-size: 20px;    /* размер текста */
    background-color: rgba(45, 45, 45, 0%);    /* цвет кнопки */
    border: 3px solid #FFFFFF; /* цвет и размер рамки */
    text-align: center;    /* текст по центру */
    color: #FFFFFF;    /* цвет текста */
    padding: 20px 73px;    /* отступы сверху\снизу и слева\справа от текста*/
}
</style>