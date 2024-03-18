console.log("test")

function confirmPassword(){
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm-password").value
    const confirmText = document.getElementById("confirm-text")

    if(password !== confirmPassword){
        confirmText.textContent = "Passwords don't match"
    } else {
        confirmText.textContent = "Passwords match"
    }

}


// Lisa deel request & create


// const form = document.querySelector('.form')

// form.addEventListener('submit', event => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData)

//     console.log(data);

//     fetch('http://localhost:3000/person', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }).then (res => res.json())
    



    // let btn = document.querySelector('.btn')
    // let rightBtn = document.querySelector('.rightbtn')

    // function leftClick() {
    //     btn.style.left = '0'
    //     console.log('hi')
    //     rightBtn.style.color = 'white';
    // }

    // function rightClick() {
    //     btn.style.left  = '162px';
    //     rightBtn.style.color = 'black';
    // }
 

// Filter buttons

// const allFilterItems = document.querySelectorAll('.filter-item');
// const allFilterBtns = document.querySelectorAll('.filter-btn');

// allFilterBtns.forEach((btn) => {
//     btn.addEventListener('click', () => {
//     showFilteredContent(btn);
//     });
// });

// function showFilteredContent(btn){
//     allFilterItems.forEach((item)=> {
//         if(item.classList.contains(btn.id)){
//             resetActiveBtn();
//             item.style.display = "flex";
//             btn.classList.add('active-btn');
//         } else {
//             item.style.display = "none";
//         }

//     });
// }

// function resetActiveBtn(){
//     allFilterBtns.forEach((btn) => {
//         btn.classList.remove('active-btn');
//     }
//     )
// }
    
// const allFilterDropdowns = document.querySelectorAll('.filter-dropdown');

// allFilterDropdowns.forEach((dropdownchoice) => {
//     dropdownchoice.addEventListener('click', () => {
//     showFilteredContent(dropdownchoice);
//     });
// });

// function showFilteredContent(dropdownchoice){
//     allFilterItems.forEach((item)=> {
//         if(item.classList.contains(dropdownchoice.id)){
//             resetActiveDropdown();
//             item.style.display = "flex";
//             dropdownchoice.classList.add('active-btn');
//         } else {
//             item.style.display = "none";
//         }

//     });
// }

// function resetActiveDropdown() {
//     allFilterDropdowns.forEach((dropdownchoice) => {
//         dropdownchoice.classList.remove('active-btn'); // Corrected class name
//     });
// }


// // drop down menu's 

// const dropdowns = document.querySelectorAll('.dropdown');

// dropdowns.forEach(function (dropdown) {
//     const select = dropdown.querySelector('.select');
//     const arrowDropdown = dropdown.querySelector('.caret');
//     const menu = dropdown.querySelector('.menu');
//     const options = dropdown.querySelectorAll('.menu li');
//     const selected = dropdown.querySelector('.selected');

//     select.addEventListener('click', function () {
//         select.classList.toggle('selected-clicked');
//         arrowDropdown.classList.toggle('rotate-caret');
//         menu.classList.toggle('menu-open');
//     });

//     options.forEach(function (option) {
//         option.addEventListener('click', function () {
//             selected.innerHTML = option.innerHTML;
//             select.classList.remove('selected-clicked');
//             arrowDropdown.classList.remove('rotate-caret');
//             menu.classList.remove('menu-open');

//             options.forEach(function (opt) {
//                 opt.classList.remove('active-dropdown');
//             });

//             option.classList.add('active-dropdown');
//         });
//     });
// });

const jsonFile = "./data.json";
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










// fetch(jsonFile).then(respone=>{
//     return respone.json();
// }).then(data=>{
//     data.map(requestCard => {
//         const {images, title, description, max_amount, date, person} = requestCard;
//         requestsContainer.innerHTML += `
//         <section class="filter-item" data-name:"logo-design" >
//             <div class="imglayout">
//                 <img src="${images[0]}" alt="">
//                 <img src="${images[1]}" alt="">
//                 <img src="${images[2]}" alt="">
//                 <img src="${images[3]}" alt="">
//                 <img src="${images[4]}" alt="">
//                 <img src="${images[5]}" alt="">
//             </div>
//             <div >
//                 <h2>${title}</h2>
//                 <div class="scroll-text">
//                     <p>${description}</p>
//                 </div>
//                 <p>3-5 days</p>
//                 <p>${max_amount}</p>
//                 <p>${date}</p>
//                 <p>${person}</p>
//                 <a href="">Match</a>
//             </div>
//         </section>`;
//     })
// })







    
