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
      }, 1500);
    }
  };

  var recommendSort = function (data) {
    return data;
  };

  var popularSort = function (data) {
    data.sort(function (a, b) {
      if (a.likes < b.likes) {
        return 1;
      } else if (a.likes > b.likes) {
        return -1;
      } else {
        return b.comments.length - a.comments.length;
      }
    });
    return data;
  };

  var discussedSort = function (data) {
    data.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else if (a.comments.length > b.comments.length) {
        return -1;
      } else {
        return b.likes - a.likes;
      }
    });
    return data;
  };

  var randomSort = function (data) {
    for (var i = data.length - 1; i > 0; i--) {
      var num = Math.floor(Math.random() * (i + 1));
      var d = data[num];
      data[num] = data[i];
      data[i] = d;
    }
    return data;
  };

  var filter = {
    recommend: recommendSort,
    popular: popularSort,
    discussed: discussedSort,
    random: randomSort
  };

  filtersField.addEventListener('click', sortOnClick);

})();
