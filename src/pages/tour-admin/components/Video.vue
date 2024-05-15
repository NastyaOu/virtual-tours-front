<template>
    <modal>
        <div class="btn">
            <img src="/src/assets/close2.svg">
        </div>
        <div class="video-wrapper">
            <video playsinline autoplay muted loop>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                
            </video>
            <div class="btn">
                    <img src="/src/assets/del2.svg">
                </div>
        </div>
    </modal>
</template>

<style scoped>
modal {
    position: fixed;    /* фиксированное положение */
    top: 50%; /* отступ от верхнего края элемента */
    left: 50%; /* отступ от левого края элемента */
    transform: translate(-50%,-50%);   /* центрирование элемента */
    z-index: 1;    /* находится поверх страницы */
    background: rgba(45, 45, 45, 80%);    /* цвет окна */
}

.video-wrapper {
    width: 600px; /* ширина */
    height: 400px; /* высота */
    position: relative; /* относительное положение */
    overflow: hidden;  /* скрывает часть содержимого */
    margin: 30px;  /* отступы */
}

video {
    object-fit: cover;  /* изменение размера для соответствие сторон контейнера */
    position: absolute; /* абсолютное положение */
    top: 0; /* отступ от верхнего края элемента */
    left: 0; /* отступ от левого края элемента */
    height: 100%; /* высота */
    width: 100%; /* ширина */
}

.btn {
    display: flex; /* элементы в блок */
    align-items: flex-start; /* расположение сверху */
    justify-content: flex-end; /* расположение справа */
    position: absolute; /* абсолютное положение */
    top: 0; /* отступ от верхнего края элемента */
    right: 0; /* отступ от правого края элемента */
} 
</style>