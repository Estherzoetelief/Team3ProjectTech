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





// button veranderen naar js 

// function workClick() {
//     button.style.left = '0'
//     // work.classList.toggle('workVisible')
//     elementJobs.style.display = 'none';
//     elementWork.style.display = 'block';
// }
// function jobsClick() {
//    button.style.left = '5em';
//    console.log("hallo");
//     elementJobs.style.display = 'block';
//     elementWork.style.display = 'none';
// }