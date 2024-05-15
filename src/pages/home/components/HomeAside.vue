<template>
    <div class="wrap">
        <div class="content">
            <h1>Дополни свою реальность</h1>
            <p>
                Уникальная коллекция виртуальных туров<br> по учреждениям системы дополнительного
                образования города
                Кирово-Чепецка
            </p>
            <button>О проекте</button>
        </div>
    </div>
</template>

<style scoped>
.wrap {
    background: url('./src/assets/sity.png');    /* фон */
    padding: 180px 0px;    /* отступы сверху\снизу */
    background-size: cover;    /* чтобы была одна картинка */
}

h1 {
    display: flex;    /* элементы в блок */
    font-size: 64px;    /* размер текста */
    color: #FFFFFF;    /* цвет текста */
    margin: 0%;    /* убрать все отступы*/
}

p {
    display: flex;    /* элементы в блок */
    font-size: 20px;    /* размер текста */
    color: #FFFFFF;    /* цвет текста */
    margin: 20px 0px 30px;    /*отступы по часовой*/
    line-height: 25px;
}

button {
    font-size: 20px;    /* размер текста */
    background-color: rgba(45, 45, 45, 0%);    /* цвет кнопки */
    border: 3px solid #FFFFFF; /* цвет и размер рамки */
    text-align: center;    /* текст по центру */
    color: #FFFFFF;    /* цвет текста */
    padding: 20px 70px;    /* отступы сверху\снизу и слева\справа от текста*/
}
</style>