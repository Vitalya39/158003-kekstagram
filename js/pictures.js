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
var ENTER_KEYCODE = 13;

var getRandomNum = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getComments = function (commentsQuantity) {
  var comments = [];
  for (var i = 0; i < commentsQuantity; i++) {
    var comment = getRandomNum(0, COMMENTS.length);
    comments.push(COMMENTS[comment]);
  }
  return comments;
};

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

var openOverlay = function () {
  overlay.classList.remove('hidden');
  document.addEventListener('keydown', closeOverlayOnEsc);
};

var closeOverlay = function () {
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', closeOverlayOnEsc);
};

var closeOverlayOnEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
};

var photoBlock = document.querySelector('.pictures');

var renderPhotos = function (photos) {
  var photoFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    photoFragment.appendChild(createPhotoElement(photos[i]));
  }
  return photoFragment;
};

var photos = createPhotos(PHOTOS_QUANTITY);
photoBlock.appendChild(renderPhotos(photos));

var renderMainPhoto = function (photo) {
  overlay.querySelector('.gallery-overlay-image').src = photo.url;
  overlay.querySelector('.likes-count').textContent = photo.likes;
  overlay.querySelector('.comments-count').textContent = photo.comments.length;
  closeOverlayButton.addEventListener('click', function () {
    closeOverlay();
  });
  closeOverlayButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeOverlay();
    }
  });
};

var fileInput = document.querySelector('#upload-file');
var editImageOverlay = document.querySelector('.upload-overlay');
var closeImageOverlay = editImageOverlay.querySelector('#upload-cancel');

var openForm = function () {
  editImageOverlay.classList.remove('hidden');
};

var closeForm = function () {
  editImageOverlay.classList.add('hidden');
  editImageOverlay.reset();
};

fileInput.addEventListener('change', function () {
  openForm();
  document.addEventListener('keydown', closeFormOnEsc);
});


closeImageOverlay.addEventListener('click', function () {
  closeForm();
  document.removeEventListener('keydown', closeFormOnEsc);
});

var closeFormOnEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeForm();
  }
};

var imagePreview = editImageOverlay.querySelector('.effect-image-preview');
var size = editImageOverlay.querySelector('.upload-resize-controls-value');
var sizeInc = editImageOverlay.querySelector('.upload-resize-controls-button-inc');
var sizeDec = editImageOverlay.querySelector('.upload-resize-controls-button-dec');

var imagePreviewScale = function () {
  var currentValue = parseInt(size.value, 10);
  var scale = currentValue / 100;
  imagePreview.style.transform = 'scale(' + scale + ')';
};

var increaseSize = function () {
  var currentValue = parseInt(size.value, 10);
  size.value = currentValue + 25 + '%';
  if (parseInt(size.value, 10) > 100) {
    size.value = 100 + '%';
  }
  imagePreviewScale();
};

sizeInc.addEventListener('click', function () {
  increaseSize();
});

var decreseSize = function () {
  var commonValue = parseInt(size.value, 10);
  size.value = commonValue - 25 + '%';
  if (parseInt(size.value, 10) < 0) {
    size.value = 0 + '%';
  }
  imagePreviewScale();
};

sizeDec.addEventListener('click', function () {
  decreseSize();
});

var slider = document.querySelector('.upload-effect-level');

var showSlider = function () {
  slider.classList.remove('hidden');
};
var hideSlider = function () {
  slider.classList.add('hidden');
};

var disableEffect = document.querySelector('#upload-effect-none');
disableEffect.addEventListener('click', function () {
  imagePreview.style.filter = '';
  hideSlider();
});

var chromeRadio = document.querySelector('#upload-effect-chrome');
chromeRadio.addEventListener('click', function () {
  applyEffectChrome();
});

var applyEffectChrome = function () {
  imagePreview.style.filter = 'grayscale(0.5)';
  showSlider();
};

var sepiaRadio = document.querySelector('#upload-effect-sepia');
sepiaRadio.addEventListener('click', function () {
  applyEffectSepia();
});

var applyEffectSepia = function () {
  imagePreview.style.filter = 'sepia(0.5)';
  showSlider();
};

var marvinRadio = document.querySelector('#upload-effect-marvin');
marvinRadio.addEventListener('click', function () {
  applyEffectMarvin();
});

var applyEffectMarvin = function () {
  imagePreview.style.filter = 'invert(75%)';
  showSlider();
};

var phobosRadio = document.querySelector('#upload-effect-phobos');
phobosRadio.addEventListener('click', function () {
  applyEffectPhobos();
});

var applyEffectPhobos = function () {
  imagePreview.style.filter = 'blur(3px)';
  showSlider();
};

var heatRadio = document.querySelector('#upload-effect-heat');
heatRadio.addEventListener('click', function () {
  applyEffectHeat();
});

var applyEffectHeat = function () {
  imagePreview.style.filter = 'brightness(3)';
  showSlider();
};

var hashtagsInput = editImageOverlay.querySelector('.upload-form-hashtags');

var isValidHashtags = function () {
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

var form = document.querySelector('.upload-form');
form.addEventListener('submit', function (evt) {
  if (!isValidHashtags()) {
    evt.preventDefault();
  }
});
