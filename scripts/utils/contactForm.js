// Fonction pour ouvrir la fenêtre modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const body = document.querySelector("body");
    modal.style.transform = "translate(0,0)";
	body.style.overflow = "hidden";
}

// Fonction pour fermer la fenêtre modale
function closeModal() {
    const modal = document.getElementById("contact_modal");
    const body = document.querySelector("body");
    modal.style.transform = "translate(-100%,0)";
	body.style.overflow = "scroll";
}

// Fermer la fenêtre modale avec le bouton
const contactPhotographerClose = document.getElementById("contact-photographer-close");
contactPhotographerClose.addEventListener('click', (event) => {
    closeModal();
  });

// Fermer la fenêtre modale avec la touche Escap
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
        closeModal();
    }
});

async function photographerForm(data) {
    const { name } = data;  // les éléments entre {} représentent les types de datas de l'élément “photographer” 
    const formTitle = document.getElementById("form_title");
    const formTitleName = document.createElement("span");
    formTitleName.innerHTML = ",<br>" + name;
    formTitle.appendChild(formTitleName);
}


