'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture-template').content;
  var photoBlock = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
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
    if (filters.classList.contains('filters-inactive')) {
      filters.classList.remove('filters-inactive');
    }
  };

  window.backend.load(onSuccesdownload, window.backend.error);

  // ------------------------------ СОРТИРОВКА ------------------------------
  // найдем кнопки по клику на которые будет меняться сортировка изображений
  var recommend = document.querySelector('#filter-recommend');
  var popular = document.querySelector('#filter-popular');
  var discussed = document.querySelector('#filter-discussed');
  var random = document.querySelector('#filter-random');

  recommend.addEventListener('click', function () {
    window.setTimeout(function () {
      photoBlock.innerHTML = '';
      renderPhotos(photosData);
    }, 1500);
  });

  var popularSort = function () {
    var photosDataCopy = photosData.slice();
    photosDataCopy.sort(function (a, b) {
      if (a.likes < b.likes) {
        return 1;
      } else if (a.likes > b.likes) {
        return -1;
      } else {
        return b.comments.length - a.comments.length;
      }
    });
    photoBlock.innerHTML = '';
    renderPhotos(photosDataCopy);
  };

  popular.addEventListener('click', function () {
    window.debounce(popularSort, 1500);
  });


  var discussedSort = function () {
    var photosDataCopy = photosData.slice();
    photosDataCopy.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else if (a.comments.length > b.comments.length) {
        return -1;
      } else {
        return b.likes - a.likes;
      }
    });
    photoBlock.innerHTML = '';
    renderPhotos(photosDataCopy);
  };

  discussed.addEventListener('click', function () {
    window.debounce(discussedSort, 1500);
  });

  // var randomSort = function () {
  //   var photosDataCopy = photosData.slice();
  //   photosDataCopy.sort(function () {
  //     return Math.random() - 0.5;
  //   });
  //   photoBlock.innerHTML = '';
  //   renderPhotos(photosDataCopy);
  // };

  var randomSort2 = function () {
    var photosDataCopy = photosData.slice();
    for (var i = photosDataCopy.length - 1; i > 0; i--) {
      var num = Math.floor(Math.random() * (i + 1));
      var d = photosDataCopy[num];
      photosDataCopy[num] = photosDataCopy[i];
      photosDataCopy[i] = d;
    }
    photoBlock.innerHTML = '';
    renderPhotos(photosDataCopy);
  };

  random.addEventListener('click', function () {
    window.debounce(randomSort2, 1500);
  });

})();
