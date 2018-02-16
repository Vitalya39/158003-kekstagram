'use strict';

(function () {
  var ESC_KEYCODE = 27;
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

  fileInput.addEventListener('change', function () {
    openForm();
    document.addEventListener('keydown', closeFormOnEsc);
  });

  closeImageOverlay.addEventListener('click', function () {
    closeForm();
    document.removeEventListener('keydown', closeFormOnEsc);
  });

  var closeFormOnEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeForm();
    }
  };

  var imagePreview = editImageOverlay.querySelector('.effect-image-preview');
  var size = editImageOverlay.querySelector('.upload-resize-controls-value');
  var sizeInc = editImageOverlay.querySelector('.upload-resize-controls-button-inc');
  var sizeDec = editImageOverlay.querySelector('.upload-resize-controls-button-dec');

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

  var slider = document.querySelector('.upload-effect-level');

  var showSlider = function () {
    slider.classList.remove('hidden');
  };
  var hideSlider = function () {
    slider.classList.add('hidden');
  };

  var disableEffect = document.querySelector('#upload-effect-none');
  disableEffect.addEventListener('click', function () {
    imagePreview.style.filter = '';
    hideSlider();
  });

  var chromeRadio = document.querySelector('#upload-effect-chrome');
  chromeRadio.addEventListener('click', function () {
    applyEffectChrome();
  });

  var applyEffectChrome = function () {
    imagePreview.style.filter = 'grayscale(0.5)';
    showSlider();
  };

  var sepiaRadio = document.querySelector('#upload-effect-sepia');
  sepiaRadio.addEventListener('click', function () {
    applyEffectSepia();
  });

  var applyEffectSepia = function () {
    imagePreview.style.filter = 'sepia(0.5)';
    showSlider();
  };

  var marvinRadio = document.querySelector('#upload-effect-marvin');
  marvinRadio.addEventListener('click', function () {
    applyEffectMarvin();
  });

  var applyEffectMarvin = function () {
    imagePreview.style.filter = 'invert(75%)';
    showSlider();
  };

  var phobosRadio = document.querySelector('#upload-effect-phobos');
  phobosRadio.addEventListener('click', function () {
    applyEffectPhobos();
  });

  var applyEffectPhobos = function () {
    imagePreview.style.filter = 'blur(3px)';
    showSlider();
  };

  var heatRadio = document.querySelector('#upload-effect-heat');
  heatRadio.addEventListener('click', function () {
    applyEffectHeat();
  });

  var applyEffectHeat = function () {
    imagePreview.style.filter = 'brightness(3)';
    showSlider();
  };

  var sliderLine = document.querySelector('.upload-effect-level-line');
  var sliderPin = sliderLine.querySelector('.upload-effect-level-pin');

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordinate = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordinate - moveEvt.clientX;
      startCoordinate = moveEvt.clientX;
      sliderPin.style.left = (sliderPin.offsetLeft - shiftX) + 'px';
      if (sliderPin.offsetLeft - shiftX >= 456) {
        sliderPin.style.left = 455 + 'px';
      }
      if (sliderPin.offsetLeft - shiftX <= 0) {
        sliderPin.style.left = 1 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      sliderLine.removeEventListener('mousemove', onMouseMove);
      sliderLine.removeEventListener('mouseup', onMouseUp);
    };

    sliderLine.addEventListener('mousemove', onMouseMove);
    sliderLine.addEventListener('mouseup', onMouseUp);
  });

})();
