

// // kijken of de wachtwoorden overeenkomen

function confirmPassword(){
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm_password").value
    const inputField = document.getElementById("confirm_password")

if(confirmPassword.length != 0){
        if(password == confirmPassword){
     console.log("match")
       inputField.style.border = "green 1px solid"
    } else {
        console.log("no match")
        inputField.style.border = "red 1px solid"
    } 
}
}

setInterval(confirmPassword, 100)

// // kijken of het wachtwoord voldoet aan de requirements
function checkPassword() {
    const password = document.getElementById("password").value;
    const passwordSymbol = document.getElementById("password-symbol");
    const regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (regularExpression.test(password)){
        passwordSymbol.textContent = "✓";
    } else {
        passwordSymbol.textContent = "✕";
    }
}

document.getElementById("password").addEventListener("input", checkPassword);


// // drop down menu's 

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function (dropdown) {
    const select = dropdown.querySelector('.select');
    const arrowDropdown = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', function () {
        select.classList.toggle('selected-clicked');
        arrowDropdown.classList.toggle('rotate-caret');
        menu.classList.toggle('menu-open');
    });

    options.forEach(function (option) {
        option.addEventListener('click', function () {
            selected.innerHTML = option.innerHTML;
            select.classList.remove('selected-clicked');
            arrowDropdown.classList.remove('rotate-caret');
            menu.classList.remove('menu-open');

            options.forEach(function (opt) {
                opt.classList.remove('active-dropdown');
            });

            option.classList.add('active-dropdown');
        });
    });
});

const jsonFile = "../data.json";
const requestsContainer = document.querySelector('.all-requests')

fetch(jsonFile).then(respone=>{
    return respone.json();
}).then(data =>{
    data.map(requestCard => {
        const {images, title, description, max_amount, date, person, categorie} = requestCard;
        requestsContainer.innerHTML += `
        <section class="filter-item" data-name="${categorie}">
            <div class="imglayout">
                <img src="${images[0]}" alt="">
                <img src="${images[1]}" alt="">
                <img src="${images[2]}" alt="">
                <img src="${images[3]}" alt="">
                <img src="${images[4]}" alt="">
                <img src="${images[5]}" alt="">
            </div>
            <div >
                <h2>${title}</h2>
                <div class="scroll-text">
                    <p>${description}</p>
                </div>
                <p>3-5 days</p>
                <p>${max_amount}</p>
                <p>${date}</p>
                <p>${person}</p>
                <a href="">Match</a>
            </div>
        </section>`;
    })
    const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

console.log(allFilterBtns, allFilterItems);

const filterItems = e => {
    document.querySelector('.active-btn').classList.remove('active-btn');
    e.target.classList.add('active-btn');
    console.log(e.target);


    allFilterItems.forEach( item => {
        item.classList.add('hide');
        console.log(item);


        if(item.dataset.name === e.target.dataset.name || e.target.dataset.name === 'all'){
            item.classList.remove('hide');
        }


    });
};

allFilterBtns.forEach(btn => btn.addEventListener('click', filterItems));
})



