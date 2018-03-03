'use strict';

(function () {

  var photoTemplate = document.querySelector('#picture-template').content;
  var photoBlock = document.querySelector('.pictures');
  var filtersField = document.querySelector('.filters');
  var rawPhotos = [];

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

  var onSuccesDownload = function (data) {
    rawPhotos = data;
    renderPhotos(rawPhotos);
    if (filtersField.classList.contains('filters-inactive')) {
      filtersField.classList.remove('filters-inactive');
    }
  };

  window.backend.load(onSuccesDownload, window.backend.error);

  var sortPhotos = function (evt) {
    if (evt.target.type === 'radio') {
      var sortName = evt.target.value;
      window.debounce(function () {
        photoBlock.innerHTML = '';
        var photos = filter[sortName](rawPhotos.slice());
        renderPhotos(photos);
      }, 500);
    }
  };

  var recommendSort = function (photos) {
    return photos;
  };

  var popularSort = function (photos) {
    return photos.sort(function (a, b) {
      return b.likes - a.likes;
    });
  };

  var discussedSort = function (photos) {
    return photos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var randomSort = function (photos) {
    var shuffledArray = [];
    while (photos.length) {
      var index = Math.floor(Math.random() * photos.length);
      var element = photos.splice(index, 1)[0];
      shuffledArray.push(element);
    }
    return shuffledArray;
  };

  var filter = {
    recommend: recommendSort,
    popular: popularSort,
    discussed: discussedSort,
    random: randomSort
  };

  filtersField.addEventListener('click', sortPhotos);

  filtersField.addEventListener('keydown', function (evt) {
    window.util.activationEvent(evt, function () {
      evt.target.click();
    });
  });

})();
