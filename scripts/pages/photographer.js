// On récupère l'ID du photographe depuis l'URl de la page
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const idPhotographer = parseInt(urlParameters.get('id')) // = ID du photographe


/**
 * Fonction pour trouver le photographe qui a l'ID de l'URL et retourner l'objet correspondant.
 * @param {Object} photographers correspond à l'objet photographers (issu de requestPhotographers())
 * @returns {Object} retourne l'objet du photographe de la page.
 */
function findPhotographer(photographers) {
    const singlePhotographer = photographers.find(photographer => photographer.id === idPhotographer);
    return singlePhotographer;
};


/**
 * Fonction pour afficher le template pour le header de la page.
 * @param {Object} singlePhotographer correspond à l'objet du photographe de la page.
 */
function displayHeader(singlePhotographer) { 
    photographerCardFactory(singlePhotographer);
};


/**
 * Fonction pour afficher le template pour le footer de la page.
 * @param {Objet} singlePhotographer correspond à l'objet du photographe de la page.
 * @param {*} mediasPhotographer 
 */
function displayFooter(singlePhotographer, mediasPhotographer) {
    photographerFooterFactory(singlePhotographer, mediasPhotographer);
};


/**
 * Fonction pour créer un tableau de média, en fonction de l'ID du photographe et de la classification souhaitée.
 * @param {Object} media correspond à l'objet qui liste tous les média.
 * @param {Function} classification correspond à une fonction pour classer les média.
 * @returns {Array} retourne un tableau avec les différents média du photographe, classés selon l'ordre souhaité "mediasPhotographer".
 */
function findMedias(media, classification) {
    // on filtre le tableau des photographes pour retouver le bon, grâce à son ID.
    const arrayMedias = [];
    for (const element of media) {
        if(element.photographerId === idPhotographer){
            arrayMedias.push(element);
        }
    }
    return arrayMedias.sort(classification); // le paramètre "classification" va faire appel à une fonction "sortByAsc()" ou "sortByDesc()" qui va définir un paramètre de classement et un ordre
};


/**
 * Fonction qui permet de classer les médias du plus vers le moins (ex : du plus de likes vers moins de likes).
 * @param {String} property correspond à ce que l'on souhaite trier.
 * @returns retourne le tableau initial trié.
 */
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


/**
 * Fonction qui permet de classer les médias du moins vers le plus (ex : ordre alphabétique).
 * @param {String} property correspond à ce que l'on souhaite trier.
 * @returns retourne le tableau initial trié. 
 */
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


/**
 * Fonction pour afficher les médias dans la page.
 * @param {Array} mediasPhotographer correspond au tableau avec les différents média du photographe, classés selon un ordre souhaité.
 */
function displayMedias(mediasPhotographer){
    const photographMediasSection = document.querySelector(".photograph-medias");
    mediasPhotographer.forEach((media) => {
        //les datas de chaque media sont chargées selon le template de la fonction photographerMediasFactory();
        const mediaModel = photographerMediasFactory(media); 
        photographMediasSection.appendChild(mediaModel);
    });
}


/**
 * Fonction pour vider les éléments médias au moment du changement de filtre.
 */
function removeMedias() {
    const photographMediasSection = document.querySelector(".photograph-medias");
    photographMediasSection.innerHTML = "";
};


/**
 * Fonction pour afficher la lightbox.
 * @param {Array} mediasPhotographer correspond au tableau avec les différents média du photographe, classés selon un ordre souhaité.
 */
function displayLightBox(mediasPhotographer) {
    const lightBoxTriggers = document.getElementsByClassName("media__img");
    // la lightbox s'affiche lorsque l'on clique sur un média
    for (const t of lightBoxTriggers) {
        // Ouverture de la lightbox au clic
        t.addEventListener('click', (event) => {
            // 1 - On affiche la lightbox
            showLightBox();
            // 2 - On affiche la slide correspondante
            // on recherche l'ID du média sur lequel on a cliqué
            let mediaId = +event.target.getAttribute("media-id"); 
            // on recherche l'index de l'objet ciblé dans le tableau "mediasPhotographer"
            let mediaIndex = mediasPhotographer.findIndex(x => x.id === mediaId);
            // et on affiche la slide
            showSlides(mediasPhotographer, mediaIndex);
            // 3 - Changement de slide
            nextSlide(mediasPhotographer);
            prevSlide(mediasPhotographer);
            // 4 - Masquer la lightbox
            closeLightBox();
        });
    }
};


/**
 * On affiche les médias déjà likés par l'utilisateur.
 * Si des médias ont déjà été likés, on les retrouve dans localStorage, et on ajoute à chacun la classe "liked" et +1 à la somme totale de likes
 */
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
                const mediaLikeButtonCounter = mediaLikeButton.querySelector(".media__like__counter");
                mediaLikeButtonCounter.textContent = +mediaLikeButtonCounter.textContent + 1;
            }
        }
    }
}


/**
 * La classe Like permet d'enregistrer dans localStorage "fisheyeMediasLiked" de nouvelles instances de média liké. 
 */
class Like { 
    constructor(idMedia, idPhotographer) {
        this.idMedia = idMedia;
        this.idPhotographer = idPhotographer;
    }
}


/**
 * Fonction pour mettre à jour le nombre total de likes du photographe.
 * @param {Boolean} status correspond à l'ajout ou au retrait d'un like sur un média
 */
function updateTotalLike(status){
    const photographFooterCounter = document.querySelector(".footer_infos__counter__number");
    if(status == true){ //status == true va incrémenter le total de 1
        photographFooterCounter.textContent = +photographFooterCounter.textContent + 1;
    } else { //status == false va décrémenter le total de 1
        photographFooterCounter.textContent = +photographFooterCounter.textContent - 1;
    }
}


/**
 * Fonction qui permet de liker / dé-liker un média.
 */
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


/**
 * Fonction générique pour constuire la fonction initPhotographer() selon l'ordre souhaité.
 * @param {Function} classification correspond à une fonction pour classer les média.
 */
async function initPhotographerBy(classification){
    const media = await requestMedia(); 
    const mediasPhotographer = await findMedias(media,classification);
    removeMedias();
    displayMedias(mediasPhotographer);
    displayLightBox(mediasPhotographer);
    mediaAlreadyLiked();
    mediaLike();
}


// Lorsqu'un tri est effectué à l'aide du dropdown, les médias sont supprimés, puis recréés avec la classification correspondante

/**
 * Fonction pour constuire la fonction initPhotographer() selon classement par titre.
 */
async function initPhotographerByTitle(){
    initPhotographerBy(sortByDesc("title"));
}


/**
 * Fonction pour constuire la fonction initPhotographer() selon classement par date.
 */
async function initPhotographerByDate(){
    initPhotographerBy(sortByDesc("date"));
}

/**
 * Fonction pour constuire la fonction initPhotographer() selon classement par popularité (nombre de likes).
 */
async function initPhotographerByLikes(){
    initPhotographerBy(sortByAsc("likes"));
}


/**
 * Fonction pour charger l'ensemble des éléments au chargement de la page.
 */
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
    initLightBox();
    displayLightBox(mediasPhotographer);
    photographerForm(singlePhotographer);
    mediaAlreadyLiked();
    mediaLike();

    const sortByLikes = document.getElementById("sort-by-likes");
    const sortByName = document.getElementById("sort-by-name");
    const sortByDate = document.getElementById("sort-by-date");
    // On affiche les médias par ordre alphabétique
    sortByName.addEventListener('click', (event) => {
        initPhotographerByTitle();
    });
    // On affiche les médias par date
    sortByDate.addEventListener('click', (event) => {
        initPhotographerByDate();
    });
    // On affiche les médias par popularité
    sortByLikes.addEventListener('click', (event) => {
        initPhotographerByLikes();
    }); 


};

initPhotographer();