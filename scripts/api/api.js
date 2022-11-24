// On fait la requête locale du fichier JSON, et on retourne un objet JSON
async function fetchDatas() {
    const response = await fetch('../data/photographers.json');
    const datas = await response.json();
    return datas;
}
// ajouter la gestion des erreurs
// try catch
// ajouter const {photographers} = await fetchDatas();
// ajouter const {media} = await fetchDatas();


// Dans l'objet JSON, on sort tous les photographes
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

// Dans l'objet JSON, on sort tous les media
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