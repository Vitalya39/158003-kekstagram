'use strict';

(function () {
  var HASHTAG_MAX_LENGTH = 20;
  var hashtagsInput = document.querySelector('.upload-form-hashtags');

  var isValidHashtags = function () {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ');

    if (hashtagsInput.value === '') {
      return true;
    }
    if (hashtags.length > 5) {
      hashtagsInput.setCustomValidity('Максимальное количество хештегов ЭТО ПЯТЬ!');
      return false;
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].lastIndexOf('#') !== 0) {
        hashtagsInput.setCustomValidity('Хештег должен начинаться с решеточки # и состоять из одного слова');
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

  window.validity = {
    isValidHashtags: isValidHashtags
  };

})();
