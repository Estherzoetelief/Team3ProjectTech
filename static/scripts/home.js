document.addEventListener('DOMContentLoaded', init);

function init() {
  initTiltableImage();
  initNavbarSparkles();
  if (document.querySelector('.gridContainer')) {
    loadImagesFromUnsplash();
  }
  if (document.querySelector('.detailContainer')) {
    displaySelectedImage();
  }
}

function initTiltableImage() {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseleave', resetImageTransform);

  function handleMouseMove(e) {
    const tiltableImage = document.getElementById('tiltable-image');
    if (!tiltableImage) return;

    const {left, top, width, height} = tiltableImage.getBoundingClientRect();
    const offsetX = e.clientX - left - width / 2;
    const offsetY = e.clientY - top - height / 2;
    const rotateY = offsetX / (width / 2) * 4;
    const rotateX = -(offsetY / (height / 2) * 4);

    tiltableImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function resetImageTransform() {
    const tiltableImage = document.getElementById('tiltable-image');
    if (tiltableImage) {
      tiltableImage.style.transform = 'rotateX(0) rotateY(0)';
    }
  }
}

function initNavbarSparkles() {
  const navbar = document.querySelector('.navbar');
  let intervalId = null;
  let mouseX = 0;
  let mouseY = 0;

  navbar.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  navbar.addEventListener('mouseenter', () => {
    if (!intervalId) {
      intervalId = setInterval(generateSparkles, 100);
    }
  });

  navbar.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
    intervalId = null;
  });

  function generateSparkles() {
    const sparkleCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < sparkleCount; i++) {
      createSparkle(mouseX, mouseY);
    }
  }
}

function createSparkle(x, y) {
  const sparkle = document.createElement('img');
  sparkle.src = 'img/sparkle.png';
  sparkle.className = 'sparkleAnimation';
  const offsetX = (Math.random() - 0.5) * 20;
  const offsetY = (Math.random() - 0.5) * 20;
  sparkle.style.left = `${x + offsetX}px`;
  sparkle.style.top = `${y + offsetY}px`;
  const size = Math.random() * 14 + 2;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  document.body.appendChild(sparkle);
}

function loadImagesFromUnsplash() {
  const accessKey = 'YHY6AD1IXNzfiQwP0-SIapADHBsMZJN85xbx_dHtZK4';
  const count = 30;
  const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector('.gridContainer');
      data.forEach((image) => {
        const figure = document.createElement('figure');
        figure.classList.add('figureContainer');

        const imgElement = document.createElement('img');
        imgElement.src = image.urls.regular;
        imgElement.alt = 'Design Image';
        imgElement.style.cursor = 'zoom-in';
        
        const heartButton = document.createElement('button');
        heartButton.classList.add('heartButton');
        
        figure.appendChild(imgElement);
        figure.appendChild(heartButton);
        container.appendChild(figure);

        imgElement.addEventListener('click', () => {
          window.location.href = `detail?image=${encodeURIComponent(image.urls.regular)}`;
        });

        heartButton.addEventListener('click', function(event) {
          event.stopPropagation();
          animateHeartInNavbar();
      });
      });
    })
    .catch(error => console.error('Error fetching images:', error));
}

function animateHeartInNavbar() {
  const navHeartIcon = document.querySelector('.navRight .heart img');
  if (navHeartIcon) {
      navHeartIcon.classList.add('heartAnimation');

      setTimeout(() => {
          navHeartIcon.classList.remove('heartAnimation');
      }, 400);
}}

function displaySelectedImage() {
  const queryParams = new URLSearchParams(window.location.search);
  const imageUrl = queryParams.get('image');
  if (imageUrl) {
    const tiltableImage = document.getElementById('tiltable-image');
    if (tiltableImage) {
      tiltableImage.src = decodeURIComponent(imageUrl);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const titleHeartIcon = document.querySelector('.titleContainer img');
  const navHeartIcon = document.querySelector('.navRight .heart img');

  if (titleHeartIcon && navHeartIcon) {
      titleHeartIcon.addEventListener('click', () => {

          navHeartIcon.classList.add('heartAnimation');

          setTimeout(() => {
              navHeartIcon.classList.remove('heartAnimation');
          }, 400);
      });
  }
});