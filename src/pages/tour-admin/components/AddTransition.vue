<template>
    <modal>
        <div class="content">
            <h1>Добавление перехода</h1>
            <p>Выберите локацию для перехода</p>
            <div class="radio">
                <div class="item">
                    <input type="radio" id="local1" name="drone" value="local1" checked />
                    <label for="local1">Локация 1. Главный вход</label>
                </div>
                <div class="item">
                    <input type="radio" id="local2" name="drone" value="local2" checked />
                    <label for="local2">Локация 2. Главный зал</label>
                </div>
                <div class="item">
                    <input type="radio" id="local3" name="drone" value="local3" checked />
                    <label for="local3">Локация 3. Холл</label>
                </div>
            </div>
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
    transform: translate(-50%, -50%);   /* центрирование элемента */
    z-index: 1;     /* находится поверх страницы */
    background: rgba(45, 45, 45, 80%);     /* цвет окна */
    padding: 30px;     /* отступы окна */
}

h1 {
    display: flex;  /* элементы в блок */
    font-size: 36px;     /* рамзер текста */
    padding-bottom: 20px;     /* отступ снизу */
    margin: 0%;     /* нет внутренних отступов */
    color: #fff;     /* цвет текста */
    justify-content: center;  /* элементы по центру */
}

p {
    display: flex;/* элементы в блок */
    font-size: 20px;     /* рамзер текста */
    padding-bottom: 20px;    /* отступ снизу */
    margin: 0%;    /* нет внутренних отступов */
    color: #fff;    /* цвет текста */
    justify-content: center;  /* элементы по центру */
}

.radio{
    display: flex;  /* элементы в блок */
    flex-direction: column;  /* элементы в колонну */
    gap: 10px;  /* отступы между элементами*/
    padding-bottom: 20px;  /* отступ снизу */
}

.item {
    display: flex;  /* элементы в блок */
    flex-direction: row;  /* элементы в строку */
}

input {
    display: flex;  /* элементы в блок */
    align-items: center;   /* элементы по центру по вертикали */
    margin: 0%;  /* отступы */
}

label {
    display: flex;  /* элементы в блок */
    font-size: 20px;    /* рамзер текста */
    margin: 0%;    /* нет внутренних отступов */
    color: #fff;    /* цвет текста */
    padding-left: 4px;  /* отступ слева */
}

.button {
    display: flex;    /* элементы в блок */
    justify-content: center;    /* элемент по центру по горизонтали */
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