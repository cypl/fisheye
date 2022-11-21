// Une fonction pour créer la liste des photographers
function displayData(photographers) { //photographers est un array
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        //les data de chaque photographes sont chargées selon le template de la fonction photographerFactory();
        const photographerModel = photographerFactory(photographer); // (photographer) est un élément de l'objet photographers
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {    
    // Récupère les datas des photographes
    const photographers = await requestPhotographers();
    displayData(photographers); 
};

init();  