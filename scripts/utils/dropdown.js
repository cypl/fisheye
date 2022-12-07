// Dropdown elements
const dropdownTrigger = document.getElementById("sort-by-wrapper");
const dropdownItems = document.getElementsByClassName("sort-by-item");

//Fonction pour ouvrir le dropdown
function openDropdown(){
    dropdownTrigger.classList.add("dropdownOpen");
    for(let dropdownItem of dropdownItems){
        dropdownItem.style.display = "block";
    }
    dropdownTrigger.setAttribute("aria-expanded","true");
}

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
    dropdownTrigger.setAttribute("aria-expanded","false");
}

// Evènement ouvrir le dopdown
dropdownTrigger.addEventListener('mouseenter', (event) => {
    openDropdown();
});

//Evènement fermer le dropdown
dropdownTrigger.addEventListener('mouseleave', (event) => {
    closeDropdown();
});

// Faire remonter l'élément cliqué au dessus de la liste
for (let dropdownItem of dropdownItems) {
    dropdownItem.addEventListener('click', (event) => {
        // tous les éléments du dropdown passe sur aria-selected="false"
        for (let dropdownItem of dropdownItems) {
            dropdownItem.setAttribute("aria-selected","false");
        }
        // l'élément du dropdown sur lequel on a cliqué remonte en haut de la liste et passe sur aria-selected="true"
        dropdownTrigger.insertBefore(dropdownItem, dropdownTrigger.firstChild);
        dropdownItem.setAttribute("aria-selected","true");
        //On ferme le dropdown une fois que l'élément cliqué est remonté dans la liste
        closeDropdown();
    });
}

// Navigation au clavier dans le dropdown
document.addEventListener('keyup', (event) => {
    //enter or space
    if(event.key == "Enter" || event.key == " " || event.key == "Spacebar"){ 
        // Quand on appuie sur entrée/espace, et que l'élément dropdownTrigger est focus
        const dropdownTrigger = document.getElementById("sort-by-wrapper");
        if(document.activeElement === dropdownTrigger){
            openDropdown();
        }
        // Si un élément du dropdown est focus
        const sortByLikes = document.getElementById("sort-by-likes");
        const sortByName = document.getElementById("sort-by-name");
        const sortByDate = document.getElementById("sort-by-date");
        if(document.activeElement === sortByLikes){
            initPhotographerByLikes();
            dropdownTrigger.insertBefore(sortByLikes, dropdownTrigger.firstChild);
            closeDropdown();
        }
        if(document.activeElement === sortByName){
            initPhotographerByTitle();
            dropdownTrigger.insertBefore(sortByName, dropdownTrigger.firstChild);
            closeDropdown();
        }
        if(document.activeElement === sortByDate){
            initPhotographerByDate();
            dropdownTrigger.insertBefore(sortByDate, dropdownTrigger.firstChild);
            closeDropdown();
        }
    }
    //échappe
    if(event.key == "Escape"){ 
        // Si l'élément dropdownTrigger est focus
        const dropdownTrigger = document.getElementById("sort-by-wrapper");
        if(document.activeElement === dropdownTrigger){
            closeDropdown();
        }
        // Si un élément du dropdown est focus
        for (let dropdownItem of dropdownItems) {
            if(document.activeElement === dropdownItem){
                closeDropdown();
            }
        }
    }
});