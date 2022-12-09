function removeExtension(filename) {
    return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

function photographerMediasFactory(data) { 

    const { id, photographerId, title, image, video, likes, date, price } = data;  // les éléments entre {} représentent les types de datas de l'élément media 

    const mediaArticle = document.createElement("article");
    mediaArticle.classList.add("media");

    const mediaArticleFigure = document.createElement("figure");
    mediaArticleFigure.classList.add("media__figure");
    
    const mediaArticleImg = document.createElement("img");
    mediaArticleImg.classList.add("media__img");
    mediaArticleImg.setAttribute("aria-label","Open Lightbox");
    if(image){
        const urlImage = `../assets/medias-thumbnails/` + image;
        mediaArticleImg.setAttribute("src", urlImage);
        mediaArticleImg.setAttribute("alt", title);
        mediaArticleImg.setAttribute("media-id", id);
        mediaArticleImg.setAttribute("tabindex", 0);
        mediaArticleFigure.appendChild(mediaArticleImg);
    } 
    if(video){ // dans le cas où on a une vidéo, on affiche une image extraite de la vidéo
        const filenameMp4 = removeExtension(video);
        const filenameJpg = filenameMp4 + ".jpg";
        const urlImage = `../assets/medias/` + filenameJpg;
        mediaArticleImg.setAttribute("src", urlImage);
        mediaArticleImg.setAttribute("alt", title);
        mediaArticleImg.setAttribute("media-id", id);
        mediaArticleImg.setAttribute("tabindex", 0);
        mediaArticleImg.classList.add("media__img-video");
        const iconVideo = document.createElement("span");
        iconVideo.classList.add("media__icon_video");
        iconVideo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
        mediaArticleFigure.appendChild(iconVideo);
        mediaArticleFigure.appendChild(mediaArticleImg);
    }

    const mediaArticleInfos = document.createElement("div");
    mediaArticleInfos.classList.add("media__infos");

    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("media__title");
    mediaTitle.setAttribute("aria-label","Media title");
    mediaTitle.setAttribute("tabindex","0");
    mediaTitle.textContent = title;
    mediaArticleInfos.appendChild(mediaTitle);

    const mediaLike = document.createElement("p");
    mediaLike.classList.add("media__like");
    const mediaLikeWrapper = document.createElement("button");
    mediaLikeWrapper.classList.add("media__like__wrapper");
    mediaLikeWrapper.setAttribute("media-id", id);
    mediaLikeWrapper.setAttribute("media-author", photographerId);
    mediaLikeWrapper.setAttribute("media-liked", false);
    mediaLikeWrapper.setAttribute("aria-label", "likes");
    const mediaLikeCounter = document.createElement("span");
    mediaLikeCounter.classList.add("media__like__counter");
    mediaLikeCounter.textContent = likes;
    const iconHeart = document.createElement("i");
    iconHeart.setAttribute("aria-hidden", "true");
    iconHeart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="like_button" aria-hidden="true"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>';
    mediaLikeWrapper.appendChild(mediaLikeCounter);
    mediaLikeWrapper.appendChild(iconHeart);
    mediaLike.appendChild(mediaLikeWrapper);
    mediaArticleInfos.appendChild(mediaLike);

    mediaArticle.appendChild(mediaArticleFigure);
    mediaArticle.appendChild(mediaArticleInfos);
    
    return (mediaArticle);

}
