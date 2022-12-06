const contactClose = document.getElementById("contact-photographer-close");
const modal = document.getElementById("contact_modal");
const body = document.querySelector("body");
const main = document.getElementById("main");
const formSubmit = modal.querySelector(".contact_button");
let modalOpen = false;

// Fonction pour ouvrir la fenêtre modale
function displayModal() {
    modal.style.display = "flex";
	body.style.overflowY = "hidden";
    main.setAttribute("aria-hidden","true");
    modal.setAttribute("aria-hidden","false");
    contactClose.focus({focusVisible: true});
    modalOpen = true;
}

// Fonction pour fermer la fenêtre modale
function closeModal() {
    const buttonOpenModal = document.getElementById("contact-photographer");
    modal.style.display = "none";
	body.style.overflowY = "auto";
    main.setAttribute("aria-hidden","false");
    modal.setAttribute("aria-hidden","true");
    buttonOpenModal.focus({focusVisible: true});
    modalOpen = false;
}

// Fermer la fenêtre modale avec le bouton
contactClose.addEventListener('click', (event) => {
    closeModal();
});

// Fermer la fenêtre modale avec la touche Escap
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
        if(modalOpen){
            closeModal();
        }
    }
});

// Une fonction pour récupérer le nom du photographe et l'affiche dans le header du formulaire
function photographerForm(data) {
    const { name } = data;  // les éléments entre {} représentent les types de datas de l'élément “photographer” 
    const formTitle = document.getElementById("form_title");
    const formTitleName = document.createElement("span");
    formTitleName.innerHTML = " " + name;
    formTitle.appendChild(formTitleName);
}

// Une fonction pour afficher les données du formulaire dans la console
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
formSubmit.addEventListener('click', (event) => {
    printFormDatas();
    event.preventDefault();
});