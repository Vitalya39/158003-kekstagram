'use strict';

(function () {

  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MIN_LENGTH = 3;
  var HASHTAGS_MAX_LENGTH = 5;
  var hashtagsInput = document.querySelector('.upload-form-hashtags');

  var isValidHashtags = function () {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ');

    if (hashtagsInput.value === '') {
      return true;
    }
    if (hashtags.length > HASHTAGS_MAX_LENGTH) {
      hashtagsInput.setCustomValidity('Максимальное количество хештегов ЭТО ' + HASHTAGS_MAX_LENGTH + ' !');
      hashtagsInput.style.border = '3px solid red';
      return false;
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].lastIndexOf('#') !== 0) {
        hashtagsInput.setCustomValidity('Хештеги должен начинаться с решеточки(#) и разделяться одним пробелом');
        hashtagsInput.style.border = '3px solid red';
        return false;
      }
      if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
        hashtagsInput.setCustomValidity('Слишком много букаф, попробуй меньше ' + HASHTAG_MAX_LENGTH + '');
        hashtagsInput.style.border = '3px solid red';
        return false;
      }
      if (hashtags[i].length < HASHTAG_MIN_LENGTH) {
        hashtagsInput.setCustomValidity('Таких маленьких хештегов не бывает! Должно быть не меньше ' + HASHTAG_MIN_LENGTH + ' символов');
        hashtagsInput.style.border = '3px solid red';
        return false;
      }
      if (hashtags.includes(hashtags[i], i + 1)) {
        hashtagsInput.setCustomValidity('Не повторяйся');
        hashtagsInput.style.border = '3px solid red';
        return false;
      }
    }
    hashtagsInput.setCustomValidity('');
    hashtagsInput.style.border = '3px solid green';
    return true;
  };

  hashtagsInput.addEventListener('change', isValidHashtags);

  window.validity = {
    isValidHashtags: isValidHashtags
  };

})();
