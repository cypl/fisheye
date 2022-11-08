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

async function displayData(photographers) {
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
    const { photographers } = await getPhotographers();  // ce qu'il y a entre {} correspond à la propriété de l'objet que l'on souhaite récupérer 
    displayData(photographers); // Pourquoi est-ce qu'il n'y a pas de "await" ici ?
};

init();  