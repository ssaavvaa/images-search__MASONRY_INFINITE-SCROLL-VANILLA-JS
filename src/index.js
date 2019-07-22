import InfiniteScroll from 'infinite-scroll';
import galleryItemTemplate from './template/gallery-item-template.hbs';


import './styles.css';

// REFS
const searchForm = document.querySelector('.search-form');
const imageContainer = document.querySelector('.gallery');
const inputValue = document.querySelector('.search-form__input');

//добавляем сначала маркап а потом применяем на него мэйсонри


function mason(){
    new Masonry(imageContainer, {
        itemSelector: '.gallery__item',
      });
      imageContainer.style.opacity = 1
   };



const AddToDom = images => {
    const markup = images.map( image => galleryItemTemplate(image)).join('');
    imageContainer.innerHTML = `${imageContainer.innerHTML + markup}`

    const applyMason = setInterval(mason,100);
    setTimeout(() => {
       clearInterval(applyMason)
   }, 1000);
 }


// Вешаю сдушатель на сабмит

function handleSubmit(e) {
    e.preventDefault();
    infScrollInstance.pageIndex = 1;
        imageContainer.innerHTML='';
        infScrollInstance.loadNextPage();
};
searchForm.addEventListener('submit', handleSubmit);

// Initialize infinite-scroll

const infScrollInstance = new InfiniteScroll( imageContainer, {  
    path:function() {
        return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=13083162-0136df30d1856527dad6bba93&q=${inputValue.value}&image_type=photo&page=${this.pageIndex}&per_page=20`;
    },
    history: false,
    responseType: 'text',
    status: '.loader-ellips'
});

infScrollInstance.on('load', response => {
    const images = JSON.parse(response).hits;
    AddToDom(images)

});

