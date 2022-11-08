function photographerMediasFactory(data) { 

    const { id, photographerId, title, image, likes, date, price } = data;  // les éléments entre {} représentent les types de datas de l'élément media 

    const mediaArticle = document.createElement("article");
    mediaArticle.classList.add("media");

    const mediaArticleFigure = document.createElement("figure");
    mediaArticleFigure.classList.add("media__figure");

    const mediaArticleImg = document.createElement("img");
    mediaArticleImg.classList.add("media__img");
    mediaArticleFigure.appendChild(mediaArticleImg);

    const mediaArticleInfos = document.createElement("div");
    mediaArticleInfos.classList.add("media__infos");

    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("media__title");
    mediaTitle.textContent = title;
    mediaArticleInfos.appendChild(mediaTitle);

    const mediaLike = document.createElement("p");
    mediaLike.classList.add("media__like");
    mediaLike.textContent = likes;
    mediaArticleInfos.appendChild(mediaLike);

    mediaArticle.appendChild(mediaArticleFigure);
    mediaArticle.appendChild(mediaArticleInfos);
    
    return (mediaArticle);

}
