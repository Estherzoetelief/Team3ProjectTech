
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