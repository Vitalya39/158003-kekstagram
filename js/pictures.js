'use strict';

var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTOS_QUANTITY = 25;
var ESC_KEYCODE = 27;

// получить случайное число от min до max
var getRandomNum = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// получить случайный комментарий
var getComments = function (commentsQuantity) {
  var comments = [];
  for (var i = 0; i < commentsQuantity; i++) {
    var comment = getRandomNum(0, COMMENTS.length);
    comments.push(COMMENTS[comment]);
  }
  return comments;
};

// 1. создать массив с объектами
var createPhotos = function (quantity) {
  var photos = [];
  for (var i = 0; i < quantity; i++) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNum(15, 200),
      comments: getComments(getRandomNum(1, 2))
    };
    photos.push(photo);
  }
  return photos;
};

// 2. создаем DOM-элементы на основе pictures-template
var photoTemplate = document.querySelector('#picture-template').content;

var createPhotoElement = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture img').src = photo.url;
  photoElement.querySelector('.picture-likes').textContent = photo.likes;
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
  return photoElement;
};

// 3.отрисуем DOM-элементы в блок .pictures c помощью DocumentFragment
var photoBlock = document.querySelector('.pictures'); // блок для вставки

var renderPhotos = function (photos) {
  var photoFragment = document.createDocumentFragment(); // фрагмент для вставки
  for (var i = 0; i < photos.length; i++) {
    photoFragment.appendChild(createPhotoElement(photos[i]));
  }
  return photoFragment;
};

var photos = createPhotos(PHOTOS_QUANTITY);
photoBlock.appendChild(renderPhotos(photos));

// 4.покажем элемент gallery-overlay
// document.querySelector('.gallery-overlay').classList.remove('hidden');

var renderMainPhoto = function (photo) {
  var gallery = document.querySelector('.gallery-overlay');
  gallery.querySelector('.gallery-overlay-image').src = photo.url;
  gallery.querySelector('.likes-count').textContent = photo.likes;
  gallery.querySelector('.comments-count').textContent = photo.comments.length;
};

// и заполним его данными из первого элемента массива
renderMainPhoto(photos[0]);

//  MODULE4-TASK1

// Открытие и закрытие окна редактирования изображений ==============

var fileInput = document.querySelector('#upload-file'); //  поле выбора файла
var editImageOverlay = document.querySelector('.upload-overlay'); // форма редактирования
var closeImageOverlay = editImageOverlay.querySelector('#upload-cancel');

//  при наступлении события change покажем форму редактирования
fileInput.addEventListener('change', function () {
  editImageOverlay.classList.remove('hidden');
});

//  закроем форму редактирования нажатием на #upload-cancel
closeImageOverlay.addEventListener('click', function () {
  editImageOverlay.classList.add('hidden');
  editImageOverlay.reset();
});

// эффекты ==============
var imagePreview = document.querySelector('.effect-image-preview'); // изображение
var size = document.querySelector('.upload-resize-controls-value'); // поле для изменения, должно измениться при нажатии на кнопки
var sizeInc = document.querySelector('.upload-resize-controls-button-inc'); // кнопка плюс
var sizeDec = document.querySelector('.upload-resize-controls-button-dec'); // кнопка минус

// напишем функцию для изменения размера
var imagePreviewScale = function () {
  var commonValue = parseInt(size.value, 10); // находим текущее значение
  var scale = commonValue / 100; // делим его на 100
  imagePreview.style.transform = 'scale(' + scale + ')'; // добавляем это значение в img
};

// добавим обработчик события на sizeIncrese
sizeInc.addEventListener('click', function () {
  increaseSize();
});

// напишем функцию для увелечения изображения
var increaseSize = function () {
  var commonValue = parseInt(size.value, 10);
  size.value = commonValue + 25 + '%';
  if (parseInt(size.value, 10) > 100) {
    size.value = 100 + '%';
  }
  imagePreviewScale();
};

// добавим обработчик события на sizeDecrese
sizeDec.addEventListener('click', function () {
  decreseSize();
});

// напишем функцию для уменьшения изображения
var decreseSize = function () {
  var commonValue = parseInt(size.value, 10);
  size.value = commonValue - 25 + '%';
  if (parseInt(size.value, 10) < 0) {
    size.value = 0 + '%';
  }
  imagePreviewScale();
};
