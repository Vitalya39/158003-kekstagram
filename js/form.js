'use strict';

(function () {
  var fileInput = document.querySelector('#upload-file');
  var editImageOverlay = document.querySelector('.upload-overlay');
  var closeImageOverlay = editImageOverlay.querySelector('#upload-cancel');

  var openForm = function () {
    editImageOverlay.classList.remove('hidden');
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

})();
