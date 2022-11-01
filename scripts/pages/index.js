async function getPhotographers() {
     
    const photographers = await fetch('../data/photographers.json'); // = Promise
    return await photographers.json(); // = Datas qui résultent de la Promise

    // fetch("../data/photographers.json")
    //     .then(function(res) {
    //         if(res.ok){
    //             return res.json();
    //         }
    //     })
    //     .then(function(value) {
    //         const photographers = JSON.stringify(value.photographers);
    //         console.log(photographers);   // => retourne une promise sous la forme d'un Array
    //         //return photographers;
    //     })
    //     .catch(function(error){
    //         //erreurs
    //     });

    // comment transformer le résultat de la promise en donnée exploitable ??

    // return ({
    //          photographers: [...photographers]})
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
    const { photographers } = await getPhotographers();  // Pourquoi y-a-t'il des accolades autour de “photographers“ ? 
    displayData(photographers); // Pourquoi est-ce qu'il n'y a pas de "await" ici ?
};

init();  