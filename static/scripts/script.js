
// const { log } = require("console")

const button = document.getElementById('animationButton')
// const work = document.querySelector('work')
// const jobs = document.querySelector('jobs')
const elementJobs = document.getElementById("jobsElement")
const elementWork = document.getElementById("workElement")
const buttonJobs = document.getElementById("buttonJobs")
const buttonWork = document.getElementById("buttonWork")

buttonJobs.addEventListener("click", jobsClick)

buttonWork.addEventListener("click", workClick)

function workClick() {
    button.style.left = '0'
    // work.classList.toggle('workVisible')
    elementJobs.style.display = 'none'
    elementWork.style.display = 'block'
}
function jobsClick() {
    button.style.left = '5em';
    console.log("hallo")
    elementJobs.style.display = 'block'
    elementWork.style.display = 'none'
}

// const tekstPortfolio = document.querySelector('.work section > figure > section:nth-of-type(2)')
// const buttonTekstPortfolio = document.querySelector('section figure .hide button')

// buttonTekstPortfolio.addEventListener("click", tekstPortfolioZichtbaar)
// function tekstPortfolioZichtbaar() {
//     tekstPortfolio.style.display = 'block'
//     console.log("gelukkt")
    
// }

const tekstPortfolio = document.querySelectorAll('.work section > figure > section:nth-of-type(2)')
const figurePortfolio = document.querySelectorAll('.work section > figure')
const buttonTekstPortfolio = document.querySelectorAll('section figure .hide button')

buttonTekstPortfolio.forEach((button, index) => {
    button.addEventListener("click", () => {
        tekstPortfolio[index].style.display = 'block'
    })
})

figurePortfolio.forEach((figure, index) => {
    figure.addEventListener('mouseleave', () => {
        setTimeout(() => {
            tekstPortfolio[index].style.display = 'none'
        }, 1000)
    })

})

// function tekstPortfolioZichtbaar() {
//     tekstPortfolio.style.display = 'block'
//     console.log("gelukkt")
    
// }
// $("figure .hide h2").lettering();



// images van de map op de pagina gooien oude code. werkt wel , niet heel functioneel of custom .

document.addEventListener('DOMContentLoaded', () => {
fetch('/images')
    .then(response => response.json())
    .then(images => {
        images.forEach(image => {
            const figure = document.createElement('figure');
            const imgElement = document.createElement('img');
            imgElement.src = 'uploads/' + image;
            imgElement.alt = 'Image';
            figure.appendChild(imgElement);
            document.body.appendChild(figure); // Voeg de figure toe aan het document
        });
    })
    .catch(error => console.error('Error fetching images:', error));
});


// js for navbar

const discover_text = document.getElementById("discover_p");
const jobs_text = document.getElementById("jobs_p");

discover_text.addEventListener("mouseover", () => {
    console.log('discover is ontdekt')
    document.getElementById("underline_nav").style.opacity = "1";
    document.getElementById("underline_nav").style.marginLeft = "1.45em";
});


jobs_text.addEventListener("mouseover", () => {
    console.log('jobs is ontdekt')
    document.getElementById("underline_nav").style.opacity = "1";
    document.getElementById("underline_nav").style.marginLeft = "9em";
    
});


document.addEventListener('DOMContentLoaded', function() {
    const sparkleElement = document.getElementById('sparkle-element');
    sparkleElement.addEventListener('mousemove', function(e) {
        createSparkle(e);
    });
});

function createSparkle(e) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}


// code voor succes popup multer upload
document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('uploadForm');
    const successPopup = document.getElementById('successPopup');

    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(uploadForm);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                successPopup.style.display = 'block';
            }
        })
        .catch(error => console.error('Error uploading file:', error));
    });
});

// // kijken of de wachtwoorden overeenkomen


function confirmPasswordFunction(){
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

// confirmPassword.addEventListener('input', confirmPasswordFunction())

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

// password.addEventListener("input", checkPassword);


// Lisa deel request & create

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

