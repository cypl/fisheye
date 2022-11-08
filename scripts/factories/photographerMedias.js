function photographerMediasFactory(data) { 

    const { id, photographerId, title, image, likes, date, price } = data;  // les éléments entre {} représentent les types de datas de l'élément media 

    const mediaArticle = document.createElement("article");
    mediaArticle.classList.add("media");

    const mediaTitle = document.createElement("p");
    mediaTitle.textContent = title;

    mediaArticle.appendChild(mediaTitle);
    return (mediaArticle);

}
