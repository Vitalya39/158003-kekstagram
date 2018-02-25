'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture-template').content;
  var photoBlock = document.querySelector('.pictures');

  var createPhotoElement = function (photo) {
    var photoElement = photoTemplate.querySelector('.picture').cloneNode(true);
    photoElement.querySelector('.picture img').src = photo.url;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.galleryMain.renderMainPhoto(photo);
      window.galleryMain.openOverlay();
    });
    return photoElement;
  };

  var renderPhotos = function (photos) {
    var photoFragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      photoFragment.appendChild(createPhotoElement(photos[i]));
    }
    photoBlock.appendChild(photoFragment);
  };

  var onSuccesdownload = function (data) {
    renderPhotos(data);
  };

  window.backend.load(onSuccesdownload, window.backend.error);

})();
