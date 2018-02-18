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

  fileInput.addEventListener('change', function () {
    openForm();
    document.addEventListener('keydown', closeFormOnEsc);
  });

  closeImageOverlay.addEventListener('click', function () {
    closeForm();
    document.removeEventListener('keydown', closeFormOnEsc);
  });

  var closeFormOnEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
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

  var sliderPin = slider.querySelector('.upload-effect-level-pin'); // слайдер
  var sliderEffect = slider.querySelector('.upload-effect-level-val'); // полоса заполнения


  var applyFilter = function (filterName) {
    imagePreview.classList = '';
    imagePreview.style.filter = '';
    imagePreview.classList.add('effect-' + filterName);
    sliderPin.style.left = 455 + 'px';
    sliderEffect.style.width = '100%';
    if (filterName === 'none') {
      hideSlider();
    } else {
      showSlider();
    }
    window.currentEffect = filterName;
  };

  // функция которая определит по какому элементу мы кликнули и подставит его value в предыдущую функцию
  var onFilterChange = function (evt) {
    if (evt.target.type === 'radio') {
      applyFilter(evt.target.value);
    }
  };

  // найдем элемент в котором лежат радиокнопки с фильтрами
  var formsField = document.querySelector('.upload-effect-controls');
  formsField.addEventListener('click', onFilterChange);
})();
