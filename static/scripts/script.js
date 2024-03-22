

// const button = document.getElementById('animationButton');
// const elementJobs = document.getElementById("jobsElement");
// const elementWork = document.getElementById("workElement");
// const buttonJobs = document.getElementById("buttonJobs");
// const buttonWork = document.getElementById("buttonWork");

// const workClick = () => {
//     button.style.left = '0';
//     elementJobs.style.display = 'none';
//     elementWork.style.display = 'block';
// };

// const jobsClick = () => {
//     button.style.left = '5em';
//     console.log("hallo");
//     elementJobs.style.display = 'block';
//     elementWork.style.display = 'none';
// };

// buttonJobs.addEventListener("click", jobsClick);
// buttonWork.addEventListener("click", workClick);

const elementJobs = document.getElementById("jobsElement");
const elementWork = document.getElementById("workElement")
const button = document.getElementById('animationButton');
const buttonJobs = document.getElementById("buttonJobs");
const buttonWork = document.getElementById("buttonWork");
const divContainer = document.querySelector(".animationSlide")

const workClick = () => {
    button.style.left = '0';
   divContainer.classList.remove('moveJobs');
    // elementJobs.classList.add('hidden');
};

const jobsClick = () => {
    button.style.left = '5em';
    divContainer.classList.add('moveJobs');
    console.log("tesdjsklfjasdklfa;jsjt")
    // elementJobs.classList.remove('hidden');
};

buttonJobs.addEventListener("click", jobsClick);
buttonWork.addEventListener("click", workClick);


// hover en button waarmee je extra tekst kan zien voor over de foto 

const tekstPortfolio = document.querySelectorAll('.work section > figure > section:nth-of-type(2)')
const figurePortfolio = document.querySelectorAll('.work section > figure')
const buttonTekstPortfolio = document.querySelectorAll('section figure .hide button')

buttonTekstPortfolio.forEach((button, index) => {
    button.addEventListener("click", () => {
        tekstPortfolio[index].style.display = 'block'
    })
})
// hier zorgt het ervoor dat als je met je muis van de figure afgaat hij na 1 seconde weer verdwijnt
figurePortfolio.forEach((figure, index) => {
    figure.addEventListener('mouseleave', () => {
        setTimeout(() => {
            tekstPortfolio[index].style.display = 'none'
        }, 1000)
    })

})



// variable voor de match knop

const matchForm = document.getElementById("matchForm");
const matchOption2Labels = document.querySelectorAll('#matchOption2 label');
const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');

// functie om het formulier te openen en zorgen dat niet alles beschikbaar is eerst
const openMatchForm = () => {
    matchOption2Inputs.forEach(inputForMatchOption2 => {
        inputForMatchOption2.disabled = true;
    });
    matchOption2Labels.forEach(labelForMatchOption2 => {
        labelForMatchOption2.classList.add("matchOption2-disabled");
    });

    matchForm.classList.remove("hidden");
};
// functie om het formulier te sluiten
const closeMatchForm = () => {
    matchForm.classList.add("hidden");
};

// aanroepen wanneer de functie moet worden uitgevoerd

document.getElementById("matchButton").addEventListener("click", openMatchForm);
document.getElementById("submitMatch").addEventListener("click", closeMatchForm);

// functie en aanroeping wat er gebeurt als je op de knop match with job gebeurt
document.getElementById('matchWithJob').addEventListener('click', () => {
    openMatchForm();

    matchOption2Inputs.forEach(inputForMatchOption2 => {
        inputForMatchOption2.disabled = false;
        inputForMatchOption2.classList.add("option2ForMatchButton")
    });
    matchOption2Labels.forEach(labelForMatchOption2 => {
        labelForMatchOption2.classList.remove("matchOption2-disabled");
        labelForMatchOption2.classList.add("animateShadow");
    });
});
// functie en aanroeping wat er gebeurt als je op de knop match with person gebeurt

document.getElementById('matchWithPerson').addEventListener('click', () => {
    matchOption2Labels.forEach(labelForMatchOption2 => {
        labelForMatchOption2.classList.add("matchOption2-disabled");
        labelForMatchOption2.classList.remove("animateShadow");
    matchOption2Inputs.forEach(inputForMatchOption2 => {
        inputForMatchOption2.classList.remove("option2ForMatchButton")
    })
        console.log("yaya")
    });
});

//  function radioButton zorgt ervoor dat het de omcirclde weghaald 
// matchOption2Inputs.forEach(radioButton => {
//     radioButton.disabled = true;
    
//     if (radioButton.checked)
//     { radioButton.checked = false; }
// });

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
