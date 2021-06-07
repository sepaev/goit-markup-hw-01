'use strict'
// export default [
  const defaultExport = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// import defaultExport from "/gallery-items.js";



// создание переменных
const refs = {
  pictures: [...defaultExport],
  galery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  body: document.querySelector('body'),
  closeButton: document.querySelector('button[data-action="close-lightbox"]'),
  changeBigPicture(src, alt) {
    this.lightboxImage.src = src;
    this.lightboxImage.alt = alt;
  },
}



// создание галереи
const createGalery = () => {
  let htmlText = '';
  refs.pictures.map(({ preview, original, description }) => {
    htmlText += `<li class="gallery__item">
                <a
                  class="gallery__link"
                  href="${original}"
                >
                  <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                  />
                </a>
              </li>`
  });
  refs.galery.innerHTML = htmlText;
}
createGalery();



// обрабатываем клик на галерее и открываем модалку
const openModalWindow = (e) => {
  e.preventDefault();
  if (e.target.nodeName != 'IMG') return

  refs.changeBigPicture(e.target.dataset.source, e.target.attributes.alt.nodeValue);
  refs.lightbox.classList.add('is-open');
  refs.body.style.overflow = 'hidden';
}
refs.galery.addEventListener('click', openModalWindow);



// обрабатываем клик на кнопку закрытия или overlay

const closeModalWindow = e => {
  e.preventDefault();
  if (e.target.nodeName === 'IMG') return
  if (!refs.lightbox.classList.contains('is-open')) return
  
  refs.changeBigPicture('', '');
  refs.lightbox.classList.remove('is-open');
  refs.body.style.overflow = 'initial';
}
refs.lightbox.addEventListener('click', closeModalWindow);



// работа с кнопками Escape, ArrowLeft, ArrowRight
const showLeftPicture = () => {
  const prevPicture = [];
  refs.pictures.map((picture, index, array) => {
    if (picture.original === refs.lightboxImage.src) {
      prevPicture.push(index > 0 ? array[index - 1] : array[array.length - 1]);
    };
  });
  refs.changeBigPicture(prevPicture[0].original, prevPicture[0].description);
}

const showRightPicture = () => {
  const prevPicture = [];
  refs.pictures.map((picture, index, array) => {
    if (picture.original === refs.lightboxImage.src) {
      prevPicture.push(index === array.length - 1 ? array[0] : array[index + 1]);
    };
  });
  refs.changeBigPicture(prevPicture[0].original, prevPicture[0].description);
}

document.addEventListener('keydown', (event) => {
  if (!refs.lightbox.classList.contains('is-open')) return

  switch (event.code) {
    case 'Escape':
      closeModalWindow(event);
      break;
    
    case 'ArrowLeft':
      showLeftPicture(event);
      break;
    
    case 'ArrowRight':
      showRightPicture(event);
      break;
  }
});
//refs.closeButton.addEventListener('click', closeModalWindow);// работает и без этого