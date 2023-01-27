/**
 * Fonction qui crée le HTML pour la fiche d'un photographe.
 * @param {Object} data // correspond aux données d'un photographe (photographer) est un élément de l'objet photographers
 * @returns retourne le HTML de la fiche d'une photographe.
 */
function photographerFactory(data) {

    const { name, id, portrait, city, country, tagline, price } = data;  // les éléments entre {} représentent les types de datas de l'élément “photographer” 

    // cette variable représente le lien vers l'image du photographe 
    const picture = `assets/photographers/${portrait}`;

    /**
     * Fonction pour créer les éléments HTML de la carte de chacun des photographes.
     * @returns retourne le HTML de la fiche d'une photographe.
     */
    function getUserCardDOM() {
        
        // on crée une balise <article> dans laquelle on va créer les autres éléments 
        const article = document.createElement( 'article' );
        article.classList.add("photographer_card");

        // on crée une balise <img> pour le portrait 
        const imgPhotographerFigure = document.createElement( 'figure' );
        const imgPhotographer = document.createElement( 'img' );
        imgPhotographerFigure.appendChild(imgPhotographer);
        imgPhotographer.setAttribute("alt", name);
        imgPhotographer.setAttribute("src", picture);
        imgPhotographer.classList.add("photographer_card__img");
        imgPhotographerFigure.classList.add("photographer_card__figure");
        
        // on crée une balise <h2> pour le nom du photographe 
        const photographerName = document.createElement( 'h2' );
        photographerName.textContent = name;
        photographerName.classList.add("photographer_card__name");

        // on crée une balise <a> dans laquelle on va placer le portrait + le nom du photographe
        const photographerLink = document.createElement( 'a' );
        photographerLink.classList.add("photographer_card__link");
        // on crée un object URl, dans lequel on va ajouter l'ID du photographe
        const photographerLinkTarget = new URL(window.location.origin + "/photographer.html" + "?id=" + id);
        const photographerLinkTargetHref = photographerLinkTarget.href;
        // on renseigne l'attribut href du lien, avec l'ID du photographe 
        photographerLink.setAttribute("href", photographerLinkTargetHref);
        photographerLink.appendChild(imgPhotographerFigure);
        photographerLink.appendChild(photographerName);

        // on crée une balise <p> dans laquelle on va placer la localisation
        const photographerLocalisation = document.createElement( 'p' );
        photographerLocalisation.classList.add("photographer_card__localisation");
        photographerLocalisation.textContent = city + ", " + country;

        // on crée une balise <p> dans laquelle on va placer la philosophie
        const photographerPhilosophy = document.createElement( 'p' );
        photographerPhilosophy.classList.add("photographer_card__philosophy");
        photographerPhilosophy.textContent = tagline;

        // on crée une balise <p> dans laquelle on va placer le tarif
        const photographerPrice = document.createElement( 'p' );
        photographerPrice.classList.add("photographer_card__price");
        photographerPrice.textContent = price + "€/jour";

        // on intègre les différentes éléments de article dans article
        article.appendChild(photographerLink);
        article.appendChild(photographerLocalisation);
        article.appendChild(photographerPhilosophy);
        article.appendChild(photographerPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}