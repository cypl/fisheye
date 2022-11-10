// Dropdown elements
const dropdownTrigger = document.getElementById("sort-by-wrapper");
const dropdownItems = document.getElementsByClassName("sort-by-item");

//Ouvrir le dropdown
dropdownTrigger.addEventListener('mouseenter', (event) => {
    dropdownTrigger.classList.add("dropdownOpen");
    for(let dropdownItem of dropdownItems){
        dropdownItem.style.display = "block";
    }
});

//Fonction pour fermer le dropdown
function closeDropdown(){
    dropdownTrigger.classList.remove("dropdownOpen");
    let index = 0;
    for(let dropdownItem of dropdownItems){
        if(index >= 1){
            dropdownItem.style.display = "none"; 
        } else{
            dropdownItem.style.display = "block"; // le premier élément doit rester visible
        }
        index++;
    }
}

//Fermer le dropdown
dropdownTrigger.addEventListener('mouseleave', (event) => {
    closeDropdown();
});

// Faire remonter l'élément cliqué au dessus de la liste
for (let dropdownItem of dropdownItems) {
    dropdownItem.addEventListener('click', (event) => {
        dropdownTrigger.insertBefore(dropdownItem, dropdownTrigger.firstChild);
        //On ferme le dropdown une fois que l'élément cliqué est remonté dans la liste
        closeDropdown();
    });
}