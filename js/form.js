'use strict';

(function () {
  var fileInput = document.querySelector('#upload-file');
  var editImageOverlay = document.querySelector('.upload-overlay');
  var closeImageOverlay = editImageOverlay.querySelector('#upload-cancel');
  var form = document.querySelector('.upload-form');

  var openForm = function () {
    editImageOverlay.classList.remove('hidden');
    window.slider.hideSlider();
  };

  var closeForm = function () {
    editImageOverlay.classList.add('hidden');
    editImageOverlay.reset();
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

  form.addEventListener('submit', onFormClick);

  var onSuccessSend = function () {
    closeForm();
  };

  var onErrorSend = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onFormClick = function (evt) {
    evt.preventDefault();
    if (window.validity.isValidHashtags()) {
      window.backend.upload(new FormData(form), onSuccessSend, onErrorSend);
    }
  };

  form.addEventListener('submit', onFormClick);

})();
