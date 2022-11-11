// On récupère l'ID du photographe depuis l'URl de la page
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const idPhotographer = parseInt(urlParameters.get('id')) // = ID du photographe


// On fait une requête sur le fichier JSON, et on retourne une promise 
async function photographersApi() {
    const urlData = "../data/photographers.json";
    const photographers = await fetch(urlData); 
    return photographers.json(); // = Promise
}


// On récupère le resultat de la promise issue de photographersApi(), et on retourne le resultat une fois que la requête a abouti 
async function getPhotographers() {
    return await photographersApi(); // = Datas qui résultent de la Promise
};


// Dans le tableau, on cherche le photographe qui a cet ID, et on retourne l'objet correspondant
async function findPhotographer(photographers) {
    // on filtre le tableau des photographes pour retouver le bon, grâce à son ID.
    const singlePhotographer = photographers.find(photographer => photographer.id === idPhotographer);
    return await singlePhotographer;
};


// A partir de cet Objet, on peut générer le template pour le header
async function displayHeader(singlePhotographer) { // c'est là où il faut appeler la photographerCardFactory
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

class Like {
    constructor(idMedia, idPhotographer) {
        this.idMedia = idMedia;
        this.idPhotographer = idPhotographer;
    }
}
async function mediaLike(){
    const mediaLikeButtons = document.getElementsByClassName("media__like__wrapper");
    //on crée un array pour stocker les médias qui on été liké par l'utilisateur
    const mediasLikedByUser = [];
    //ensuite, pour chaque bouton like, soit il n'a jamais été liké, soit le contraire
    for (let mediaLikeButton of mediaLikeButtons) {
        mediaLikeButton.addEventListener('click', (event) => {
            if(mediaLikeButton.getAttribute('media-liked') === "false"){
                mediaLikeButton.classList.add("liked");
                mediaLikeButton.setAttribute("media-liked", true);
                //on ajoute +1 à la valeur like
                let countValue = mediaLikeButton.firstElementChild.textContent*1; // *1 retourne un nombre à la place d'une châine de caractère
                let countValueAdded = countValue + 1;
                mediaLikeButton.firstElementChild.innerHTML = countValueAdded;
                //on crée un nouvel objet Like
                let idMedia = mediaLikeButton.getAttribute('media-id');
                let idPhotographer = mediaLikeButton.getAttribute('media-author');
                let newLike = new Like(idMedia,idPhotographer);
                // on ajoute cet objet à l'array mediasLikedByUser
                mediasLikedByUser.push(newLike);
                // console.log(mediasLikedByUser);
            } else { // si le média a déjà été liké, on peut le dé-liké
                mediaLikeButton.classList.remove("liked");
                mediaLikeButton.setAttribute("media-liked", false);
                let countValue = mediaLikeButton.firstElementChild.textContent*1;
                //on retire -1 à la valeur like
                let countValueAdded = countValue - 1;
                mediaLikeButton.firstElementChild.innerHTML = countValueAdded;
                // on recherche dans l'array mediasLikedByUser le média correspondant, grâce à son ID pour le supprimer 
                let idMedia = mediaLikeButton.getAttribute('media-id');
                for (let i in mediasLikedByUser) {
                    if (mediasLikedByUser[i].idMedia === idMedia) {
                        mediasLikedByUser.splice(i,1);
                    }
                }
                //console.log(mediasLikedByUser);
            }
            return ({mediasLikedByUser: [...mediasLikedByUser]})
        });
    }
    return ({mediasLikedByUser: [...mediasLikedByUser]})
}


// Fonction pour charger l'ensemble des éléments au chargement de la page
async function initPhotographer() {
    const { photographers } = await getPhotographers(); // ce qu'il y a entre {} correspond à la propriété de l'objet que l'on souhaite récupérer
    const { media } = await getPhotographers(); 
    // On sort un objet avec uniquement le photographe concerné
    const singlePhotographer = await findPhotographer(photographers); // retourne l'objet du photographe
    const mediasPhotographer = await findMedias(media,sortByAsc("likes")); // retourne l'objet media du photographe, avec la collections d'images
    // A partir de cet Objet, on génére le template pour le header
    await displayHeader(singlePhotographer);
    await displayFooter(singlePhotographer,mediasPhotographer);
    await displayMedias(mediasPhotographer);
    await mediaLike();
};
initPhotographer();



// On crée les fonctions qui vont ré-afficher la liste lorsque l'on clique sur un critère de filtre, selon un nouvel ordre
async function initPhotographerByDRY(classification){
    const { media } = await getPhotographers();
    const mediasPhotographer = await findMedias(media,classification);
    await removeMedias();
    await displayMedias(mediasPhotographer);
    await mediaLike();
}
async function initPhotographerByTitle(){
    initPhotographerByDRY(sortByDesc("title"));
}
async function initPhotographerByDate(){
    initPhotographerByDRY(sortByDesc("date"));
}
async function initPhotographerByLikes(){
    initPhotographerByDRY(sortByAsc("likes"));
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