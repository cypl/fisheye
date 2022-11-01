function photographerCardFactory() { 

    // je ne comprends pas vraiment ça {} ?
    //const { name, id, portrait, city, country, tagline, price } = data;  // les éléments entre {} représentent les types de datas de l'élément “photographer” 
    //
    
    // on récupère la balise ".photograph-header" dans laquelle on va ajouter les autres éléments 
    const photographHeader = document.querySelector(".photograph-header");
    
    // On ajoute le nom du photographe
    const photographHeaderTitle = document.createElement("h1");
    photographHeaderTitle.classList.add("photograph-header__title");
    photographHeaderTitle.textContent = "id : " + idPhotographer;
    // photographHeaderTitle.textContent = name;
    
    // On ajoute sa ville et son pays
    const photographHeaderLocalisation = document.createElement( 'p' );
    photographHeaderLocalisation.classList.add("photograph-header__localisation");
    photographHeaderLocalisation.textContent = "Ville, Pays";
    //photographHeaderLocalisation.textContent = city + ", " + country;

    // On ajoute sa philosophie
    const photographHeaderPhilosophy = document.createElement( 'p' );
    photographHeaderPhilosophy.classList.add("photograph-header__philosophy");
    photographHeaderPhilosophy.textContent = "Philosophie";
    //photographHeaderPhilosophy.textContent = tagline;

    photographHeader.appendChild(photographHeaderTitle);
    photographHeader.appendChild(photographHeaderLocalisation);
    photographHeader.appendChild(photographHeaderPhilosophy);


    //photograph-header
    // ajouter un H1 avec le nom du photographe
    console.log(photographHeader);

}
photographerCardFactory();