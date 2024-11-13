const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close');
let currentImageIndex = 0;

// API volání pro The Cat API
const API_URL = 'https://api.thecatapi.com/v1/images/search';
const ACCESS_KEY = 'live_meGTd8iqNSs66lsrQ8W3DlkyiacPCqZAzslpNhUdi3zrpU7By4Vcu749mexwlTxY';

// Funkce pro načítání obrázků koček
async function loadImages(page = 1, limit = 20) {
    const response = await fetch(`${API_URL}?limit=${limit}&page=${page}`, {
        headers: {
            'x-api-key': ACCESS_KEY
        }
    });
    const data = await response.json();

    data.forEach((imageData, index) => {
        const img = document.createElement('img');
        img.src = imageData.url;
        img.alt = "Obrázek kočky";
        img.dataset.index = currentImageIndex++;
        
        img.addEventListener('click', () => {
            openModal(img.src, "Obrázek kočky");
        });

        gallery.appendChild(img);
    });
}

// Otevře modální okno s obrázkem v plné velikosti
function openModal(src, alt) {
    modal.style.display = 'block';
    modalImg.src = src;
    captionText.innerHTML = alt;
}

// Zavře modální okno
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Klávesové události pro navigaci mezi obrázky
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowRight') navigateImage(1);
        if (e.key === 'ArrowLeft') navigateImage(-1);
    }
});

// Funkce pro navigaci mezi obrázky v modálním okně
function navigateImage(direction) {
    const images = document.querySelectorAll('#gallery img');
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    const img = images[currentImageIndex];
    openModal(img.src, "Obrázek kočky");
}

// Nekonečný scroll pro načítání dalších obrázků
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadImages(Math.floor(currentImageIndex / 10) + 1);
    }
});

// Načte úvodní obrázky
loadImages();
