/* eslint-disable no-unused-vars */
function lightboxFactory (data) {
  const { title, image, video } = data;

  const picture = `assets/images/${image}`;
  const videos = `assets/videos/${video}`;

  function getLightBoxMediaDOM () {
    const slide = document.createElement('div');
    slide.classList.add('mySlides');

    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty('image')) {
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', title);
      img.setAttribute('aria-label', title);
      img.setAttribute('tabindex', '0');
      slide.appendChild(img);
    } else {
      const videoFile = document.createElement('video');
      const sourceFile = document.createElement('source');
      sourceFile.setAttribute('src', videos);
      videoFile.setAttribute('controls', '');
      videoFile.setAttribute('aria-label', title);
      videoFile.setAttribute('tabindex', '0');
      videoFile.appendChild(sourceFile);
      slide.appendChild(videoFile);
    }

    const p = document.createElement('p');
    p.textContent = title;

    slide.appendChild(p);

    return (slide);
  }
  return { title, picture, video, getLightBoxMediaDOM };
}
