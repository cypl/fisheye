/**
 * Fonction pour récupérer le fichier JSON local et retourner un objet JSON
 * L'objet retourné est une Promise, on peut récupérer les données en utilisant la fonction avec "await" devant, 
 * ou avec ".then()" après. Exemple :
 *      fetchDatas().then(datas => {
 *          console.log(datas);
 *      });
 * @returns un objet JSON sous la forme d'une Promise
 */
async function fetchDatas() {
    const response = await fetch('../data/photographers.json');
    const datas = await response.json();
    return datas;
}


/**
 * Fonction pour récupèrer tous les photographes dans l'objet JSON.
 * On stocke également cet objet dans localStorage, 
 * pour pouvoir y accéder plus rapidement ensuite et éviter une nouvelle requête.
 * @returns un objet JSON photographers
 */
async function requestPhotographers(){
    // on enregistre les données dans un objet localStorage
    if ("datasPhotographers" in localStorage) { 
        const photographers = JSON.parse(localStorage.getItem('datasPhotographers'));
        return photographers;
    } else {
        const {photographers} = await fetchDatas();
        localStorage.setItem('datasPhotographers', JSON.stringify(photographers));
        return photographers;
    }
}


/**
 * Fonction pour récupèrer tous les media dans l'objet JSON.
 * On stocke également cet objet dans localStorage, 
 * pour pouvoir y accéder plus rapidement ensuite et éviter une nouvelle requête
 * @returns un objet JSON media
 */
async function requestMedia(){
    // on enregistre les données dans un objet localStorage
    if ("datasMedia" in localStorage) { 
        const media = JSON.parse(localStorage.getItem('datasMedia'));
        return media;
    } else {
        const {media} = await fetchDatas();
        localStorage.setItem('datasMedia', JSON.stringify(media));
        return media;
    }
}