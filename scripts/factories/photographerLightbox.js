// On construit la lightbox
function buildLightBox() {
    // on crée le background de la lightbox
    const mainContainer = document.getElementById("main");
    const lightBoxBackground = document.createElement("div");
    lightBoxBackground.setAttribute("id","lightbox_background");
    lightBoxBackground.setAttribute("role","dialog");
    mainContainer.appendChild(lightBoxBackground);
    // dans le background, on crée les composants de la lightbox
    const close = document.createElement("div");
    close.setAttribute("id","lightbox_close");
    close.setAttribute("role","navigation");
    close.setAttribute("tabindex","0");
    close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>';
    // On crée un container pour placer les slides
    const lightBoxContainer = document.createElement("div");
    lightBoxContainer.setAttribute("id","lightbox_container");
    lightBoxBackground.appendChild(lightBoxContainer);
    // On crée les éléments de navigations (previous / next=)
    const next = document.createElement("div");
    next.setAttribute("id","lightbox_next");
    next.setAttribute("role","navigation");
    next.setAttribute("tabindex","0");
    next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>';
    const prev = document.createElement("div");
    prev.setAttribute("id","lightbox_prev");
    prev.setAttribute("role","navigation");
    prev.setAttribute("tabindex","0");
    prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>'
    lightBoxBackground.appendChild(prev);
    lightBoxBackground.appendChild(next);
    lightBoxBackground.appendChild(close);
}

function showLightBox() {
    const lightBoxBackground = document.getElementById("lightbox_background");
    lightBoxBackground.style.display = "block";
    document.body.style.overflowY = "hidden";
}

function hideLightBox() {
    if(document.querySelector(".slide")){
        document.querySelector(".slide").remove();
    }
    const lightBoxBackground = document.getElementById("lightbox_background");
    lightBoxBackground.style.display = "none";
    document.body.style.overflowY = "auto";
}

// On crée une slide à partir de l'index du média sur lequel on on a cliqué
function showSlides(mediasPhotographer, mediaIndex){
    console.log("showslide : " + mediaIndex);
    // data medias
    //On recherche l'objet correspondant dans le tableau mediasPhotographer grâce à mediaIndex
    const mediaTarget = mediasPhotographer[mediaIndex]; // retourne l'objet du média sur lequel on a cliqué
    const { title, image, video, id } = mediaTarget;  // les éléments entre {} représentent les types de datas de l'élément media 

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
        const slideImgLoader = document.createElement("div");
        slideImgLoader.classList.add("slide_loader");
        slideImgLoader.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>';
        const urlImage = `../assets/medias/` + image;
        slideImg.setAttribute("src", urlImage);
        slideImg.setAttribute("alt", title);
        slideFigure.appendChild(slideImg);
        slideFigure.appendChild(slideImgLoader);
        slideImg.style.display = "block";
        slideImg.style.opacity = "1";
        // gestion du loader
            // slideImg.style.display = "none";
            // slideImg.addEventListener('load', (event) => {
            //     slideImg.classList.add("media_complete");
            //     slideImgLoader.style.display = "none";
            //     // setTimeout(function(){
            //     //     slideImgLoader.style.display = "none";
            //     // }, 1500);
            // });
    }
    if(video){
        const slideVideo = document.createElement("video");
        slideVideo.classList.add("slide__video");
        slideVideo.setAttribute("controls", "");
        slideVideo.setAttribute("alt", title);
        const urlVideo = `../assets/medias/` + video;
        const slideVideoSource = document.createElement("source");
        slideVideoSource.setAttribute("src", urlVideo);
        slideVideoSource.setAttribute("type", "video/mp4");
        slideVideo.appendChild(slideVideoSource);
        slideFigure.appendChild(slideVideo);
    }

    const next = document.getElementById("lightbox_next");
    const prev = document.getElementById("lightbox_prev");
    next.setAttribute("media-id",id);
    prev.setAttribute("media-id",id);
}


// On ferme la lightbox
function closeLightBox() {
    if(document.getElementById("lightbox_close")){
        document.getElementById("lightbox_close").addEventListener('click', (event) => {
            hideLightBox();
        });
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape") {
                hideLightBox();
            }
        });
    }
}



// On crée une fonction pour charger la slide suivante
function nextSlide(mediasPhotographer) { 
    const next = document.getElementById("lightbox_next");
    next.addEventListener('click', (event) => {
        // on définit le mediaIndex actuel
        let mediaIdCurrent = +event.target.getAttribute("media-id");
        let mediaIndex = mediasPhotographer.findIndex(x => x.id === mediaIdCurrent);
        mediaIndex += 1;
        document.querySelector(".slide").remove();
        if(mediaIndex < mediasPhotographer.length){ 
            showSlides(mediasPhotographer, mediaIndex);
        } else { 
            mediaIndex = 0;
            showSlides(mediasPhotographer, mediaIndex);
        }
    });
    // Navigation avec la flêche gauche du clavier
    document.addEventListener('keyup', (event) => {
        if( event.keyCode == "39" ){
            next.click();
        }
    });
}


// On crée une fonction pour charger la slide précédente
function prevSlide(mediasPhotographer) { 
    const prev = document.getElementById("lightbox_prev");
    prev.addEventListener('click', (event) => {
        // on définit le mediaIndex actuel
        let mediaIdCurrent = +event.target.getAttribute("media-id");
        let mediaIndex = mediasPhotographer.findIndex(x => x.id === mediaIdCurrent);
        mediaIndex -= 1;
        document.querySelector(".slide").remove();
        if(mediaIndex > 0){  // si l'index du media est différent du premier de la liste
            showSlides(mediasPhotographer, mediaIndex);
        } else { // on est arrivé au début de la liste
            mediaIndex = mediasPhotographer.length - 1;
            showSlides(mediasPhotographer, mediaIndex);
        }
    });
    // Navigation avec la flêche gauche du clavier
    document.addEventListener('keyup', (event) => {
        if( event.keyCode == "37" ){
            prev.click();
        }
    });
} 