'use strict';

(function () {
  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

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


  window.createPhotos = function (quantity) {
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
})();
