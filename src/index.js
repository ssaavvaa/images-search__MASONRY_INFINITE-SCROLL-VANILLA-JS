import InfiniteScroll from 'infinite-scroll';
import galleryItemTemplate from './template/gallery-item-template.hbs';


import './styles.css';

// REFS
const searchForm = document.querySelector('.search-form');
const imageContainer = document.querySelector('.gallery');
const input = document.querySelector('.search-form__input');
const nullReturn = document.querySelector('.no_return');
const body = document.querySelector('body');

//добавляем сначала маркап а потом применяем на него мэйсонри




// Вешаю сдушатель на сабмит

function handleSubmit(e) {
    e.preventDefault();
 
    infScrollInstance.pageIndex = 1;
        imageContainer.innerHTML='';
        nullReturn.style.display = "none"
        imageContainer.style.height = "auto"
        infScrollInstance.loadNextPage();
};
searchForm.addEventListener('submit', handleSubmit);

// Initialize infinite-scroll

const infScrollInstance = new InfiniteScroll( imageContainer, {  
    path:function() {
        return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=13083162-0136df30d1856527dad6bba93&q=${input.value}&image_type=photo&page=${this.pageIndex}&per_page=20`;
    },
    history: false,
    responseType: 'text',
    status: '.loader-ellips'
});

const AddToDom = images => {
    const markup = images.map( image => galleryItemTemplate(image)).join('');
    imageContainer.innerHTML = `${imageContainer.innerHTML + markup}`
 }


 infScrollInstance.on('load', response => {
    if(input.value === "" || input.value === null){
        nullReturn.innerText = "Пожалуйста введите слово для поиска"
        return nullReturn.style.display = "block"
    }

    const {hits , totalHits } = JSON.parse(response);

    if(totalHits === 0){
        nullReturn.innerText = "Ничего не найдено по вашему запросу"
        return nullReturn.style.display = "block"
    }

 
    AddToDom(hits)

    imagesLoaded( imageContainer, function() {
        new Masonry(imageContainer, {
            itemSelector: '.gallery__item'
          });
          imageContainer.style.opacity = 1
      });

});

