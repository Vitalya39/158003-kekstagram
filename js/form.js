'use strict';

(function () {
  var fileInput = document.querySelector('#upload-file');
  var editImageOverlay = document.querySelector('.upload-overlay');
  var closeImageOverlay = editImageOverlay.querySelector('#upload-cancel');
  var hashtagsInput = document.querySelector('.upload-form-hashtags');
  var form = document.querySelector('.upload-form');

  var openForm = function () {
    editImageOverlay.classList.remove('hidden');
    window.slider.hideSlider();
  };

  var closeForm = function () {
    editImageOverlay.classList.add('hidden');
    form.reset();
    hashtagsInput.setCustomValidity('');
    hashtagsInput.style.border = '';
  };

  var closeFormOnEsc = function (evt) {
    window.util.deactivationEvent(evt, closeForm);
  };

  fileInput.addEventListener('change', function () {
    openForm();
    document.addEventListener('keydown', closeFormOnEsc);
  });

  closeImageOverlay.addEventListener('click', function () {
    closeForm();
    document.removeEventListener('keydown', closeFormOnEsc);
  });

  var onSuccessSend = function () {
    closeForm();
  };

  var onFormClick = function (evt) {
    evt.preventDefault();
    if (window.validity.isValidHashtags() === true) {
      window.backend.upload(new FormData(form), onSuccessSend, window.backend.error);
    } else {
      hashtagsInput.style.border = '3px solid red';
    }
  };

  form.addEventListener('submit', onFormClick);

})();
