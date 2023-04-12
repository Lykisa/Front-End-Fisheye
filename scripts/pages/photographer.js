/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
// Mettre le code JavaScript lié à la page photographer.html
const json = '../data/photographers.json';

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const idPhotographer = urlParams.get('id');

async function getMedias () {
  const medias = await fetch(json)
    .then((resp) => resp.json())
    .then((json) => json.media);
  const media = medias.filter(function (media) {
    // eslint-disable-next-line eqeqeq
    if (media.photographerId == idPhotographer) {
      return media;
    }
  });
  return media;
}

async function getPhotographer () {
  const photographers = await fetch(json)
    .then((resp) => resp.json())
    .then((json) => json.photographers);
  const photographer = photographers.filter(function (photographer) {
    if (photographer.id == idPhotographer) {
      return photographer;
    }
  });
  return photographer[0];
}

async function displayPhotographer (photographer) {
  const photographerHeader = document.querySelector('.photograph-header');
  const photographerInfo = document.createElement('div');
  const picture = `assets/photographers/${photographer.portrait}`;

  const h2 = document.createElement('h2');
  h2.textContent = photographer.name;

  const p = document.createElement('p');
  p.textContent = photographer.city + ', ' + photographer.country;

  const p2 = document.createElement('p');
  p2.classList.add('p2');
  p2.textContent = photographer.tagline;

  const img = document.createElement('img');
  img.setAttribute('src', picture);

  photographerHeader.prepend(photographerInfo);
  photographerInfo.appendChild(h2);
  photographerInfo.appendChild(p);
  photographerInfo.appendChild(p2);
  photographerHeader.appendChild(img);

  document.getElementById('contact-me').innerHTML = document.getElementById('contact-me').innerHTML + '<br>' + photographer.name;

  const generalInfo = document.getElementById('general_info');
  const tarif = document.createElement('p');
  tarif.textContent = photographer.price + '€ / jour';
  generalInfo.appendChild(tarif);
}

async function displayData (medias, sortBy = 'popularité') {
  const mediaSection = document.createElement('section');
  mediaSection.classList.add('media_section');
  const main = document.querySelector('main');
  const mySlides = document.querySelector('#lightbox-content');

  let num = 1;

  switch (sortBy) {
    case 'popularité':
      medias.sort((a, b) => b.likes - a.likes);
      break;
    case 'date':
      medias.sort(function (a, b) {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
      break;
    case 'titre':
      medias.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      break;

    default:
      break;
  }

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM(num++);
    mediaSection.appendChild(mediaCardDOM);

    /* adapté a la lightbox */
    const lightboxModel = lightboxFactory(media);
    const lightboxCardDOM = lightboxModel.getLightBoxMediaDOM();
    mySlides.appendChild(lightboxCardDOM);
  });
  main.appendChild(mediaSection);
}

async function changeFilter (event) {
  const sortBy = event.target.value;
  document.querySelector('.media_section').remove();
  document.querySelector('#lightbox-content').innerHTML = `
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a> `;
  document.querySelector('.likesNumberTotal span').innerHTML = '0';
  const medias = await getMedias();
  displayData(medias, sortBy);
}

async function init () {
  const medias = await getMedias();
  const photographers = await getPhotographer();
  displayData(medias);
  displayPhotographer(photographers);
}

document.addEventListener('keydown', function (event) {
  if (event.key == 'Escape') {
    closeModal();
    closeModalMedia();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    plusSlides(-1);
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    plusSlides(1);
  }
});

init();
