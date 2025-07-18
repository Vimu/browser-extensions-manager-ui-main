let extensions = [];
let checkedItems = [];
window.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      extensions = data;
      renderExtensions(extensions); // initially show all
    })
    .catch((error) => console.error("Error loading JSON:", error));
});

function renderExtensions(data){
   
    const cardContainer = document.getElementById('card-container');

    cardContainer.innerHTML = ""; 

    data.forEach((ext, index) => {
        const checked = ext.isActive ? 'checked' : '';
        
        const card = `
            <div class="card">
                <div class="card__main">
                    <div class="card__icon">
                        <img src="${ext.logo}" alt="${ext.name}">
                    </div>
                    <div class="card__body">
                        <h2 class="card__title">${ext.name}</h2>
                        <p class="card__desc">${ext.description}</p>
                    </div>
                </div>
                <div class="card__btns">
                    <button type="button" class="card__btn--remove" id="remove-${index}">Remove</button>
                    <div class="card__btn--toggle">
                        <label class="card__switch">
                            <input type="checkbox" name="checkbox" class="toggle" id="toggle-${index}" ${checked}>
                            <span class="slider"></span>
                        </label>
                        
                    </div>
                </div>
            </div>`
           
        cardContainer.insertAdjacentHTML('beforeend', card);
        // Attach listener after inserting into DOM

        const toggle = document.getElementById(`toggle-${index}`);
        const label = document.getElementById(`label-${index}`);
                
        toggle.addEventListener('change', function(){

            const isNowActive = this.checked;
                //data.json update UI toggle changes
                const itemToUpdate = extensions.find(item => item.name === ext.name); 
                if (itemToUpdate) {
                    itemToUpdate.isActive = isNowActive;
                }       
        })

        const removeButton = document.getElementById(`remove-${index}`);

        removeButton.addEventListener("click", function(e){
            // const elementCard = e.currentTarget.parentElement.parentElement;
            const elementCard = e.currentTarget.closest(".card")
            elementCard.remove()
                                    
            const extIndex = extensions.findIndex(item => item.name === ext.name);
                                    
            if (extIndex !== -1) {
                extensions.splice(extIndex, 1); // remove from array
            }             
        });
    });
}
    

    // filter extensions
const filterBtns = document.querySelectorAll('.list__btn');

filterBtns.forEach(function(btn){
    btn.addEventListener("click", function(e){

        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove("active"));
        // Add active class to the clicked button
        this.classList.add("active");
        
        const category = e.currentTarget.textContent.trim();

        let filterd = [];

        if(category === 'All'){
            filterd = extensions;            
        }else if(category === 'Active'){
            filterd = extensions.filter(ext => ext.isActive === true);
        }else if(category === 'Inactive'){
            filterd = extensions.filter(ext => ext.isActive === false);
        }
        renderExtensions(filterd);
    })
});

// light and dark mode
const darkModeBtn = document.querySelector(".header__btn--mode");
const themeIcon = document.querySelector(".theme-icon");

darkModeBtn.addEventListener("click", function darkMode(){
    let element = document.body;
    element.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    themeIcon.src = isDark ? "./assets/images/icon-sun.svg" : "./assets/images/icon-moon.svg";
});
