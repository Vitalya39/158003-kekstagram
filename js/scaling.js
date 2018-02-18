'use strict';

(function () {
  var imagePreview = document.querySelector('.effect-image-preview');
  var size = document.querySelector('.upload-resize-controls-value');
  var sizeInc = document.querySelector('.upload-resize-controls-button-inc');
  var sizeDec = document.querySelector('.upload-resize-controls-button-dec');

  var imagePreviewScale = function () {
    var currentValue = parseInt(size.value, 10);
    var scale = currentValue / 100;
    imagePreview.style.transform = 'scale(' + scale + ')';
  };

  var increaseSize = function () {
    var currentValue = parseInt(size.value, 10);
    size.value = currentValue + 25 + '%';
    if (parseInt(size.value, 10) > 100) {
      size.value = 100 + '%';
    }
    imagePreviewScale();
  };

  sizeInc.addEventListener('click', function () {
    increaseSize();
  });


  var decreseSize = function () {
    var commonValue = parseInt(size.value, 10);
    size.value = commonValue - 25 + '%';
    if (parseInt(size.value, 10) < 0) {
      size.value = 0 + '%';
    }
    imagePreviewScale();
  };

  sizeDec.addEventListener('click', function () {
    decreseSize();
  });
})();
