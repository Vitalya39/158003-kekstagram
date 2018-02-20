'use strict';

(function () {
  var HASHTAG_MAX_LENGTH = 20;
  var hashtagsInput = document.querySelector('.upload-form-hashtags');

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
})();
