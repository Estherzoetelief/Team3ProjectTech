
// ------------------
// CODE JS voor Nabvar
// ------------------

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



// ------------------
// ------------------
// --einde navbar deel--
// ------------------
// ------------------
