/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function mediaFactory (data) {
  const { title, image, video, likes } = data;

  const picture = `assets/images/${image}`;
  const videos = `assets/videos/${video}`;

  function getMediaCardDOM (n) {
    const article = document.createElement('article');

    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty('image')) {
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', title);
      img.setAttribute('tabindex', '0');
      img.classList.add('media');
      article.appendChild(img);
      img.addEventListener('click', () => {
        showSlides(n);
        openModal();
      });

      img.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          showSlides(n);
          openModal();
        }
      });
    } else {
      const videoFile = document.createElement('video');
      const sourceFile = document.createElement('source');
      sourceFile.setAttribute('src', videos);
      videoFile.classList.add('media');
      videoFile.setAttribute('tabindex', '0');
      videoFile.appendChild(sourceFile);
      article.appendChild(videoFile);
      videoFile.addEventListener('click', () => {
        showSlides(n);
        openModal();
      });

      videoFile.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          showSlides(n);
          openModal();
        }
      });
    }

    const mediaInfoDiv = document.createElement('div');
    mediaInfoDiv.classList.add('mediaInfoDiv');

    const p = document.createElement('p');
    p.textContent = title;

    const likesInfo = document.createElement('div');
    likesInfo.classList.add('likesInfo');

    const likesNumber = document.createElement('p');
    likesNumber.classList.add('likesNumber');
    likesNumber.textContent = likes;

    const likesHeart = document.createElement('i');
    likesHeart.classList.add('likesHeart');
    likesHeart.classList.add('fa-regular');
    likesHeart.classList.add('fa-heart');
    likesHeart.setAttribute('tabindex', '0');

    const totalLikes = document.querySelector('.likesNumberTotal span');
    const newTotalLikes = parseInt(totalLikes.innerHTML) + parseInt(likes);
    totalLikes.innerHTML = newTotalLikes;

    likesHeart.addEventListener('click', manageLike);
    likesHeart.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        manageLike(event);
      }
    });

    function manageLike (event) {
      const likesBtn = event.target;
      const classes = likesBtn.classList;

      let likesNb = 0;
      if (classes.contains('fa-regular')) {
        likesNb = parseInt(likesNumber.innerHTML) + 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
        likesBtn.classList.replace('fa-regular', 'fa-solid');
      } else {
        likesNb = parseInt(likesNumber.innerHTML) - 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
        likesBtn.classList.replace('fa-solid', 'fa-regular');
      }
      likesNumber.innerHTML = likesNb;
    }

    article.appendChild(mediaInfoDiv);
    mediaInfoDiv.appendChild(p);
    mediaInfoDiv.appendChild(likesInfo);
    likesInfo.appendChild(likesNumber);
    likesInfo.appendChild(likesHeart);

    return (article);
  }
  return { title, picture, video, getMediaCardDOM };
}
