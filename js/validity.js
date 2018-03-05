'use strict';

(function () {

  var HASHTAG_MAX_CHARACTERS = 20;
  var HASHTAG_MIN_CHARACTERS = 2;
  var HASHTAGS_MAX_QUANTITY = 5;
  var hashtagsInput = document.querySelector('.upload-form-hashtags');

  var validateHashtags = function () {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ');
    hashtags = hashtags.filter(function (hashtag) {
      return hashtag !== '';
    });

    if (hashtagsInput.value === '') {
      return true;
    }
    if (hashtags.length > HASHTAGS_MAX_QUANTITY) {
      hashtagsInput.setCustomValidity('Максимальное количество хештегов - ' + HASHTAGS_MAX_QUANTITY + '.');
      hashtagsInput.style.border = '3px solid red';
      return false;
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].lastIndexOf('#') !== 0) {
        hashtagsInput.setCustomValidity('Хештеги должны начинаться с решетки(#).');
        hashtagsInput.style.border = '3px solid red';
        return false;
      }
      if (hashtags[i].length > HASHTAG_MAX_CHARACTERS) {
        hashtagsInput.setCustomValidity('Должно быть меньше ' + HASHTAG_MAX_CHARACTERS + ' букв');
        hashtagsInput.style.border = '3px solid red';
        return false;
      }
      if (hashtags[i].length <= HASHTAG_MIN_CHARACTERS) {
        hashtagsInput.setCustomValidity('В хештеге должно быть не меньше ' + (HASHTAG_MIN_CHARACTERS + 1) + ' символов');
        hashtagsInput.style.border = '3px solid red';
        return false;
      }
      if (hashtags.includes(hashtags[i], i + 1)) {
        hashtagsInput.setCustomValidity('Хештеги не могут повторяться');
        hashtagsInput.style.border = '3px solid red';
        return false;
      }
    }
    hashtagsInput.setCustomValidity('');
    hashtagsInput.style.border = '';
    return true;
  };

  hashtagsInput.addEventListener('change', validateHashtags);

  var refreshHashtags = function () {
    hashtagsInput.setCustomValidity('');
    hashtagsInput.style.border = '';
  };

  window.validity = {
    refreshHashtags: refreshHashtags
  };

})();
