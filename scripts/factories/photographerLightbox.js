// On construit la lightbox
function buildLightBox() {
    // on bloque le scroll sur "body"
    document.body.style.overflow = "hidden";
    // on crée le background de la lightbox
    const mainContainer = document.getElementById("main");
    const lightBoxBackground = document.createElement("div");
    lightBoxBackground.setAttribute("id","lightbox_background");
    mainContainer.appendChild(lightBoxBackground);
    // dans le background, on crée les composants de la lightbox
    const close = document.createElement("div");
    close.setAttribute("id","lightbox_close");
    close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>';
    lightBoxBackground.appendChild(close);
    // On crée un container pour placer les slides
    const lightBoxContainer = document.createElement("div");
    lightBoxContainer.setAttribute("id","lightbox_container");
    lightBoxBackground.appendChild(lightBoxContainer);
    // On crée les éléments de navigations (previous / next=)
    const next = document.createElement("div");
    next.setAttribute("id","lightbox_next");
    next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>';
    const prev = document.createElement("div");
    prev.setAttribute("id","lightbox_prev");
    prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>'
    lightBoxBackground.appendChild(next);
    lightBoxBackground.appendChild(prev);
}

// Fermer la lightbox
function removeLightBox() {
    document.body.style.overflow = "scroll";
    const lightBoxBackground = document.getElementById("lightbox_background");
    if(lightBoxBackground){lightBoxBackground.remove();}
}

// On définit un index de départ, c'est l'image que laquelle on a cliqué
function showSlides(mediasPhotographer, mediaIndex){
    
    console.log(mediaIndex);
    // data medias
    //On recherche l'objet correspondant grâce à mediaIndex
    const mediaTarget = mediasPhotographer[mediaIndex]; // retourne l'objet du média sur lequel on a cliqué
    const { id, photographerId, title, image, video, likes, date, price } = mediaTarget;  // les éléments entre {} représentent les types de datas de l'élément media 

    const lightBoxContainer = document.getElementById("lightbox_container");
    const lightBoxSlide = document.createElement("div");
    lightBoxSlide.classList.add("slide");
    lightBoxContainer.appendChild(lightBoxSlide);

    const slideTitle = document.createElement("p");
    slideTitle.classList.add("slide__title");
    slideTitle.textContent = mediaTarget.title;
    lightBoxSlide.appendChild(slideTitle);

    const slideFigure = document.createElement("figure");
    slideFigure.classList.add("slide__figure");
    lightBoxSlide.appendChild(slideFigure);

    if(image){
        const slideImg = document.createElement("img");
        slideImg.classList.add("slide__img");
        const urlImage = `../assets/medias/` + image;
        slideImg.setAttribute("src", urlImage);
        slideImg.setAttribute("alt", title);
        slideFigure.appendChild(slideImg);
    }
    if(video){
        const slideVideo = document.createElement("video");
        slideVideo.classList.add("slide__video");
        slideVideo.setAttribute("controls", "");
        const urlVideo = `../assets/medias/` + video;
        const slideVideoSource = document.createElement("source");
        slideVideoSource.setAttribute("src", urlVideo);
        slideVideoSource.setAttribute("type", "video/mp4");
        slideVideo.appendChild(slideVideoSource);
        slideFigure.appendChild(slideVideo);
    }
}

function nextSlide(mediasPhotographer, mediaIndex) { 
    document.querySelector(".slide").remove();
    let slidesTotal = mediasPhotographer.length - 1;
    if(mediaIndex < slidesTotal){  // si l'index du media peut être augmenté de 1
        showSlides(mediasPhotographer, mediaIndex += 1);
    } else { // sinon on est arrivé à la fin de la liste
        removeLightBox();
    }
}
function prevSlide(mediasPhotographer, mediaIndex) { 
    document.querySelector(".slide").remove();
    if(mediaIndex != 0){  // si l'index du media est différent du premier de la liste
        showSlides(mediasPhotographer, mediaIndex -= 1);
    } else { // on est arrivé au début de la liste
        removeLightBox();
    }
} 