// On récupère l'ID du photographe depuis l'URl de la page
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const idPhotographer = parseInt(urlParameters.get('id')) // = ID du photographe


// Dans le tableau, on cherche le photographe qui a cet ID, et on retourne l'objet correspondant
async function findPhotographer(photographers) {
    // on filtre le tableau des photographes pour retouver le bon, grâce à son ID.
    const singlePhotographer = photographers.find(photographer => photographer.id === idPhotographer);
    return singlePhotographer;
};


// A partir de cet Objet, on peut générer le template pour le header
async function displayHeader(singlePhotographer) { 
    photographerCardFactory(singlePhotographer);
};

// A partir de cet Objet, on peut générer le template pour le footer
async function displayFooter(singlePhotographer, mediasPhotographer) { // c'est là où il faut appeler la photographerFooterFactory
    photographerFooterFactory(singlePhotographer, mediasPhotographer);
};


// On recherche les médias qui ont l'ID du photographe et on les classe dans un tableau "arrayMedias"
async function findMedias(media, classification) {
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
async function displayMedias(mediasPhotographer){
    const photographMediasSection = document.querySelector(".photograph-medias");
    mediasPhotographer.forEach((media) => {
        //les datas de chaque media sont chargées selon le template de la fonction photographerMediasFactory();
        const mediaModel = photographerMediasFactory(media); 
        photographMediasSection.appendChild(mediaModel);
    });
}


// On crée une fonction pour vider les éléments médias au moment du changement de filtre
async function removeMedias() {
    const photographMediasSection = document.querySelector(".photograph-medias");
    photographMediasSection.innerHTML = "";
};

// On appelle la lightbox
async function displayLightBox(mediasPhotographer) {
    const lightBoxTriggers = document.getElementsByClassName("media__img");
    // la lightbox s'ouvre lorsque l'on clique sur un média
    for (const t of lightBoxTriggers) {
        t.addEventListener('click', (event) => {
            // 1 - On construit la lightbox
            buildLightBox();

            // 2 - on recherche le média sur lequel on a cliqué dans le tableau "mediasPhotographer"
            // ID de l'objet ciblé par le clic
            let mediaId = +event.target.getAttribute("media-id"); // retourne un nombre
            // index de l'objet ciblé dans le tableau "mediasPhotographer"
            let mediaIndex = mediasPhotographer.findIndex(x => x.id === mediaId); // retourne un index

            showSlides(mediasPhotographer, mediaIndex);

            // Changement de slide
            const next = document.getElementById("lightbox_next");
            const prev = document.getElementById("lightbox_prev");
            next.addEventListener('click', (event) => {
                //nextSlide(mediasPhotographer, mediaIndex);
                document.querySelector(".slide").remove();
                if(mediaIndex < mediasPhotographer.length - 1){  // si l'index du media peut être augmenté de 1
                    showSlides(mediasPhotographer, mediaIndex += 1);
                } else { // sinon on est arrivé à la fin de la liste, alors il faut revenir au début
                    showSlides(mediasPhotographer, 0);
                    //removeLightBox();
                }
            });
            prev.addEventListener('click', (event) => {
                //prevSlide(mediasPhotographer, mediaIndex);
                document.querySelector(".slide").remove();
                if(mediaIndex != 0){  // si l'index du media est différent du premier de la liste
                    showSlides(mediasPhotographer, mediaIndex -= 1);
                } else { // on est arrivé au début de la liste
                    showSlides(mediasPhotographer, mediasPhotographer.length - 1);
                    //removeLightBox();
                }
            });

            
            // Pour détruire la lightbox, on fait appel à des éléments html qui ont été créés par buildLightBox();
            if(document.getElementById("lightbox_close")){
                document.getElementById("lightbox_close").addEventListener('click', (event) => {
                    removeLightBox();
                });
                document.addEventListener("keydown", (e) => {
                    if(e.key === "Escape") {
                        removeLightBox();
                    }
                });
            }
            
        });
    }
};


// On crée une fonction pour liker les médias
// à  chaque like, le total est incrémenté de 1, et inversement
// à  chaque like, on enregistre le média liké dans localStorage
class Like {
    constructor(idMedia, idPhotographer) {
        this.idMedia = idMedia;
        this.idPhotographer = idPhotographer;
    }
}
async function mediaLike(){
    const mediaLikeButtons = document.getElementsByClassName("media__like__wrapper");
    
    // si des médias ont déjà été likés, on les retrouve dans localStorage, et on leur rajoute la classe "liked" et +1 à la somme de likes
    if ("fisheyeMediasLiked" in localStorage) {
        const mediasLikedByUserStorage = JSON.parse(localStorage.getItem('fisheyeMediasLiked')); // retourne un objet
        for(let mediaLikedByUserStorage of mediasLikedByUserStorage){
            if(+mediaLikedByUserStorage.idPhotographer === +idPhotographer){
                for (let mediaLikeButton of mediaLikeButtons) {
                    let mediaLikeButtonDataId = +mediaLikeButton.getAttribute("media-id");
                    if(+mediaLikedByUserStorage.idMedia === mediaLikeButtonDataId){
                        //On ajoute la classe "liked" sur les boutons like qui ont déjà été likés
                        mediaLikeButton.classList.add("liked");
                        mediaLikeButton.setAttribute("media-liked", true);
                        let countValue = +mediaLikeButton.firstElementChild.textContent; // *1 retourne un nombre à la place d'une châine de caractère
                        let countValueAdded = countValue + 1;
                        mediaLikeButton.firstElementChild.innerHTML = countValueAdded;
                    }
                }
            }
        }
    }

    //ensuite, pour chaque bouton like, soit il n'a jamais été liké, soit le contraire
    for (let mediaLikeButton of mediaLikeButtons) {
        let idMedia = mediaLikeButton.getAttribute('media-id');
        mediaLikeButton.addEventListener('click', (event) => {
            if(mediaLikeButton.getAttribute('media-liked') === "true"){ // le média est déjà liké
                // on retire la classe "liked"
                mediaLikeButton.classList.remove("liked");
                // on passe l'attribut "media-liked" sur false
                mediaLikeButton.setAttribute("media-liked", false);
                // on retire -1 à la valeur de like
                let countValue = mediaLikeButton.firstElementChild.textContent*1;
                let countValueAdded = countValue - 1;
                mediaLikeButton.firstElementChild.innerHTML = countValueAdded;
                // on récupère le contenu de localStorage, pour en faire un nouveau tableau
                let newMediasLiked = JSON.parse(localStorage.getItem('fisheyeMediasLiked'));
                // on retire l'élément du nouveau tableau
                for (let i in newMediasLiked) {
                    if (newMediasLiked[i].idMedia === idMedia) {
                        newMediasLiked.splice(i,1);
                    }
                }
                // on transforme le nouveau tableau vers localStorage
                localStorage.setItem('fisheyeMediasLiked', JSON.stringify(newMediasLiked));
                // il n'y a plus qu'à retirer 1 au total de likes
                let photographFooterCounter = document.querySelector(".footer_infos__counter__number");
                likesCounterNew = photographFooterCounter.textContent*1 - 1;
                photographFooterCounter.textContent = likesCounterNew;
            } else if (mediaLikeButton.getAttribute('media-liked') === "false"){ // le média n'a pas encore été liké
                // on ajoute la classe "liked"
                mediaLikeButton.classList.add("liked");
                // on passe l'attribut "media-liked" sur true
                mediaLikeButton.setAttribute("media-liked", true);
                // on ajoute +1 à la valeur de like
                let countValue = mediaLikeButton.firstElementChild.textContent*1;
                let countValueAdded = countValue + 1;
                mediaLikeButton.firstElementChild.innerHTML = countValueAdded;
                // on crée un nouvel objet Like pour localStorage
                let idPhotographer = mediaLikeButton.getAttribute('media-author');
                let newLike = new Like(idMedia,idPhotographer);
                // // on ajoute l'élément à localStorage
                let newMediasLiked = JSON.parse(localStorage.getItem('fisheyeMediasLiked')) || [];
                newMediasLiked.push(newLike);
                localStorage.setItem('fisheyeMediasLiked', JSON.stringify(newMediasLiked));
                // il n'y a plus qu'à ajouter 1 au total de likes
                let photographFooterCounter = document.querySelector(".footer_infos__counter__number");
                likesCounterNew = photographFooterCounter.textContent*1 + 1;
                photographFooterCounter.textContent = likesCounterNew;
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
    await displayHeader(singlePhotographer);
    await displayFooter(singlePhotographer, mediasPhotographer);
    await displayMedias(mediasPhotographer);
    await displayLightBox(mediasPhotographer);
    await photographerForm(singlePhotographer);
    await mediaLike();
};
initPhotographer();


// On crée les fonctions qui vont ré-afficher la liste lorsque l'on clique sur un critère de filtre, selon un nouvel ordre
async function initPhotographerBy(classification){
    const media = await requestMedia();
    const mediasPhotographer = await findMedias(media,classification);
    await removeMedias();
    await displayMedias(mediasPhotographer);
    await displayLightBox(mediasPhotographer);
    await mediaLike();
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