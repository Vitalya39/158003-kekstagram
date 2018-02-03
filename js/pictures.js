'use strict';

var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTOS_QUANTITY = 25;

// получить случайное число от min до max
var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// получить случайный комментарий
var getRandomComment = function (arr) {
  var i = getRandomNum(0, arr.length);
  return arr[i];
};

// 1. создать массив с объектами
var createPhotosData = function (quantity) {
  var data = [];
  for (var i = 1; i <= quantity; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNum(15, 200),
      comments: getRandomComment(COMMENTS)
    };
    data.push(photo);
  }
  return data;
};

// 2. создаем DOM-элементы на основе pictures-template
var photoTemplate = document.querySelector('#picture-template').content;


var createPhotoObject = function (array) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture img').src = array.url;
  photoElement.querySelector('.picture-likes').textContent = array.likes;
  photoElement.querySelector('.picture-comments').textContent = array.Comments;
  return photoElement;
};

// 3.отрисуем DOM-элементы в блок .pictures c помощью DocumentFragment
var photoBlock = document.querySelector('.pictures'); // блок для вставки
var photoFragment = document.createDocumentFragment(); // фрагмент для вставки

var renderPhotos = function (array) {
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    photoFragment.appendChild(createPhotoObject(array[i]));
    photoBlock.appendChild(photoFragment);
  }
};

renderPhotos(createPhotosData(PHOTOS_QUANTITY));


// 4.покажем элемент gallery-overlay и заполним1 его данными из первого элемента массива

document.querySelector('.gallery-overlay').classList.remove('hidden');

var renderMainPhoto = function (array) {
  var gallery = document.querySelector('.gallery-overlay');
  gallery.querySelector('.gallery-overlay-image').src = array[0].url;
  gallery.querySelector('.likes-count').textContent = array[0].likes;
  gallery.querySelector('.comments-count').textContent = array[0].comments.length;
};

renderMainPhoto(createPhotosData(PHOTOS_QUANTITY));
