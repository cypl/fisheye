// async function getJsonPhotographers(){
//     fetch("../data/photographers.json")
//         .then(function(res) {
//             if(res.ok){
//                 return res.json();
//             }
//         })
//         .then(function(value) {
//             //console.log(value.photographers);   // => retourne une promise sous la forme d'un Array
//             return value.photographers;
//         })
//         .catch(function(error){
//             //erreurs
//         });
// }


async function getPhotographers() {
        

    // fetch("../data/photographers.json")
    //     .then(function(res) {
    //         if(res.ok){
    //             return res.json();
    //         }
    //     })
    //     .then(function(value) {
    //         //console.log(value.photographers);   // => retourne une promise sous la forme d'un Array
    //         return value.photographers;
    //     })
    //     .catch(function(error){
    //         //erreurs
    //     });

    // comment transformer le résultat de la promise en donnée exploitable ??

    // return ({
    //          photographers: [...photographers]})
        

    // tableau à remplacer par le résulat de la Promise ci-dessus
    const photographers = [
        {
            "name": "Mimi Keel",
            "id": 243,
            "city": "London",
            "country": "UK",
            "tagline": "Voir le beau dans le quotidien",
            "price": 400,
            "portrait": "MimiKeel.jpg"
        },
        {
            "name": "Ellie-Rose Wilkens",
            "id": 930,
            "city": "Paris",
            "country": "France",
            "tagline": "Capturer des compositions complexes",
            "price": 250,
            "portrait": "EllieRoseWilkens.jpg"
        },
        {
            "name": "Tracy Galindo",
            "id": 82,
            "city": "Montreal",
            "country": "Canada",
            "tagline": "Photographe freelance",
            "price": 500,
            "portrait": "TracyGalindo.jpg"
        },
        {
            "name": "Nabeel Bradford",
            "id": 527,
            "city": "Mexico City",
            "country": "Mexico",
            "tagline": "Toujours aller de l'avant",
            "price": 350,
            "portrait": "NabeelBradford.jpg"
        },
        {
            "name": "Rhode Dubois",
            "id": 925,
            "city": "Barcelona",
            "country": "Spain",
            "tagline": "Je crée des souvenirs",
            "price": 275,
            "portrait": "RhodeDubois.jpg"
        },
        {
            "name": "Marcel Nikolic",
            "id": 195,
            "city": "Berlin",
            "country": "Germany",
            "tagline": "Toujours à la recherche de LA photo",
            "price": 300,
            "portrait": "MarcelNikolic.jpg"
        }
    ];

    return ({
        photographers: [...photographers]})
              
    }



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
    displayData(photographers);
};

init();
    