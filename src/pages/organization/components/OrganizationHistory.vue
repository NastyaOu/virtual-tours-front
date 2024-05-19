<template>
    <div class="history">
        <div class="content">
            <h1>История учреждения</h1>
            <list>
                <item>
                    <img src="/src/assets/mark.svg">
                    <p>Проект здания школы предложил директор химзавода Я. Ф. Терещенко</p>
                </item>
                <item>
                    <img src="/src/assets/mark.svg" width="40" height="40">
                    <p>В 1953 году, распоряжением Кировского Совета была учреждена детская музыкальная школа.<br>
                        Первый директор - Г. И. Бабко. Первые преподавали - Л. Н. Мясникова и Р. Ш. Дорфман.</p>
                </item>
                <item>
                    <img src="/src/assets/mark.svg">
                    <p>Строительство нового здания музыкальной школы завершилось в 1968 году.</p>
                </item>
                <item>
                    <img src="/src/assets/mark.svg">
                    <p>В 1970 году, проект здания школы был удостоен диплома III степени Госстроя РСФСР.</p>
                </item>
                <item>
                    <img src="/src/assets/mark.svg">
                    <p>В 1981 году Приказом управления культуры Кировского облисполкома музыкальная школа
                        была реорганизована в школу искусств.</p>
                </item>
                <item>
                    <img src="/src/assets/mark.svg">
                    <p>Сегодня школа носит имя её основателя - Георгия Ивановича Бабко.</p>
                </item>
            </list>
        </div>
    </div>
</template>

<style scoped>
.history {
    padding: 60px 0px;    /* отступы сверху\снизу */
}

h1 {
    font-size: 36px;    /* рамзер текста */
    padding-bottom: 30px;    /* отступ снизу */
    text-align: center;    /* текст по центру */
    margin: 0%;    /* нет внутренних отступов */
    color: #2D2D2D;    /* цвет текста */
}

list {
    display: flex;    /* элементы в блок */
    flex-direction: column;    /* элементы в колонну */
    gap: 30px;    /* отступ между элементами */
}

item {
    display: flex;    /* элементы в блок */
    flex-direction: row;    /* элементы в строку */
    align-items: center;    /* элементы по центру по вертикали*/
}

p {
    font-size: 20px;    /* рамзер текста */
    text-align: justify;    /* текст по ширине */
    line-height: 40px;    /* отступы между строками */
    color: #2D2D2D;    /* цвет текста */
    margin: 0%;    /* нет внутренних отступов */
    align-items: center;    /* элементы по центру */
    padding-left: 15px;    /* отступ слева */
}
</style>