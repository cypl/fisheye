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
    emptyForm();
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
    validateForm();
    event.preventDefault();
});




// Fonction qui est utilisée pour les différentes fonctions de validation des champs
function validationDry(condition, formData, ErrorMessage){
    if(condition){ // la saisie est valide
      formData.removeAttribute("data-error");
      formData.setAttribute("data-valid",true);
    } else { // la saisie est non valide
      formData.setAttribute("data-valid",false);
      formData.setAttribute("data-error", ErrorMessage);
    }
    return condition;
  }
//Validation de la longueur de la saisie
function validateLength(field,formData){
    return validationDry(field.value.length >= 2, formData, "Vous devez saisir au moins 2 caractères.");
  }
//Validation de la saisie de l'email
function validateEmail(field,formData){
    let emailString = field.value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // Regex pour vérifier le contenu de l'email saisi
    return validationDry(emailRegex.test(emailString), formData, "Votre email n'est pas valide.");
}

// Tests au remplissage du formulaire
const modalContent = document.querySelector(".modal");
const contactForm = document.getElementById("contact_form");
// Prénom
const firstNameWrapper = document.getElementById("form__firstname");
const formDataFirstName = document.getElementById("formData__firstName");
// Nom
const lastNameWrapper = document.getElementById("form__lastname");
const formDataLastName = document.getElementById("formData__lastName");
// Email
const emailWrapper = document.getElementById("form__email");
const formDataEmail = document.getElementById("formData__email");
// Message
const messageWrapper = document.getElementById("form__message");
const formDataMessage = document.getElementById("formData__message");

firstNameWrapper.addEventListener('input', (event) => {
    validateLength(firstNameWrapper,formDataFirstName);
});
lastNameWrapper.addEventListener('input', (event) => {
    validateLength(lastNameWrapper,formDataLastName);
});
emailWrapper.addEventListener('input', (event) => {
    validateEmail(emailWrapper,formDataEmail);
});
messageWrapper.addEventListener('input', (event) => {
    validateLength(messageWrapper,formDataMessage);
});

// Les contenu de chaque champ sera validé, chaque validation est stockée dans un array
const validatorForm = [false, false, false, false];
// Fonction pour valider les champs de formulaire
function validateForm(){
    validatorForm[0] = validateLength(firstNameWrapper,formDataFirstName);
    validatorForm[1] = validateLength(lastNameWrapper,formDataLastName);
    validatorForm[2] = validateEmail(emailWrapper,formDataEmail);
    validatorForm[3] = validateLength(messageWrapper,formDataMessage);
    if(validatorForm.includes(false)){ // Il y a au moins une validation qui est fausse
        event.preventDefault();
    }else{ // Tous les champs sont validés 
        event.preventDefault();
        printFormDatas();
        emptyForm();
        thankYouForm();
    }
}

// Fonction qui affiche un message de remerciement
function thankYouForm(){
    contactForm.style.display = "none";
    const thankYou = document.createElement("p");
    thankYou.classList.add("thank_you_message");
    thankYou.textContent = "Merci pour votre message !";
    modalContent.appendChild(thankYou);
}

// Fonction pour vider les champs de formulaire
function emptyForm(){
    firstNameWrapper.value = "";
    formDataFirstName.removeAttribute("data-error");
    formDataFirstName.removeAttribute("data-valid");
    lastNameWrapper.value = "";
    formDataLastName.removeAttribute("data-error");
    formDataLastName.removeAttribute("data-valid");
    emailWrapper.value = "";
    formDataEmail.removeAttribute("data-error");
    formDataEmail.removeAttribute("data-valid");
    messageWrapper.value = "";
    formDataMessage.removeAttribute("data-error");
    formDataMessage.removeAttribute("data-valid");
    contactForm.style.display = "block";
    if(document.querySelector(".thank_you_message")){
        document.querySelector(".thank_you_message").remove(); 
    }
}