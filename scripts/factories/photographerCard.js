function photographerCardFactory(data) { 

    const { name, portrait, city, country, tagline, price } = data;  // les éléments entre {} représentent les types de datas de l'élément “photographer” 

    // on récupère la balise ".photograph-header" dans laquelle on va ajouter les autres éléments 
    const photographHeader = document.querySelector(".photograph-header");
        const photographHeaderCol1 = document.createElement("div");
        photographHeaderCol1.classList.add("photograph-header_col1");
        const photographHeaderCol2 = document.createElement("div");
        photographHeaderCol2.classList.add("photograph-header_col2");
        const photographHeaderCol3 = document.createElement("div");
        photographHeaderCol3.classList.add("photograph-header_col3");

    photographHeader.appendChild(photographHeaderCol1);
    photographHeader.appendChild(photographHeaderCol2);
    photographHeader.appendChild(photographHeaderCol3);

    // Colonne 1 - On crée un wrapper pour tous les éléments textes
    const photographHeaderWrapperInfos = document.createElement("div");
    photographHeaderWrapperInfos.classList.add("photograph-header__wrapper_infos");

    // Colonne 1 - On ajoute le nom du photographe
    const photographHeaderTitle = document.createElement("h1");
    photographHeaderTitle.classList.add("photograph-header__title");
    photographHeaderTitle.textContent = name;
    
    // Colonne 1 - On ajoute sa ville et son pays
    const photographHeaderLocalisation = document.createElement( 'p' );
    photographHeaderLocalisation.classList.add("photograph-header__localisation");
    photographHeaderLocalisation.textContent = city + ", " + country;

    // Colonne 1 - On ajoute sa philosophie
    const photographHeaderPhilosophy = document.createElement( 'p' );
    photographHeaderPhilosophy.classList.add("photograph-header__philosophy");
    photographHeaderPhilosophy.textContent = tagline;

    photographHeaderWrapperInfos.appendChild(photographHeaderTitle);
    photographHeaderWrapperInfos.appendChild(photographHeaderLocalisation);
    photographHeaderWrapperInfos.appendChild(photographHeaderPhilosophy);
    photographHeaderCol1.appendChild(photographHeaderWrapperInfos);

    // Colonne 2
    const photographHeaderButton = document.createElement("button");
    photographHeaderButton.classList.add("contact_button");
    photographHeaderButton.setAttribute("id","contact-photographer");
    photographHeaderButton.textContent = "Contactez-moi";
    photographHeaderCol2.appendChild(photographHeaderButton);
    photographHeaderButton.addEventListener('click', (event) => {
        displayModal();
    });

    // Colonne 3
    const photographHeaderPortrait = document.createElement("figure");
    photographHeaderPortrait.classList.add("photograph-header__portrait");
    const photographHeaderPortraitImg = document.createElement("img");
    photographHeaderPortraitImg.classList.add("photograph-header__img");
    photographHeaderPortraitImg.setAttribute("alt", name);
    photographHeaderPortraitImg.setAttribute("src", "assets/photographers/" + portrait);
    photographHeaderPortrait.appendChild(photographHeaderPortraitImg);
    photographHeaderCol3.appendChild(photographHeaderPortrait);

    return (photographHeader);
}
