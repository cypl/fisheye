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

// Dans le tableau Media, on cherche les images qui ont l'ID du photographe
async function findMedias(media) {
    // on filtre le tableau des photographes pour retouver le bon, grâce à son ID.
    const arrayMedias = [];
    for (const element of media) {
        if(element.photographerId === idPhotographer){
            arrayMedias.push(element);
        }
    }
    return arrayMedias;
};

async function displayMedias(mediasPhotographer){
    const photographMediasSection = document.querySelector(".photograph-medias");
    mediasPhotographer.forEach((media) => {
        //les data de chaque media sont chargées selon le template de la fonction photographerMediasFactory();
        const mediaModel = photographerMediasFactory(media); 
        photographMediasSection.appendChild(mediaModel);
    });
}

async function initPhotographer() {
    const { photographers } = await getPhotographers(); // ce qu'il y a entre {} correspond à la propriété de l'objet que l'on souhaite récupérer
    const { media } = await getPhotographers(); 
    // On sort un objet avec uniquement le photographe concerné
    const singlePhotographer = await findPhotographer(photographers); // retourne l'objet du photographe
    const mediasPhotographer = await findMedias(media); // retourne l'objet media du photographe, avec la collections d'images
    // A partir de cet Objet, on génére le template pour le header
    await displayHeader(singlePhotographer);
    await displayMedias(mediasPhotographer);
};

initPhotographer();