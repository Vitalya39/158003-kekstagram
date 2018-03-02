'use strict';

(function () {

  var photoTemplate = document.querySelector('#picture-template').content;
  var photoBlock = document.querySelector('.pictures');
  var filtersField = document.querySelector('.filters');
  var photosData = [];

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
    photosData = data;
    renderPhotos(data);
    if (filtersField.classList.contains('filters-inactive')) {
      filtersField.classList.remove('filters-inactive');
    }
  };

  window.backend.load(onSuccesdownload, window.backend.error);

  var sortOnClick = function (evt) {
    if (evt.target.type === 'radio') {
      var sortName = evt.target.value;
      var photosDataCopy = photosData.slice();
      window.debounce(function () {
        photoBlock.innerHTML = '';
        var data = filter[sortName](photosDataCopy);
        renderPhotos(data);
      }, 500);
    }
  };

  var recommendSort = function (data) {
    return data;
  };

  var popularSort = function (data) {
    return data.sort(function (a, b) {
      return b.likes - a.likes;
    });
  };

  var discussedSort = function (data) {
    return data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var randomSort = function (data) {
    var shuffledArray = [];
    while (data.length) {
      var index = Math.floor(Math.random() * data.length);
      var element = data.splice(index, 1)[0];
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

  filtersField.addEventListener('click', sortOnClick);

  filtersField.addEventListener('keydown', function (evt) {
    window.util.activationEvent(evt, function () {
      evt.target.click();
    });
  });

})();
