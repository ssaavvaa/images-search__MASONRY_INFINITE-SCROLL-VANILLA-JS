import InfiniteScroll from 'infinite-scroll';
import {inputValue as userQuery} from '../index.js';


const imageContainer = document.querySelector('.gallery');

const infScrollInstance = new InfiniteScroll( imageContainer, {  
    path() {
        return `https://pixabay.com/api/?key=13083162-0136df30d1856527dad6bba93&q=flowers&image_type=photo`;
    },
    history: false,
    responseType: 'text',
});

export default infScrollInstance;

console.log(userQuery);