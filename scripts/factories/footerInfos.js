
function photographerFooterFactory(data, medias) { 

    const { price } = data;  // les éléments entre {} représentent les types de datas de l'élément “photographer” 
    //const { likes } = medias;  // les éléments entre {} représentent les types de datas de l'élément “photographer” 
    const photographFooter = document.querySelector("#footer_infos");
    const photographFooterP = document.createElement("p");
    photographFooterP.classList.add("footer_infos__p");
    const photographFooterPrice = document.createElement("span");
    photographFooterPrice.classList.add("footer_infos__price");
    photographFooterPrice.innerHTML = price + "€ / jour";

    // //Total de likes
    function countLikes(){
        let totalLikes = 0;
        // on ajoute au total de likes, le nombre de likes de chacun des médias (valeurs de photographers.json)
        for(let media of medias){
            totalLikes += media.likes;
        }
        // on y rajoute le nombre de likes de chacun des médias qui ont été likés par l'utilisateur pour le photographe en cours
        if ("fisheyeMediasLiked" in localStorage) {
            let mediasLikedByUserStorage = JSON.parse(localStorage.getItem('fisheyeMediasLiked')); // retourne un objet
            for(let mediaLikedByUserStorage of mediasLikedByUserStorage){
                if(mediaLikedByUserStorage.idPhotographer*1 === idPhotographer){
                    totalLikes += 1;
                }
            }
        }
        return totalLikes;
    }

    const photographFooterCounter = document.createElement("span");
    photographFooterCounter.classList.add("footer_infos__counter");

    const photographFooterCounterNumber = document.createElement("span");
    photographFooterCounterNumber.classList.add("footer_infos__counter__number");
    photographFooterCounterNumber.innerHTML = countLikes();
    photographFooterCounter.appendChild(photographFooterCounterNumber);

    const photographFooterCounterIcon = document.createElement("i");
    photographFooterCounterIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="footer_infos__counter_like_icon"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>';
    photographFooterCounter.appendChild(photographFooterCounterIcon);

    photographFooterP.appendChild(photographFooterCounter);
    photographFooterP.appendChild(photographFooterPrice);
    photographFooter.appendChild(photographFooterP);

    return (photographFooter);
}