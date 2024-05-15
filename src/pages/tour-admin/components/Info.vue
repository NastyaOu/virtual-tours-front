<template>
    <modal>
        <btn>
            <img src="/src/assets/close2.svg">
        </btn>
        <div class="text">
            <div class="button">
                <div class="btn">
                    <img src="/src/assets/editinfo.svg">
                </div>
                <div class="btn">
                    <img src="/src/assets/del2.svg">
                </div>
            </div>
            <p>fiheif ewkjnfeh;auhf ewfaewfawfjefk wfjnenfjwjfjnawef fiheif ewkjnfeh;auhf ewfaewfawfjefk wfjnenfjwjfjnawef 
                fiheif ewkjnfeh;auhf ewfaewfawfjefk wfjnenfjwjfjnawef fiheif ewkjnfeh;auhf ewfaewfawfjefk wfjnenfjwjfjnawef 
                fiheif ewkjnfeh;auhf ewfaewfawfjefk wfjnenfjwjfjnawef</p>
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
}

.text {
    display: flex;   /* элементы в блок */
    flex-direction: column;  /* элементы в столбец */
    gap: 10px;  /* отступы между элементами*/
    width: 600px;     /* ширина */
    height: 400px;     /* высота */
    position: relative;     /* относительное положение */
    margin: 30px;     /* отступы */
}

.button {
    display: flex;  /* элементы в блок */
    flex-direction: row;  /* элементы в стрроку */
    gap: 4px;  /* отступы между элементами*/
    align-items: flex-start;     /* расположение сверху */
    justify-content: flex-end;     /* расположение справа */
}

btn {
    display: flex;     /* элементы в блок */
    position: absolute;     /* абсолютное положение */
    top: 0;     /* отступ от верхнего края элемента */
    right: 0;     /* отступ от правого края элемента */
}

p {
    font-family: Rubik, sans-serif; /* шрифт */
    font-size: 20px;    /* рамзер текста */
    text-align: justify;  /* текст по ширине */
    line-height: 40px;  /* отступы внутри текста*/
    color: #fff;  /* цвет текста */
    margin:0%;  /* отступы */
}
</style>