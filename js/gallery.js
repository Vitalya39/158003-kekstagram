'use strict';

(function () {
  var overlay = document.querySelector('.gallery-overlay');
  var closeOverlayButton = overlay.querySelector('.gallery-overlay-close');
  var photoTemplate = document.querySelector('#picture-template').content;

  var createPhotoElement = function (photo) {
    var photoElement = photoTemplate.querySelector('.picture').cloneNode(true);
    photoElement.querySelector('.picture img').src = photo.url;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      renderMainPhoto(photo);
      openOverlay();
    });
    return photoElement;
  };

  var photoBlock = document.querySelector('.pictures');

  var renderPhotos = function (photos) {
    var photoFragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      photoFragment.appendChild(createPhotoElement(photos[i]));
    }
    return photoFragment;
  };

  var photos = window.createPhotos(window.util.PHOTOS_QUANTITY);
  photoBlock.appendChild(renderPhotos(photos));

  var renderMainPhoto = function (photo) {
    overlay.querySelector('.gallery-overlay-image').src = photo.url;
    overlay.querySelector('.likes-count').textContent = photo.likes;
    overlay.querySelector('.comments-count').textContent = photo.comments.length;
    closeOverlayButton.addEventListener('click', function () {
      closeOverlay();
    });
    closeOverlayButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        closeOverlay();
      }
    });
  };

  var openOverlay = function () {
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', closeOverlayOnEsc);
  };

  var closeOverlay = function () {
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', closeOverlayOnEsc);
  };

  var closeOverlayOnEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeOverlay();
    }
  };
})();
