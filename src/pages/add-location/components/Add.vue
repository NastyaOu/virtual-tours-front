<template>
    <aside>
        <div class="content">
            <h1>Добавление локации</h1>
            <list>
                <item>
                    <label>Название локации</label>
                    <input type="text">
                </item>
                <item>
                    <label>Изображение</label>
                    <div class="item">
                        <input type="file">
                        <img src="/src/assets/close.svg">
                    </div>
                </item>
                <div class="btn">
                    <img src="/src/assets/add.svg">
                </div>
            </list>
            <div class="button">
                <button>Добавить</button>
                <button>Отменить</button>
            </div>
        </div>
    </aside>
</template>

<style scoped>
aside {
    padding: 60px 0px;
    /* отступы сверху\снизу */
}

h1 {
    font-size: 36px;
    /* рамзер текста */
    padding-bottom: 30px;
    /* отступ снизу */
    margin: 0%;
    /* нет внутренних отступов */
    color: #2D2D2D;
    /* цвет текста */
    text-align: center;
    /* текст по центру */
}

list {
    display: flex;
    /* элементы в блок */
    flex-direction: column;
    /* элементы в колонну */
    gap: 30px;
    /* отступ между элементами */
    padding-bottom: 30px;
    /* отступ снизу */
    justify-content: space-between;
    /* элементы по ширине */
}

item {
    display: flex;
    /* элементы в блок */
    flex-direction: row;
    /* элементы в строку */
    justify-content: space-between;
    /* текст по ширине */
}

label {
    font-size: 20px;
    /* рамзер текста */
    text-align: justify;
    /* текст по ширине */
    color: #2D2D2D;
    /* цвет текста */
    margin: 0%;
    /* нет внутренних отступов */
    align-items: center;
    /* элементы по центру */
}

input {
    width: 920px;
    /* ширина */
    border: 1px solid #2D2D2D;
    /* цвет */
}

.item {
    display: flex;
    /* элементы в блок */
    flex-direction: row;
    /* элементы в строку */
    gap: 5px;
    /* отступ между элементами */
}

.btn {
    padding-left: 250px;
    /* отступ слева */
}

.button {
    display: flex;
    /* элементы в блок */
    justify-content: center;
    /* элементы по центру */
    gap: 30px;
    /* отступ между элементами */
}

button {
    font-size: 20px;
    /* размер текста */
    background-color: rgba(45, 45, 45, 0%);
    /* цвет кнопки */
    border: 2px solid #2D2D2D;
    /* цвет и размер рамки */
    text-align: center;
    /* текст по центру */
    color: #2D2D2D;
    /* цвет текста */
    padding: 20px 70px;
    /* отступы сверху\снизу и слева\справа от текста*/
}
</style>