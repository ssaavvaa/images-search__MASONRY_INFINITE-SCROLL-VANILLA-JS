
export const ErrorMsg = error => {
    errorMessage.innerText = error;
    return errorMessage.style.display = "block";
 }

 export const AddToDom = images => {
    const markup = images.map( image => galleryItemTemplate(image)).join('');
    imageContainer.innerHTML = `${imageContainer.innerHTML + markup}`
 }