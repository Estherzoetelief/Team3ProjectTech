


// hover en button waarmee je extra tekst kan zien voor over de foto 
// // js for navbar

// const discover_text = document.getElementById("discover_p");
// const jobs_text = document.getElementById("jobs_p");

// discover_text.addEventListener("mouseover", () => {
//     console.log('discover is ontdekt')
//     document.getElementById("underline_nav").style.opacity = "1";
//     document.getElementById("underline_nav").style.marginLeft = "1.45em";
// });


// jobs_text.addEventListener("mouseover", () => {
//     console.log('jobs is ontdekt')
//     document.getElementById("underline_nav").style.opacity = "1";
//     document.getElementById("underline_nav").style.marginLeft = "9em";
    
// });


// document.addEventListener('DOMContentLoaded', function() {
//     const sparkleElement = document.getElementById('sparkle-element');
//     sparkleElement.addEventListener('mousemove', function(e) {
//         createSparkle(e);
//     });
// });

// function createSparkle(e) {
//     const sparkle = document.createElement('div');
//     sparkle.classList.add('sparkle');
//     sparkle.style.left = e.pageX + 'px';
//     sparkle.style.top = e.pageY + 'px';
//     document.body.appendChild(sparkle);
//     setTimeout(() => {
//         sparkle.remove();
//     }, 1000);
// }


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

  
  
const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

const filterItems = e => {
    document.querySelector('.active-btn').classList.remove('active-btn');
    e.target.classList.add('active-btn');
  
    const category = e.target.dataset.name;
  
    allFilterItems.forEach( item => {
        item.classList.add('hide');
  
        if(category === 'all' || item.dataset.category === category){
            item.classList.remove('hide');
        }
    });
};

allFilterBtns.forEach(btn => btn.addEventListener('click', filterItems));

//  function radioButton zorgt ervoor dat het de omcirclde weghaald 
// matchOption2Inputs.forEach(radioButton => {
//     radioButton.disabled = true;
    
//     if (radioButton.checked)
//     { radioButton.checked = false; }
// });





// // popup upload multer multiple mike
// document.addEventListener('DOMContentLoaded', function () {
//     const uploadForm = document.getElementById('uploadForm');
//     const successPopup = document.getElementById('successPopup');

//     uploadForm.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const formData = new FormData(uploadForm);

//         fetch('/upload', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => {
//             if (response.ok) {
//                 successPopup.style.display = 'block';
//             }
//         })
//         .catch(error => console.error('Error uploading file:', error));
//     });
// });


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
