// On récupère l'ID du photographe depuis l'URl de la page
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const idPhotographer = parseInt(urlParameters.get('id')) // = ID du photographe

// On sort un tableau, qui liste tous les photographes
async function getPhotographers() {
    const photographers = await fetch('../data/photographers.json'); // = Promise
    return await photographers.json(); // = Datas qui résultent de la Promise
};

// Dans le tableau, on cherche le photographe qui a cet ID, et on retourne l'objet correspondant
async function findPhotographer(photographers) {
    // on filtre le tableau des photographes pour retouver le bon, grâce à son ID.
    const singlePhotographer = photographers.find(photographer => photographer.id === idPhotographer);
    return await singlePhotographer;
};

// A partir de cet Objet, on peut générer le template pour le header
async function displayHeader(singlephotographer) { // c'est là où il faut appeler la photographerCardFactory
    photographerCardFactory(singlephotographer);
};

async function initPhotographer() {
    // On récupère les datas des photographes
    const { photographers } = await getPhotographers(); 
    // On sort un objet avec uniquement le photographe concerné
    const singlephotographer = await findPhotographer(photographers); // retourne l'objet du photographe
    // A partir de cet Objet, on génére le template pour le header
    await displayHeader(singlephotographer);
};

initPhotographer();