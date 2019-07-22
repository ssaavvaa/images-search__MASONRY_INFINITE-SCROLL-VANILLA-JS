import InfiniteScroll from 'infinite-scroll';
import { ErrorMsg , AddToDom , errorMessage , searchForm ,
         imageContainer , input } from './helpers/helpers';
import './styles.css';


const handleSubmit = e => {
    e.preventDefault();
    infScrollInstance.pageIndex = 1;
        imageContainer.innerHTML='';
        errorMessage.style.display = "none"
        imageContainer.style.height = "auto"
        infScrollInstance.loadNextPage();
};

searchForm.addEventListener('submit', handleSubmit);


const infScrollInstance = new InfiniteScroll( imageContainer, {  
    path:function() {
        return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=13083162-0136df30d1856527dad6bba93&q=${input.value}&image_type=photo&page=${this.pageIndex}&per_page=20`;
    },
    history: false,
    responseType: 'text',
    status: '.loader-ellips'
});


 infScrollInstance.on('load', response => {
    if(input.value === "" || input.value === null){
        return ErrorMsg("Пожалуйста введите слово для поиска");
    }

   const { hits:images = [] , totalHits } = JSON.parse(response);

    if(totalHits === 0){
        return ErrorMsg("Ничего не найдено по вашему запросу");
    }

    AddToDom(images);

    imagesLoaded( imageContainer, function() {
        new Masonry(imageContainer, {
            itemSelector: '.gallery__item'
          });
          imageContainer.style.opacity = 1
      });

});

