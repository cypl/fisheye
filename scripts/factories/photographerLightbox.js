function showLightbox(data){
    // data medias
    // …………
    
    if (event.target.tagName == 'IMG') {
        // ID de l'objet ciblé par le clic
        let mediaId = +event.target.getAttribute("media-id"); // retourne un nombre
        // objet ciblé
        const mediaTarget = data.find(x => x.id === mediaId); // retourne un objet
        console.log(mediaTarget);
        // index de l'objet cible dans le tableau
        const mediaIndex = data.findIndex(x => x.id === mediaId); // retourne un index
        console.log(mediaIndex);
    }

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
    close.innerHTML = '<svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg"><path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#901C1C"/></svg>';
    lightBoxBackground.appendChild(close);


    // récupérer la liste des datas dans l'ordre actuel
    // récupérer l'index du visuel sur lequel on a cliqué

    // On ferme la lightbox
    close.addEventListener('click', (event) => {
        hideLightbox();
    });
    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape") {
            hideLightbox();
        }
    });
    
}

// Une fonction qui supprime la lightbox
function hideLightbox(){
    document.body.style.overflow = "scroll";
    const lightBoxBackground = document.getElementById("lightbox_background");
    if(lightBoxBackground){lightBoxBackground.remove();}
}