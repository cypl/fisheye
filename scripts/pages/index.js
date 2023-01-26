/**
 * Fonction pour afficher la liste des photographes.
 * @param {Array} photographers est obtenu grâce à la requête requestPhotographers() dans api.js
 */
function displayPhotographers(photographers) { //photographers est un array
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        // Les data de chaque photographes sont affichées selon le template de la fonction photographerFactory();
        const photographerModel = photographerFactory(photographer); // (photographer) est un élément de l'objet photographers
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};


/**
 * Fonction pour initialiser la page.
 */
async function init() {    
    // On Récupère les datas des photographes
    const photographers = await requestPhotographers();
    displayPhotographers(photographers); 
};

init();  