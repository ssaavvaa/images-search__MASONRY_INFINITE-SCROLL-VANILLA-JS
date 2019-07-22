import InfiniteScroll from 'infinite-scroll';
import { ErrorMsg , AddToDom , errorMessage , searchForm ,
         imageContainer , input } from './helpers/helpers';
import './styles.css';
const corsPass = "https://cors-anywhere.herokuapp.com/";
const key = "13083162-0136df30d1856527dad6bba93"
const ellips = document.querySelector(".loader-ellips");

const handleSubmit = e => {
    e.preventDefault();
    infScrollInstance.pageIndex = 1;
        imageContainer.innerHTML='';
        errorMessage.style.display = "none"
        imageContainer.style.height = "auto"
        infScrollInstance.loadNextPage();
};

searchForm.addEventListener('submit', handleSubmit);

const perPage = 20

const infScrollInstance = new InfiniteScroll( imageContainer, {  
    path:function() {
        return `${corsPass}https://pixabay.com/api/?key=${key}&q=${input.value}&image_type=photo&page=${this.pageIndex}&per_page=${perPage}`;
    },
    history: false,
    responseType: 'text',
    status: '.loader-ellips',
    scrollThreshold: 600,
    checkLastPage:".last_page"
});



infScrollInstance.on( 'error', function() {
    ellips.style.display = "none";
    return ErrorMsg("Network Error");
})

 let discoveredItems = perPage

 infScrollInstance.on('load', (response , event) => {
    const { hits:images , totalHits } = JSON.parse(response);

    if(input.value === "" || input.value === null){
        return ErrorMsg("Пожалуйста введите слово для поиска");
    }

    if(totalHits === 0){
        return ErrorMsg("Ничего не найдено по вашему запросу");
    }

    if(discoveredItems > totalHits ){
        ellips.style.display = "none";
        ErrorMsg("Больше нет картинок");
    
    }


    AddToDom(images);

    imagesLoaded( imageContainer, function() {
        new Masonry(imageContainer, {
            itemSelector: '.gallery__item'
          });
      });

      discoveredItems += 20
 
});



