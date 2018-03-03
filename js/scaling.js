'use strict';

(function () {

  var STEP_VALUE = 25;
  var MAX_SIZE_VALUE = 100;
  var MIN_SIZE_VALUE = 0;

  var imagePreview = document.querySelector('.effect-image-preview');
  var size = document.querySelector('.upload-resize-controls-value');
  var sizeInc = document.querySelector('.upload-resize-controls-button-inc');
  var sizeDec = document.querySelector('.upload-resize-controls-button-dec');

  var imagePreviewScale = function () {
    var currentValue = parseInt(size.value, 10);
    var scale = currentValue / MAX_SIZE_VALUE;
    imagePreview.style.transform = 'scale(' + scale + ')';
  };

  var increaseSize = function () {
    var currentValue = parseInt(size.value, 10);
    size.value = currentValue + STEP_VALUE + '%';
    if (parseInt(size.value, 10) > MAX_SIZE_VALUE) {
      size.value = MAX_SIZE_VALUE + '%';
    }
    imagePreviewScale();
  };

  sizeInc.addEventListener('click', function () {
    increaseSize();
  });

  var decreseSize = function () {
    var commonValue = parseInt(size.value, 10);
    size.value = commonValue - STEP_VALUE + '%';
    if (parseInt(size.value, 10) < MIN_SIZE_VALUE) {
      size.value = MIN_SIZE_VALUE + '%';
    }
    imagePreviewScale();
  };

  sizeDec.addEventListener('click', function () {
    decreseSize();
  });

  var refreshSize = function () {
    imagePreview.style.transform = '';
  };

  window.scaling = {
    refreshSize: refreshSize
  };

})();
