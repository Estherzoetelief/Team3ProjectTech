

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



// // formulier voor match button 
// document.getElementById('matchWithJob').addEventListener('click', () => {
//     // Schakel alle radio buttons in matchOption2 in
//     const radioButtonsToEnable = document.querySelectorAll('#matchOption2 input');
//     radioButtonsToEnable.forEach(radioButton => {
//         radioButton.disabled = false;
//     });
// });

// // Event listener voor matchWithPerson
// document.getElementById('matchWithPerson').addEventListener('click', () => {
//     // Schakel alle radio buttons in matchOption2 uit
//     const radioButtonsToDisable = document.querySelectorAll('#matchOption2 input');
//     radioButtonsToDisable.forEach(radioButton => {
//         radioButton.disabled = true;
//         // Controleer en verwijder de checked status indien nodig
//         if (radioButton.checked) {
//             radioButton.checked = false;
//         }
//     });
// });

// const openForm = () => {
//     document.getElementById("matchForm").classList.remove("hidden");
//     console.log("helloo")
// };

// const closeForm = () => {
//     document.getElementById("matchForm").classList.add("hidden");
//     console.log("fdjsafads")
// };

// document.getElementById("matchButton").addEventListener("click", openForm);
// document.getElementById("submitMatch").addEventListener("click", closeForm);

// Functie om het formulier te openen en de animatie toe te voegen







// const openForm = () => {
//     const matchForm = document.getElementById("matchForm");
//     const matchWithJob = document.getElementById("matchWithJob");

//     matchForm.classList.remove("hidden");
//     matchWithJob.classList.add("animateShadow");

//     // Schakel alle radio buttons in matchOption2 in
//     const radioButtonsToEnable = document.querySelectorAll('#matchOption2 input');
//     radioButtonsToEnable.forEach(radioButton => {
//         radioButton.disabled = false;
//     });
// };

// // Functie om het formulier te sluiten en de animatie te verwijderen
// const closeForm = () => {
//     const matchForm = document.getElementById("matchForm");
//     const matchWithJob = document.getElementById("matchWithJob");

//     matchForm.classList.add("hidden");
//     matchWithJob.classList.remove("animateShadow");

// };

// // Event listener voor matchWithJob
// document.getElementById('matchWithJob').addEventListener('click', openForm);

// // Event listener voor matchWithPerson
// document.getElementById('matchWithPerson').addEventListener('click', () => {
//     // Schakel alle radio buttons in matchOption2 uit
//     const radioButtonsToDisable = document.querySelectorAll('#matchOption2 input');
//     radioButtonsToDisable.forEach(radioButton => {
//         radioButton.disabled = true;
//         // Controleer en verwijder de checked status indien nodig
//         if (radioButton.checked) {
//             radioButton.checked = false;
//         }
//     });

// // closeForm(); // Sluit het formulier en verwijder de animatie
// });

// // Event listener voor het openen van het formulier
// document.getElementById("matchButton").addEventListener("click", openForm);

// // Event listener voor het sluiten van het formulier
// document.getElementById("submitMatch").addEventListener("click", closeForm);




// Functie om het formulier te openen en de animatie toe te voegen

// 


// const openForm = () => {
//     const matchForm = document.getElementById("matchForm");
//     const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');

//     // Toon het formulier
//     matchForm.classList.remove("hidden");

//     // Zorg ervoor dat de invoervelden van #matchOption2 zichtbaar zijn
//     matchOption2Inputs.forEach(input => {
//         input.style.opacity = 1;
//         input.disabled = false; // Activeer alle invoervelden
//     });
// };

// const closeForm = () => {
//     const matchForm = document.getElementById("matchForm");

//     // Verberg het formulier
//     matchForm.classList.add("hidden");

//     // Eventuele extra logica voor het sluiten van het formulier kan hier worden toegevoegd
// };

// // Event listener voor het openen van het formulier
// document.getElementById("matchButton").addEventListener("click", openForm);

// // Event listener voor het sluiten van het formulier
// document.getElementById("submitMatch").addEventListener("click", closeForm);

// // Event listener voor matchWithJob
// document.getElementById('matchWithJob').addEventListener('click', () => {
//     openForm(); // Open het formulier
//     const matchOption2Labels = document.querySelectorAll('#matchOption2 label');
//     const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');
    
//     // Voeg schaduwanimatie toe aan labels en invoervelden van #matchOption2
//     matchOption2Labels.forEach(label => {
//         label.classList.add("animateShadow");
//     });
//     matchOption2Inputs.forEach(input => {
//         input.classList.add("animateShadow");
//     });
// });

// // Event listener voor matchWithPerson
// document.getElementById('matchWithPerson').addEventListener('click', () => {
//     const matchOption2Labels = document.querySelectorAll('#matchOption2 label');
//     const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');
    
//     // Verwijder schaduwanimatie van labels en invoervelden van #matchOption2
//     matchOption2Labels.forEach(label => {
//         label.classList.remove("animateShadow");
//     });
//     matchOption2Inputs.forEach(input => {
//         input.classList.remove("animateShadow");
//     });
// });

const openForm = () => {
    const matchForm = document.getElementById("matchForm");
    const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');
    const matchOption2Labels = document.querySelectorAll('#matchOption2 label');

    // Verberg de matchOption2 invoervelden en labels en maak ze niet klikbaar
    matchOption2Inputs.forEach(input => {
        input.style.opacity = 0.5; // Maak de invoervelden minder helder
        input.disabled = true; // Maak de invoervelden niet klikbaar
    });
    matchOption2Labels.forEach(label => {
        label.style.opacity = 0.5; // Maak de labels minder helder
        label.style.pointerEvents = "none"; // Maak de labels niet klikbaar
    });

    // Toon het formulier
    matchForm.classList.remove("hidden");
};

const closeForm = () => {
    const matchForm = document.getElementById("matchForm");

    // Verberg het formulier
    matchForm.classList.add("hidden");
};

// Event listener voor het openen van het formulier
document.getElementById("matchButton").addEventListener("click", openForm);

// Event listener voor het sluiten van het formulier
document.getElementById("submitMatch").addEventListener("click", closeForm);

// Event listener voor matchWithJob
document.getElementById('matchWithJob').addEventListener('click', () => {
    openForm(); // Open het formulier
    const matchOption2Labels = document.querySelectorAll('#matchOption2 label');
    const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');
    
    // Maak de matchOption2 invoervelden en labels beter zichtbaar en voeg de schaduwanimatie toe
    matchOption2Inputs.forEach(input => {
        input.style.opacity = 1; // Maak de invoervelden zichtbaar
        input.disabled = false; // Activeer de invoervelden
    });
    matchOption2Labels.forEach(label => {
        label.style.opacity = 1; // Maak de labels zichtbaar
        label.style.pointerEvents = "auto"; // Maak de labels klikbaar
        label.classList.add("animateShadow"); // Voeg schaduwanimatie toe
    });
});

// Event listener voor matchWithPerson
document.getElementById('matchWithPerson').addEventListener('click', () => {
    const matchOption2Labels = document.querySelectorAll('#matchOption2 label');
    const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');
    
    // Maak de matchOption2 invoervelden en labels minder zichtbaar en verwijder de schaduwanimatie
    matchOption2Inputs.forEach(input => {
        input.style.opacity = 0.5; // Maak de invoervelden minder zichtbaar
        input.disabled = true; // Maak de invoervelden niet klikbaar
    });
    matchOption2Labels.forEach(label => {
        label.style.opacity = 0.5; // Maak de labels minder zichtbaar
        label.style.pointerEvents = "none"; // Maak de labels niet klikbaar
        label.classList.remove("animateShadow"); // Verwijder schaduwanimatie
    });
});

