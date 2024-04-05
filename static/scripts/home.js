// ----------------------
// DISCOVER & DETAIL PAGE
// ----------------------
const init = () => {
  tiltableImage();
  spraklesInNavbar();
  if (document.querySelector('.gridContainer')) {
    loadImages();
  }
  if (document.querySelector('.detailContainer')) {
    displaySelectedImage();
    changeHeartIcon();
  }
};

// Sparkle effect
const spraklesInNavbar = () => {
  const navbar = document.querySelector('.navCenter');
  let intervalId = null;
  let mouseX = 0;
  let mouseY = 0;

  navbar.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  navbar.addEventListener('mouseenter', () => {
    if (!intervalId) {
      intervalId = setInterval(multipleSparkles, 100);
    }
  });

  navbar.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
    intervalId = null;
  });

  const multipleSparkles = () => {
    const sparkleCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < sparkleCount; i++) {
      singleSparkle(mouseX, mouseY);
    }
  };
};

const singleSparkle = (x, y) => {
  const sparkle = document.createElement('img');
  sparkle.src = 'sparkle.png';
  sparkle.className = 'sparkleAnimation';
  const offsetX = (Math.random() - 0.5) * 20;
  const offsetY = (Math.random() - 0.5) * 20;
  sparkle.style.left = `${x + offsetX}px`;
  sparkle.style.top = `${y + offsetY}px`;
  const size = Math.random() * 14 + 2;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  document.body.appendChild(sparkle);
};

// API images
const loadImages = () => {
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
        imgElement.alt = 'Project Image';

        // imgElement.addEventListener('click', () => {
        //   window.location.href = `detail.html?image=${encodeURIComponent(imgElement.src)}`;
        // });

        const titleElement = document.createElement('div');
        titleElement.classList.add('imageTitle');
        titleElement.textContent = 'Title Project'; 
        figure.appendChild(imgElement);
        figure.appendChild(titleElement);

        const heartButton = document.createElement('button');
        heartButton.classList.add('heartButton');
        heartButton.style.background = 'url("img/heart.png") no-repeat center';
        heartButton.style.backgroundSize = '24px';

        figure.appendChild(heartButton);
        container.appendChild(figure);

        figure.addEventListener('click', (event) => {
          if (event.target !== heartButton) {
            window.location.href = `detail?image=${encodeURIComponent(imgElement.src)}`;
          }
        });

        heartButton.addEventListener('click', function(event) {
          event.stopPropagation();
          this.classList.toggle('selected');
          this.style.background = this.classList.contains('selected') ? 'url("img/heart2.png") no-repeat center' : 'url("img/heart.png") no-repeat center';
          this.style.backgroundSize = '24px';
          wishlistCount();
        });
      });
    })
    .catch(error => console.error('Error fetching images:', error));
};

// Update wishlist
const wishlistCount = () => {
  const selectedHearts = document.querySelectorAll('.heartButton.selected, .detailHeart.selected').length;
  document.getElementById('wishlistCount').textContent = selectedHearts;
};

// Hamburger menu
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.navbar button');
  const sideMenu = document.querySelector('.mobileMenu');

  menuToggle.addEventListener('click', (e) => {
    sideMenu.classList.toggle('open');
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target) && sideMenu.classList.contains('open')) {
      sideMenu.classList.remove('open');
    }
  });
});

// Detail image
const displaySelectedImage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const imageUrl = queryParams.get('image');
  if (imageUrl) {
    const tiltableImage = document.getElementById('tiltableImage');
    if (tiltableImage) {
      tiltableImage.src = decodeURIComponent(imageUrl);
    }
  }
};

// 3D tilt effect
const tiltableImage = () => {
  const handleMouseMove = (e) => {
    const tiltableImage = document.getElementById('tiltableImage');
    if (!tiltableImage) return;

    const {left, top, width, height} = tiltableImage.getBoundingClientRect();
    const offsetX = e.clientX - left - width / 2;
    const offsetY = e.clientY - top - height / 2;
    const rotateY = offsetX / (width / 2) * 4;
    const rotateX = -(offsetY / (height / 2) * 4);

    tiltableImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetImage = () => {
    const tiltableImage = document.getElementById('tiltableImage');
    if (tiltableImage) {
      tiltableImage.style.transform = 'rotateX(0) rotateY(0)';
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseleave', resetImage);
};

const changeHeartIcon = () => {
  const detailHeartIcon = document.querySelector('.detailHeart');

  if (detailHeartIcon) {
    detailHeartIcon.addEventListener('click', function(event) {
      event.preventDefault();
      this.src = this.src.includes('img/heart.png') ? 'heart2.png' : 'img/heart.png';
      this.classList.toggle('selected');
      wishlistCount();
    });
  }
};

document.addEventListener('DOMContentLoaded', init);