'use strict';

(function () {

  var form = document.querySelector('.upload-form');
  var imageOverlay = form.querySelector('.upload-overlay');
  var closeOverlayButton = form.querySelector('.upload-form-cancel');
  var fileInput = form.querySelector('.upload-input');
  var commentsInput = form.querySelector('.upload-form-description');

  var openForm = function () {
    imageOverlay.classList.remove('hidden');
    window.slider.hide();
  };

  var closeForm = function () {
    form.reset();
    imageOverlay.classList.add('hidden');
    window.validity.refreshHashtags();
    window.preview.refresh();
  };

  var onFormEscPress = function (evt) {
    window.util.deactivationEvent(evt, closeForm);
  };

  fileInput.addEventListener('change', function () {
    openForm();
    document.addEventListener('keydown', onFormEscPress);
    window.preview.onInputChange(fileInput);
  });

  closeOverlayButton.addEventListener('click', function () {
    closeForm();
    document.removeEventListener('keydown', onFormEscPress);
  });

  commentsInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  var onFormClick = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), closeForm, window.backend.error);
  };

  form.addEventListener('submit', onFormClick);

})();
