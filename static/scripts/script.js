

// // // kijken of de wachtwoorden overeenkomen

// function confirmPassword(){
//     const password = document.getElementById("password").value
//     const confirmPassword = document.getElementById("confirm_password").value
//     const inputField = document.getElementById("confirm_password")

// if(confirmPassword.length != 0){
//         if(password == confirmPassword){
//      console.log("match")
//        inputField.style.border = "green 1px solid"
//     } else {
//         console.log("no match")
//         inputField.style.border = "red 1px solid"
//     } 
// }
// }

// setInterval(confirmPassword, 100)

// // // kijken of het wachtwoord voldoet aan de requirements
// function checkPassword() {
//     const password = document.getElementById("password").value;
//     const passwordSymbol = document.getElementById("password-symbol");
//     const regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//     if (regularExpression.test(password)){
//         passwordSymbol.textContent = "✓";
//     } else {
//         passwordSymbol.textContent = "✕";
//     }
// }

// // Lisa deel request & create

// const jsonFile = "../data.json";
// const requestsContainer = document.querySelector('.all-requests')

// fetch(jsonFile).then(respone=>{
//     return respone.json();
// }).then(data =>{
//     data.map(requestCard => {
//         const {images, title, description, max_amount, date, person, categorie} = requestCard;
//         requestsContainer.innerHTML += `
//         <section class="filter-item" data-name="${categorie}">
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
//     const allFilterItems = document.querySelectorAll('.filter-item');
// const allFilterBtns = document.querySelectorAll('.filter-btn');

// console.log(allFilterBtns, allFilterItems);

// const filterItems = e => {
//     document.querySelector('.active-btn').classList.remove('active-btn');
//     e.target.classList.add('active-btn');
//     console.log(e.target);


//     allFilterItems.forEach( item => {
//         item.classList.add('hide');
//         console.log(item);


//         if(item.dataset.name === e.target.dataset.name || e.target.dataset.name === 'all'){
//             item.classList.remove('hide');
//         }


//     });
// };

// allFilterBtns.forEach(btn => btn.addEventListener('click', filterItems));
// })



const prevBtns = document.querySelectorAll('.btn-prev');
const nextBtns = document.querySelectorAll('.btn-next');
const progress = document.getElementById('progress');
const formSteps = document.querySelectorAll('fieldset');
const progressSteps = document.querySelectorAll('.progress-step');

// current form step
let formStepsNum = 0;

// Next btn function
nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        event.preventDefault();
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        console.log(formStepsNum)
    });
});

// Previous btn function
prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        event.preventDefault();
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
        console.log(formStepsNum)
    });
});

// Progress buttons function
progressSteps.forEach((step, idx) => {
    step.addEventListener('click', () => {
        formStepsNum = idx;
        updateFormSteps();
        updateProgressbar();
        console.log(formStepsNum)
    });
});

// Updating the form steps
function updateFormSteps() {
    formSteps.forEach(formStep => {
        formStep.classList.contains('active') && formStep.classList.remove('active');
    });
    formSteps[formStepsNum].classList.add('active');
}

// function for updating progress bar
function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
            progressStep.classList.add('active-progress');
        } else {
            progressStep.classList.remove('active-progress');
        }
    });

// function for updating progress bar line through the middle
    const progressActive = document.querySelectorAll('.progress-step.active-progress');
    progress.style.width = (progressActive.length - 1) / (progressSteps.length - 1) * 100 + '%';
}



gsap.registerPlugin(ScrollTrigger);

console.log(ScrollTrigger)


    document.addEventListener("DOMContentLoaded",function(){
    const contentHolderHeight = document.querySelector('.content-holder').offsetHeight;
    const imgHolderHeight = window.innerHeight;
    const additionalScrollHeight = window.innerHeight;

    const totalBodyHeight = contentHolderHeight + imgHolderHeight + additionalScrollHeight;
    document.body.style.height = `${totalBodyHeight}px`;

})

ScrollTrigger.create({
    trigger: ".website-content",
    start: "-0.1% top",
    end: "bottom bottom",
    onEnter: () => {
        gsap.set('.website-content', {position: 'absolute', top: '195%'});
    },
    onLeaveBack: () => {
        gsap.set('.website-content', {position: 'fixed', top: '0%'});
    }
});

gsap.to('.word .letters:first-child', {
    x: () => -window.innerWidth * 3,
    scale: 10,
    ease: 'power2.inOut',
    scrollTrigger: {
        trigger: '.word',
        start: 'top top',
        end: `+=200%`,
        scrub: 1
    } 
});

gsap.to('.word .letters:last-child', {
    x: () => window.innerWidth * 3,
    scale: 10,
    ease: 'power2.inOut',
    scrollTrigger: {
        trigger: '.word',
        start: 'top top',
        end: `+=200%`,
        scrub: 1
    } 
});

gsap.to('.img-holder', {
    rotation: 0,
    ease: 'power2.inOut',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    scrollTrigger: {
        start: 'top top',
        end: `+=200%`,
        scrub: 1
    }
});


gsap.to('.img-holder img',  {
    scale: 1,
    ease: 'power2.inOut',
    clipPath: 'polygon (0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    scrollTrigger: {
        start: 'top top',
        end: `+=200%`,
        scrub: 1
    }
});


