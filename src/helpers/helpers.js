import galleryItemTemplate from '../template/gallery-item-template.hbs';

export const errorMessage = document.querySelector('.no_return');
export const searchForm = document.querySelector('.search-form');
export const imageContainer = document.querySelector('.gallery');
export const input = document.querySelector('.search-form__input');


export const ErrorMsg = error => {
    errorMessage.innerText = error;
    return errorMessage.style.display = "block";
 }

 export const AddToDom = images => {
    const markup = images.map( image => galleryItemTemplate(image)).join('');
    imageContainer.innerHTML = `${imageContainer.innerHTML + markup}`
 }

