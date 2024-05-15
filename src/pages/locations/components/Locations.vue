<template>
    <aside>
        <div class="content">
            <h1>Локации</h1>
            <list>
                <item>
                    <p>Локация 1. Главный вход</p>
                    <img src="/src/assets/edit.svg">
                    <img src="/src/assets/del.svg">
                </item>
            </list>
            <div class="btn">
                <img src="/src/assets/add.svg">
            </div>
        </div>
    </aside>
</template>

<style scoped>
aside {
    padding: 60px 0px; /* отступы сверху\снизу */
}

h1 {
    font-size: 36px;    /* рамзер текста */
    padding-bottom: 30px;    /* отступ снизу */
    margin: 0%;    /* нет внутренних отступов */
    color: #2D2D2D;    /* цвет текста */
    text-align: center;    /* текст по центру */
}


list {
    display: flex;    /* элементы в блок */
    flex-direction: column;    /* элементы в колонну */
    gap: 30px;    /* отступ между элементами */
    padding-bottom: 15px;  /* отступ снизу */
}

item {
    display: flex;    /* элементы в блок */
    flex-direction: row;    /* элементы в строку */
    align-items: center;    /* элементы по центру по вертикали*/
}

p {
    font-size: 20px;    /* рамзер текста */
    text-align: justify;    /* текст по ширине */
    color: #2D2D2D;    /* цвет текста */
    margin: 0%;    /* нет внутренних отступов */
    align-items: center;    /* элементы по центру */
    padding-right: 20px;    /* отступ справа */
}

img {
    padding-right: 4px;  /* отступ справа */
}
</style>