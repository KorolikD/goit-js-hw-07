import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarcup = createGalletyItemMarcup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarcup);

galleryContainer.addEventListener('click', onGalleryImageClick);

function createGalletyItemMarcup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
    </a>
    </div>
    `;
    })
    .join('');
}

function onGalleryImageClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  const bigImage = e.target.dataset.source;

  openImage(bigImage);
}

function openImage(image) {
  function onEscPress(e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  }

  const instance = basicLightbox.create(
    `
    <img src="${image}">
`,
    {
      onShow: instance => {
        document.addEventListener('keydown', onEscPress);
      },
      onClose: instance => {
        document.removeEventListener('keydown', onEscPress);
      },
    }
  );

  instance.show();
}
