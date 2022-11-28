// Fonction pour ouvrir la fenêtre modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const body = document.querySelector("body");
    modal.style.display = "flex";
	body.style.overflow = "hidden";
}


// Fonction pour fermer la fenêtre modale
function closeModal() {
    const modal = document.getElementById("contact_modal");
    const body = document.querySelector("body");
    modal.style.display = "none";
	body.style.overflow = "auto";
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


function photographerForm(data) {
    const { name } = data;  // les éléments entre {} représentent les types de datas de l'élément “photographer” 
    const formTitle = document.getElementById("form_title");
    const formTitleName = document.createElement("span");
    formTitleName.innerHTML = " " + name;
    formTitle.appendChild(formTitleName);
}


function printFormDatas(){
    const fieldFirstName = document.getElementById("form__firstname");
    const fieldLastName = document.getElementById("form__lastname");
    const fieldEmail = document.getElementById("form__email");
    const fieldMessage = document.getElementById("form__message");
    console.log(`Nouveau message de : 
${fieldFirstName.value} ${fieldLastName.value}
Email : ${fieldEmail.value}
Message : ${fieldMessage.value}`);
}
// Validation du formulaire
const modal = document.getElementById("contact_modal");
const formSubmit = modal.querySelector(".contact_button");
formSubmit.addEventListener('click', (event) => {
    printFormDatas();
    event.preventDefault();
});

