// On récupère l'ID du photographe depuis l'URl de la page
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const idPhotographer = parseInt(urlParameters.get('id')) // = ID du photographe


// Dans le tableau, on cherche le photographe qui a cet ID, et on retourne l'objet correspondant
function findPhotographer(photographers) {
    // on filtre le tableau des photographes pour retouver le bon, grâce à son ID.
    const singlePhotographer = photographers.find(photographer => photographer.id === idPhotographer);
    return singlePhotographer;
};


// A partir de cet Objet, on peut générer le template pour le header
function displayHeader(singlePhotographer) { 
    photographerCardFactory(singlePhotographer);
};


// A partir de cet Objet, on peut générer le template pour le footer
function displayFooter(singlePhotographer, mediasPhotographer) { // c'est là où il faut appeler la photographerFooterFactory
    photographerFooterFactory(singlePhotographer, mediasPhotographer);
};


// On recherche les médias qui ont l'ID du photographe et on les classe dans un tableau "arrayMedias"
function findMedias(media, classification) {
    // on filtre le tableau des photographes pour retouver le bon, grâce à son ID.
    const arrayMedias = [];
    for (const element of media) {
        if(element.photographerId === idPhotographer){
            arrayMedias.push(element);
        }
    }
    return arrayMedias.sort(classification); // le paramère "classification" va faire appel à une fonction "sortByAsc()" ou "sortByDesc()" qui va définir un paramètre de classement et un ordre
};


// Fonction qui permet de classer les médias du plus vers le moins (ex : du plus de likes vers moins de likes)
function sortByAsc(property){
    return function(a, b){
        if(a[property] < b[property]){
            return 1;
        }else if(a[property] > b[property]){
            return -1;
        }else{
            return 0;   
        }
    }
}


// Fonction qui permet de classer des médias du moins vers le plus (ex : ordre alphabétique)
function sortByDesc(property){
    return function(a, b){
        if(a[property] < b[property]){
            return -1;
        }else if(a[property] > b[property]){
            return 1;
        }else{
            return 0;   
        }
    }
}


// On utilise le tableau "arrayMedias" comme paramètre "mediasPhotographer", afin d'afficher une fiche correspondante à chaque média
function displayMedias(mediasPhotographer){
    const photographMediasSection = document.querySelector(".photograph-medias");
    mediasPhotographer.forEach((media) => {
        //les datas de chaque media sont chargées selon le template de la fonction photographerMediasFactory();
        const mediaModel = photographerMediasFactory(media); 
        photographMediasSection.appendChild(mediaModel);
    });
}


// On crée une fonction pour vider les éléments médias au moment du changement de filtre
function removeMedias() {
    const photographMediasSection = document.querySelector(".photograph-medias");
    photographMediasSection.innerHTML = "";
};


// On crée une fonction pour appeller la lightbox
function displayLightBox(mediasPhotographer) {
    const lightBoxTriggers = document.getElementsByClassName("media__img");
    // la lightbox s'ouvre lorsque l'on clique sur un média
    for (const t of lightBoxTriggers) {
        t.addEventListener('click', (event) => {
            // 1 - On construit la lightbox
            buildLightBox();
            // 2 - On affiche la slide
            // on recherche l'ID du média sur lequel on a cliqué
            let mediaId = +event.target.getAttribute("media-id"); 
            // on recherche l'index de l'objet ciblé dans le tableau "mediasPhotographer"
            let mediaIndex = mediasPhotographer.findIndex(x => x.id === mediaId);
            // et on affiche la slide
            showSlides(mediasPhotographer, mediaIndex);
            // 3 - Changement de slide
            nextSlide(mediasPhotographer, mediaIndex);
            prevSlide(mediasPhotographer, mediaIndex);
            // 4 - Pour détruire la lightbox, on fait appel à des éléments html qui ont été créés par buildLightBox();
            removeLightBox();
        });
    }
};


// On affiche les médias déjà likés par l'utilisateur
// si des médias ont déjà été likés, on les retrouve dans localStorage, et on leur rajoute la classe "liked" et +1 à la somme de likes
function mediaAlreadyLiked(){
    const mediaLikeButtons = document.getElementsByClassName("media__like__wrapper");
    // 1 - si l'utilisateur a déjà liké des média pour ce photographe, l'ID des médias sont dans localStorage "fisheyeMediasLiked"
    if ("fisheyeMediasLiked" in localStorage) {
        const mediasLikedByUserStorage = JSON.parse(localStorage.getItem('fisheyeMediasLiked')); // retourne un array d'objets
        for (let mediaLikeButton of mediaLikeButtons) {
            let mediaLikeButtonDataId = +mediaLikeButton.getAttribute("media-id");
            // si mediaLikeButtonDataId est présent dans localStorage
            if(mediasLikedByUserStorage.some(item => +item.idMedia === mediaLikeButtonDataId)){
                mediaLikeButton.classList.add("liked");
                mediaLikeButton.setAttribute("media-liked", true);
                const mediaLikeButtonCounter = document.querySelector(".media__like__counter");
                mediaLikeButtonCounter.textContent = +mediaLikeButtonCounter.textContent + 1;
            }
        }
    }
}

// On crée une fonction pour liker les médias mediaLike();
// localStorage "fisheyeMediasLiked" est temporaire, on imagine que ce qu'il contient viendrait alimenter la base de données du site et serait ensuite vidé
class Like { // l'objet "Like" va permettre d'enregistrer dans localStorage "fisheyeMediasLiked" de nouvelles instances de média liké.
    constructor(idMedia, idPhotographer) {
        this.idMedia = idMedia;
        this.idPhotographer = idPhotographer;
    }
}
// On crée fonction pour mettre à jour le nombre total de likes du photographe
function updateTotalLike(status){
    const photographFooterCounter = document.querySelector(".footer_infos__counter__number");
    if(status == true){ //status == true va incrémenter le total de 1
        photographFooterCounter.textContent = +photographFooterCounter.textContent + 1;
    } else { //status == false va décrémenter le total de 1
        photographFooterCounter.textContent = +photographFooterCounter.textContent - 1;
    }
}
function mediaLike(){
    const mediaLikeButtons = document.getElementsByClassName("media__like__wrapper");
    //ensuite, pour chaque bouton like, soit il n'a jamais été liké, soit le contraire
    for (let mediaLikeButton of mediaLikeButtons) {
        let idMedia = mediaLikeButton.getAttribute('media-id');
        mediaLikeButton.addEventListener('click', (event) => {
            // pour dé-liker
            if(mediaLikeButton.getAttribute('media-liked') === "true"){ 
                mediaLikeButton.classList.remove("liked");
                mediaLikeButton.setAttribute("media-liked", false);
                const mediaLikeButtonCounter = mediaLikeButton.querySelector(".media__like__counter");
                mediaLikeButtonCounter.textContent = +mediaLikeButtonCounter.textContent - 1;
                // on récupère le contenu de localStorage "fisheyeMediasLiked", pour en faire un nouveau tableau
                let newMediasLiked = JSON.parse(localStorage.getItem('fisheyeMediasLiked'));
                // on retire l'élément du nouveau tableau
                for (let i in newMediasLiked) {
                    if (newMediasLiked[i].idMedia === idMedia) {
                        newMediasLiked.splice(i,1);
                    }
                }
                // et on transforme le nouveau tableau en localStorage "fisheyeMediasLiked"
                localStorage.setItem('fisheyeMediasLiked', JSON.stringify(newMediasLiked));
                // il n'y a plus qu'à retirer 1 au total de likes
                updateTotalLike(false); // -1
            } 
            // pour liker
            else { 
                mediaLikeButton.classList.add("liked");
                mediaLikeButton.setAttribute("media-liked", true);
                const mediaLikeButtonCounter = mediaLikeButton.querySelector(".media__like__counter");
                mediaLikeButtonCounter.textContent = +mediaLikeButtonCounter.textContent + 1;
                // on crée un nouvel objet Like pour localStorage "fisheyeMediasLiked"
                let idPhotographer = mediaLikeButton.getAttribute('media-author');
                let newLike = new Like(idMedia,idPhotographer);
                // et on ajoute cet objet à localStorage "fisheyeMediasLiked"
                let newMediasLiked = JSON.parse(localStorage.getItem('fisheyeMediasLiked')) || [];
                newMediasLiked.push(newLike);
                localStorage.setItem('fisheyeMediasLiked', JSON.stringify(newMediasLiked));
                // il n'y a plus qu'à ajouter 1 au total de likes
                updateTotalLike(true); // +1
            }
        });
    }
}


// Fonction pour charger l'ensemble des éléments au chargement de la page
async function initPhotographer() {
    const photographers = await requestPhotographers();
    const media = await requestMedia();
    // On sort un objet avec uniquement le photographe concerné
    const singlePhotographer = await findPhotographer(photographers); // retourne l'objet du photographe
    const mediasPhotographer = await findMedias(media,sortByAsc("likes")); // retourne l'objet media du photographe, avec la collections d'images
    // A partir de cet Objet, on génére le template pour le header
    displayHeader(singlePhotographer);
    displayFooter(singlePhotographer, mediasPhotographer);
    displayMedias(mediasPhotographer);
    displayLightBox(mediasPhotographer);
    photographerForm(singlePhotographer);
    mediaAlreadyLiked();
    mediaLike();
};
initPhotographer();


// Fonction pour charger l'ensemble des éléments média lorsque l'on utilise le dropdown
const sortByLikes = document.getElementById("sort-by-likes");
const sortByName = document.getElementById("sort-by-name");
const sortByDate = document.getElementById("sort-by-date");
sortByName.addEventListener('click', (event) => {
    initPhotographerByTitle();
});
sortByDate.addEventListener('click', (event) => {
    initPhotographerByDate();
});
sortByLikes.addEventListener('click', (event) => {
    initPhotographerByLikes();
}); 

async function initPhotographerBy(classification){
    const media = await requestMedia(); 
    const mediasPhotographer = await findMedias(media,classification);
    removeMedias();
    displayMedias(mediasPhotographer);
    displayLightBox(mediasPhotographer);
    mediaAlreadyLiked();
    mediaLike();
}
async function initPhotographerByTitle(){
    initPhotographerBy(sortByDesc("title"));
}
async function initPhotographerByDate(){
    initPhotographerBy(sortByDesc("date"));
}
async function initPhotographerByLikes(){
    initPhotographerBy(sortByAsc("likes"));
}