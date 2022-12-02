// Dropdown elements
const dropdownTrigger = document.getElementById("sort-by-wrapper");
const dropdownItems = document.getElementsByClassName("sort-by-item");

//Fonction pour ouvrir le dropdown
function openDropdown(){
    dropdownTrigger.classList.add("dropdownOpen");
    for(let dropdownItem of dropdownItems){
        dropdownItem.style.display = "block";
    }
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
        dropdownTrigger.insertBefore(dropdownItem, dropdownTrigger.firstChild);
        //On ferme le dropdown une fois que l'élément cliqué est remonté dans la liste
        closeDropdown();
    });
}


// Navigation au clavier dans le dropdown
document.addEventListener('keyup', (event) => {
    //enter or space
    if(event.keyCode == "13" || event.keyCode == "32"){ 
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
        }
        if(document.activeElement === sortByName){
            initPhotographerByTitle();
        }
        if(document.activeElement === sortByDate){
            initPhotographerByDate();
        }
    }
    //échappe
    if(event.keyCode == "27"){ 
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
    //flêche bas
    if(event.keyCode == "40"){ 
        // Quand on appuie sur échappe, et que l'élément dropdownTrigger est focus
        const dropdownTrigger = document.getElementById("sort-by-wrapper");
        if(document.activeElement === dropdownTrigger){
            console.log("tu veux naviguer dans le dropdown");
        }
    }
    //flêche haut
    if(event.keyCode == "38"){ 
        // Quand on appuie sur échappe, et que l'élément dropdownTrigger est focus
        const dropdownTrigger = document.getElementById("sort-by-wrapper");
        if(document.activeElement === dropdownTrigger){
            console.log("tu veux naviguer dans le dropdown");
        }
    }

});