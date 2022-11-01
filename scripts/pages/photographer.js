// On récupère l'ID du photographe depuis l'URl de la page
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const idPhotographer = parseInt(urlParameters.get('id')) // = ID du photographe

// On sort un tableau, qui liste tous les photographes
    async function getPhotographers() {
        const photographers = await fetch('../data/photographers.json'); // = Promise
        return await photographers.json(); // = Datas qui résultent de la Promise
    }

// Dans le tableau, on cherche le photographe qui a cet ID
    async function displayPhotographer(photographers) {
        // on filtre le tableau des photographes pour retouver le bon, grâce à son ID.
        // filter retourne un Promise
        const singlePhotographer = photographers.filter(photographer => photographer.id === idPhotographer);
        console.log(singlePhotographer); // résultat de la Promise

        //return await singlePhotographer;
        
        //const singlePhotographer = await photographers.filter(photographer => photographer.id === idPhotographer);
        //return await singlePhotographer;
    };



// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");
//     photographers.forEach((photographer) => {
//         //les data de chaque photographes sont chargées selon le template de la fonction photographerFactory();
//         const photographerModel = photographerFactory(photographer); // (photographer) est un élément de l'objet photographers
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// };


async function initPhotographer() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();  // Pourquoi y-a-t'il des accolades autour de “photographers“ ? 
    displayPhotographer(photographers);
    
};

initPhotographer();