const button = document.getElementById('animationButton')
const elementJobs = document.getElementById("jobsElement")
const elementWork = document.getElementById("workElement")
const buttonJobs = document.getElementById("buttonJobs2")
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