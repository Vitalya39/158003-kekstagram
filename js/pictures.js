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
var HASHTAG_MAX_LENGTH = 20;
// var ENTER_KEYCODE = 13;

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
// 2+ . добавляем эвентлистенер для открытия изображенияво все окно
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
    overlay.classList.remove('hidden');
  });
  return photoElement;
};

// функция закрытия полноэкранного изображения
var closeOverlay = function () {
  overlay.classList.add('hidden');
  overlay.reset();
};

// добавим обработчики для закрытия полноэкранного изображения на крестик и на esc
closeOverlayButton.addEventListener('click', function () {
  closeOverlay();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
});


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

// 4.функция для показа полноэкранного изображения
var renderMainPhoto = function (photo) {
  overlay.querySelector('.gallery-overlay-image').src = photo.url;
  overlay.querySelector('.likes-count').textContent = photo.likes;
  overlay.querySelector('.comments-count').textContent = photo.comments.length;
};

// и заполним его данными из первого элемента массива
// renderMainPhoto(photos[0]);

//  ========================!!MODULE4-TASK1!!========================

// ============== ОТКРЫТИЕ И ЗАКРЫТИЕ ОКНА РЕДАКТИРОВАНИЯ ==============

var fileInput = document.querySelector('#upload-file'); //  поле выбора файла
var editImageOverlay = document.querySelector('.upload-overlay'); // форма редактирования
var closeImageOverlay = editImageOverlay.querySelector('#upload-cancel');

// напишем функцию для открытия окна редактирования
var openForm = function () {
  editImageOverlay.classList.remove('hidden');
};

// напишем функцию для закрытия окна редактирования и сброса данных
var closeForm = function () {
  editImageOverlay.classList.add('hidden');
  editImageOverlay.reset();
};

// при наступлении события change откроем окно

fileInput.addEventListener('change', function () {
  openForm();
});

//  закроем форму редактирования нажатием на #upload-cancel
closeImageOverlay.addEventListener('click', function () {
  closeForm();
});


// ============================= МАСШТАБИРОВАНИЕ =============================

var imagePreview = document.querySelector('.effect-image-preview'); // изображение
var size = document.querySelector('.upload-resize-controls-value'); // поле для изменения, должно измениться при нажатии на кнопки
var sizeInc = document.querySelector('.upload-resize-controls-button-inc'); // кнопка плюс
var sizeDec = document.querySelector('.upload-resize-controls-button-dec'); // кнопка минус

// напишем функцию для изменения размера изображения
var imagePreviewScale = function () {
  var currentValue = parseInt(size.value, 10); // находим текущее значение
  var scale = currentValue / 100; // делим его на 100
  imagePreview.style.transform = 'scale(' + scale + ')'; // добавляем это значение в img
};

// добавим обработчик события на sizeIncrese
sizeInc.addEventListener('click', function () {
  increaseSize();
});

// напишем функцию для увелечения изображения
var increaseSize = function () {
  var currentValue = parseInt(size.value, 10);
  size.value = currentValue + 25 + '%';
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

// =============================== ЭФФЕКТЫ =============================

var slider = document.querySelector('.upload-effect-level'); // найдем слайдер
// var effectValue = document.querySelector('upload-effect-level-value');
// сюда будем записывать значение элемента


// напишем функции для показа и исчезновения слайдера
var showSlider = function () {
  slider.classList.remove('hidden');
};
var hideSlider = function () {
  slider.classList.add('hidden');
};

// убрать эффекты
var noneRadio = document.querySelector('#upload-effect-none');
noneRadio.addEventListener('click', function () {
  applyNone();
});

var applyNone = function () {
  imagePreview.style.filter = '';
  hideSlider();
};

// применение эффекта хром
var chromeRadio = document.querySelector('#upload-effect-chrome');
chromeRadio.addEventListener('click', function () {
  applyChrome();
});

var applyChrome = function () {
  imagePreview.style.filter = 'grayscale(0.5)';
  showSlider();
};

// применение эффекта sepia
var sepiaRadio = document.querySelector('#upload-effect-sepia');
sepiaRadio.addEventListener('click', function () {
  applySepia();
});

var applySepia = function () {
  imagePreview.style.filter = 'sepia(0.5)';
  showSlider();
};

// применение эффекта marvin
var marvinRadio = document.querySelector('#upload-effect-marvin');
marvinRadio.addEventListener('click', function () {
  applyMarvin();
});

var applyMarvin = function () {
  imagePreview.style.filter = 'invert(75%)';
  showSlider();
};

// применение эффекта fobos
var phobosRadio = document.querySelector('#upload-effect-phobos');
phobosRadio.addEventListener('click', function () {
  applyPhobos();
});

var applyPhobos = function () {
  imagePreview.style.filter = 'blur(3px)';
  showSlider();
};

// применение эффекта heat
var heatRadio = document.querySelector('#upload-effect-heat');
heatRadio.addEventListener('click', function () {
  applyHeat();
});

var applyHeat = function () {
  imagePreview.style.filter = 'brightness(3)';
  showSlider();
};

// ==============================MODULE 4 - TASK 2==============================
// ==================================ВАЛИДАЦИЯ==================================

var hashtagsInput = editImageOverlay.querySelector('.upload-form-hashtags'); // окно хештегов
var isValidHashtags = function () { // функция валидации
  var hashtags = hashtagsInput.value.toLowerCase().split(' ');

  if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity('Максимальное количество хештегов ЭТО ПЯТЬ!');
    return false;
  }

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i].lastIndexOf('#') === 0) {
      hashtagsInput.setCustomValidity('Истину найдешь в решточке #');
      return false;
    }

    if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
      hashtagsInput.setCustomValidity('Слишком много букаф, попробуй меньше ' + HASHTAG_MAX_LENGTH + '');
      return false;
    }
    if (hashtags.includes(hashtags[i], i + 1)) {
      hashtagsInput.setCustomValidity('Не повторяйся');
      return false;
    }
  }

  hashtagsInput.setCustomValidity('');
  return true;
};

var form = document.querySelector('upload-form');
form.addEventListener('submit', function (evt) {
  if (!isValidHashtags()) {
    evt.preventDefault();
  }
});


//
// var sendFormButton = editImageOverlay.querySelector('.upload-form-submit'); // кнопка для отправки формы
// sendFormButton.addEventListener('click', function () {
//   validateHashtags();
// });
