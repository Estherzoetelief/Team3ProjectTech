
// // const button = document.getElementById('animationButton');
// // const elementJobs = document.getElementById("jobsElement");
// // const elementWork = document.getElementById("workElement");
// // const buttonJobs = document.getElementById("buttonJobs");
// // const buttonWork = document.getElementById("buttonWork");

// // const workClick = () => {
// //     button.style.left = '0';
// //     elementJobs.style.display = 'none';
// //     elementWork.style.display = 'block';
// // };

// // const jobsClick = () => {
// //     button.style.left = '5em';
// //     console.log("hallo");
// //     elementJobs.style.display = 'block';
// //     elementWork.style.display = 'none';
// // };

// // buttonJobs.addEventListener("click", jobsClick);
// // buttonWork.addEventListener("click", workClick);



// const elementJobs = document.getElementById("jobsElement");
// const elementWork = document.getElementById("workElement");
// const button = document.getElementById('animationButton');
// const buttonJobs = document.getElementById("buttonJobs");
// const buttonWork = document.getElementById("buttonWork");
// const divContainer = document.querySelector(".animationSlide");
// let origineleScrollPositie = 0;

// const workClick = () => {
//     button.style.left = '0';

// button.style.left = '0';
// divContainer.behavior = "smooth";
// divContainer.scrollLeft = origineleScrollPositie; // Terug naar de oorspronkelijke positie scrollen
// console.log("Hallo");
//     // elementJobs.classList.add('hidden');
// };

// const jobsClick = () => {
// //     button.style.left = '5em';
// //     // divContainer.classList.add('moveJobs');
// //     // console.log("tesdjsklfjasdklfa;jsjt")
// // //  divContainer.scrollright = ;
// // divContainer.scrollLeft += 1400;
// // // .animationSlide = divContainer;
// //   console.log("doei");
// button.style.left = '5em';
// origineleScrollPositie = divContainer.scrollLeft;
// // divContainer.behavior = "smooth"; 
// // Opslaan van de oorspronkelijke scrollpositie
// divContainer.scrollLeft +=  elementWork.offsetWidth; // Scrollen naar rechts
// console.log(elementWork.offsetWidth);

//     // elementJobs.classList.remove('hidden');
// };

// buttonJobs.addEventListener("click", jobsClick);
// buttonWork.addEventListener("click", workClick);


// // hover en button waarmee je extra tekst kan zien voor over de foto 

// const tekstPortfolio = document.querySelectorAll('.work section > figure > section:nth-of-type(2)')
// const figurePortfolio = document.querySelectorAll('.work section > figure')
// const buttonTekstPortfolio = document.querySelectorAll('section figure .hide button')

// buttonTekstPortfolio.forEach((button, index) => {
//     button.addEventListener("click", () => {
//         tekstPortfolio[index].style.display = 'block'
//     })
// })
// // hier zorgt het ervoor dat als je met je muis van de figure afgaat hij na 1 seconde weer verdwijnt
// figurePortfolio.forEach((figure, index) => {
//     figure.addEventListener('mouseleave', () => {
//         setTimeout(() => {
//             tekstPortfolio[index].style.display = 'none'
//         }, 1000)
//     })

// })



// // variable voor de match knop

// const matchForm = document.getElementById("matchForm");
// const matchOption2Labels = document.querySelectorAll('#matchOption2 label');
// const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');
// const matchOption2Section = document.getElementById("matchOption2")
// const backgroundBlurForMatchBtn = document.querySelector('.popUpBlur')


// const updateBackgroundHeightMatchForm = () => {
//     const matchFormHeight = matchForm.scrollHeight;
//     // Hoogte van de inhoud
//        matchForm.style.height = `${matchFormHeight}px`; // Pas de hoogte van de achtergrond aan
//    };
// // functie om het formulier te openen en zorgen dat niet alles beschikbaar is eerst
// const openMatchForm = () => {
//     // matchForm.classList.add("hidden");
//     matchForm.classList.remove("inactiveAnimationForm");
//     matchForm.classList.add("activeAnimationForm");
//     console.log("matchFormactive");

//     matchOption2Section.classList.add("hiddenMatchOption2");
//     // backgroundBlurMatchButton.classList.add('visable')
//     //  matchOption2Section.classList.add('active');
//     backgroundBlurForMatchBtn.classList.add('activeForbackgroundBlurBtn')
//     console.log('backgroundBlurMatchButton')
    
//     // matchOption2Inputs.forEach(inputForMatchOption2 => {
//     //     inputForMatchOption2.disabled = true;
//     //     //     inputForMatchOption2.classList.add('hiddenMatchOption2')
//     //     console.log("yaya1")
//     // });
//     // matchOption2Labels.forEach(labelForMatchOption2 => {
//     //     labelForMatchOption2.classList.add("matchOption2-disabled");
//     //     labelForMatchOption2.classList.add("hiddenMatchOption2")
//     //     console.log("yaya2")
//     // });


// };
// // functie om het formulier te sluiten
// const closeMatchForm = () => {
//     // matchForm.classList.add("hidden");
//     backgroundBlurForMatchBtn.classList.remove("activeForbackgroundBlurBtn")
//     matchForm.classList.add("inactiveAnimationForm");
//     matchForm.classList.remove("activeAnimationForm");
// };
// // aanroepen wanneer de functie moet worden uitgevoerd
// document.getElementById("matchButton").addEventListener("click", openMatchForm);
// document.getElementById("submitMatch").addEventListener("click", closeMatchForm);
// document.getElementById("closeMatchFormButton").addEventListener("click", closeMatchForm);
// document.querySelector(".popUpBlur").addEventListener("click",closeMatchForm);
// // document.getElementById("closeMatchFormButton").addEventListener("click", closeMatchForm);


// // functie en aanroeping wat er gebeurt als je op de knop match with job gebeurt
// document.getElementById('matchWithJob').addEventListener('click', () => {
//     updateBackgroundHeightMatchForm ();
//     // openMatchForm();
//     matchOption2Section.classList.add("unhiddenMatchOption2");
//     matchOption2Section.classList.remove("hiddenMatchOption2");
//     matchOption2Inputs.forEach(inputForMatchOption2 => {
//         inputForMatchOption2.disabled = false;
//         inputForMatchOption2.classList.add("option2ForMatchButton")
//         inputForMatchOption2.classList.add("unhiddenMatchOption2");
// console.log("yaya1")
//     });
//     matchOption2Labels.forEach(labelForMatchOption2 => {
//         labelForMatchOption2.classList.remove("matchOption2-disabled");
//         labelForMatchOption2.classList.add("animateShadow");
//         labelForMatchOption2.classList.add("unhiddenMatchOption2");
//         console.log("yaya2")
//     });
// });
// // functie en aanroeping wat er gebeurt als je op de knop match with person gebeurt

// document.getElementById('matchWithPerson').addEventListener('click', () => {
//     // updateBackgroundHeightMatchForm ();
//     matchOption2Section.classList.add("hiddenMatchOption2");
//     matchOption2Section.classList.remove("unhiddenMatchOption2")
//     matchOption2Labels.forEach(labelForMatchOption2 => {
//         labelForMatchOption2.classList.add("matchOption2-disabled");
//         labelForMatchOption2.classList.remove("animateShadow");

//     matchOption2Inputs.forEach(inputForMatchOption2 => {
//             inputForMatchOption2.classList.remove("option2ForMatchButton")
//         })
//         console.log("yaya")
//     });
// });

// // window.addEventListener('DOMContentLoaded', updateBackgroundHeightMatchForm);



// // const MatchButton = document.getElementById('MatchButton')
// // const backgroundBlurMatchButton = document.querySelector('.PopUpBlur')
// // const matchForm = document.getElementById("matchForm");

// // MatchButton.addEventListener('click', () => {
// //     matchForm.style.display = 'block'
// //     backgroundBlurMatchButton.style.display = 'block'
// //     MatchButton.style.display = 'none'

// // })

// var typed = new Typed(".typeWriter", {
//     strings: ["Web developer.", "graphic designer.", "Photographer.", "UX-Designer." , "UI-Designer."],
//     typeSpeed: 150,
//     backSpeed: 120,
//     backDelay: 1000,
//     startDelay: 1000,
//     showCursor: true,
//     cursorChar: "|",
//     loop: true
//   });



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
const elementWork = document.getElementById("workElement");
const button = document.getElementById('animationButton');
const buttonJobs = document.getElementById("buttonJobs");
const buttonWork = document.getElementById("buttonWork");
const divContainer = document.querySelector(".animationSlide");
// let origineleScrollPositie = 0;

const workClick = () => {
    button.style.left = '0';

button.style.left = '0';
elementWork.scrollIntoView({ behavior: 'smooth' }); 
// divContainer.behavior = "smooth";
// divContainer.scrollLeft = origineleScrollPositie; // Terug naar de oorspronkelijke positie scrollen
console.log("Hallo");

};

const jobsClick = () => {
button.style.left = '5em';
// origineleScrollPositie = divContainer.scrollLeft;
elementJobs.scrollIntoView({ behavior: 'smooth' }); 
// divContainer.scrollLeft +=  elementWork.offsetWidth; // Scrollen naar rechts
// console.log(elementWork.offsetWidth);
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
const matchOption2Button = document.querySelectorAll('.option2ForMatchButton');
// const matchOption2Inputs = document.querySelectorAll('#matchOption2 input');
const matchOption2Section = document.getElementById("matchOption2")
const backgroundBlurForMatchBtn = document.querySelector('.popUpBlur')
const matchButtonClick1 = document.querySelectorAll("#matchOption1 > .matchButton")
const matchButtonClick2 = document.querySelectorAll("#matchOption2 > .matchButton")




const updateBackgroundHeightMatchForm = () => {
    const matchFormHeight = matchForm.scrollHeight;
    // Hoogte van de inhoud
       matchForm.style.height = `${matchFormHeight}px + 3em`; // Pas de hoogte van de achtergrond aan
   };
// functie om het formulier te openen en zorgen dat niet alles beschikbaar is eerst
const openMatchForm = () => {
    matchForm.classList.remove("inactiveAnimationForm");
    matchForm.classList.add("activeAnimationForm");
    console.log("matchFormactive");

    matchOption2Section.classList.add("hiddenMatchOption2");
  
    backgroundBlurForMatchBtn.classList.add('activeForbackgroundBlurBtn')
    console.log('backgroundBlurMatchButton')
};
// functie om het formulier te sluiten
const closeMatchForm = () => {
    backgroundBlurForMatchBtn.classList.remove("activeForbackgroundBlurBtn")
    matchForm.classList.add("inactiveAnimationForm");
    matchForm.classList.remove("activeAnimationForm");
};
// aanroepen wanneer de functie moet worden uitgevoerd
document.getElementById("matchButton").addEventListener("click", openMatchForm);
document.getElementById("submitMatch").addEventListener("click", closeMatchForm);
document.getElementById("closeMatchFormButton").addEventListener("click", closeMatchForm);
document.querySelector(".popUpBlur").addEventListener("click",closeMatchForm);





// functie en aanroeping wat er gebeurt als je op de knop match with job gebeurt
document.getElementById('matchWithJob').addEventListener('click', () => {
    updateBackgroundHeightMatchForm ();
    matchOption2Section.classList.add("unhiddenMatchOption2");
    matchOption2Section.classList.remove("hiddenMatchOption2");
    matchOption2Button.forEach(labelForMatchOption2 => {
        labelForMatchOption2.disabled = false;
        labelForMatchOption2.classList.add("option2ForMatchButton")
        labelForMatchOption2.classList.add("unhiddenMatchOption2");
console.log("yaya1")
    });
    matchOption2Button.forEach(labelForMatchOption2 => {
        labelForMatchOption2.classList.remove("matchOption2-disabled");
        labelForMatchOption2.classList.add("animateShadow");
        labelForMatchOption2.classList.add("unhiddenMatchOption2");
        console.log("yaya2")
    });
    
});
// functie en aanroeping wat er gebeurt als je op de knop match with person gebeurt

document.getElementById('matchWithPerson').addEventListener('click', () => {
    matchOption2Section.classList.add("hiddenMatchOption2");
    matchOption2Section.classList.remove("unhiddenMatchOption2")
    matchOption2Button.forEach(labelForMatchOption2 => {
        labelForMatchOption2.classList.add("matchOption2-disabled");
        labelForMatchOption2.classList.remove("animateShadow");

        matchOption2Button.forEach(labelForMatchOption2 => {
            labelForMatchOption2.classList.remove("option2ForMatchButton")
        })
        console.log("yaya")
    });
});

matchButtonClick1.forEach(button => {
    button.addEventListener('click', () => {
        matchButtonClick1.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});

matchButtonClick2.forEach(button => {
    button.addEventListener('click', () => {
        matchButtonClick2.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});
var typed = new Typed(".typeWriter", {
    strings: ["Web developer.", "graphic designer.", "Photographer.", "UX-Designer." , "UI-Designer."],
    typeSpeed: 150,
    backSpeed: 120,
    backDelay: 1000,
    startDelay: 1000,
    showCursor: true,
    cursorChar: "|",
    loop: true
  });

  document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const imagePath = button.dataset.image;
            const confirmation = confirm('Weet je zeker dat je deze afbeelding wilt verwijderen?');

            if (confirmation) {
                try {
                    const response = await fetch(`/delete-image/${imagePath}`, { method: 'DELETE' });
                    if (response.ok) {
                        // Verwijder de afbeelding van de pagina als het verwijderen succesvol is
                        button.closest('figure').remove();
                        alert('Afbeelding succesvol verwijderd');
                    } else {
                        alert('Er is een fout opgetreden bij het verwijderen van de afbeelding');
                    }
                } catch (error) {
                    console.error('Error deleting image:', error);
                    alert('Er is een fout opgetreden bij het verwijderen van de afbeelding');
                }
            }
        });
    });
});