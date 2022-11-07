function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
const contactPhotographerClose = document.getElementById("contact-photographer-close");
contactPhotographerClose.addEventListener('click', (event) => {
    closeModal();
  })