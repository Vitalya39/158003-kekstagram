'use strict';

(function () {
  var form = document.querySelector('.upload-form');
  var imageOverlay = form.querySelector('.upload-overlay');
  var closeOverlayButton = form.querySelector('.upload-form-cancel');
  var fileInput = form.querySelector('.upload-input');
  var hashtagsInput = form.querySelector('.upload-form-hashtags');
  var commentsInput = form.querySelector('.upload-form-description')


  var openForm = function () {
    imageOverlay.classList.remove('hidden');
    window.slider.hideSlider();
  };

  var closeForm = function () {
    imageOverlay.classList.add('hidden');
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

  closeOverlayButton.addEventListener('click', function () {
    closeForm();
    document.removeEventListener('keydown', closeFormOnEsc);
  });

  commentsInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  var onFormClick = function (evt) {
    evt.preventDefault();
    if (window.validity.isValidHashtags) {
      window.backend.upload(new FormData(form), closeForm, window.backend.onErrorSend);
    }
  };

  form.addEventListener('submit', onFormClick);

})();
