'use strict';

(function () {

  var imagePreview = document.querySelector('.effect-image-preview');
  var formsField = document.querySelector('.upload-effect-controls');

  var currentEffect;
  var switchFilter = function (filterName) {
    imagePreview.classList = '';
    imagePreview.style.filter = '';
    imagePreview.classList.add('effect-' + filterName);
    currentEffect = filterName;
  };

  var onFilterChange = function (evt) {
    if (evt.target.type === 'radio') {
      var filterName = evt.target.value;
      switchFilter(filterName);
      if (filterName === 'none') {
        window.slider.hide();
      } else {
        window.slider.show();
        window.slider.reset('100%');
      }
    }
  };

  formsField.addEventListener('click', onFilterChange);
  formsField.addEventListener('keydown', function (evt) {
    window.util.activationEvent(evt, function () {
      evt.target.click();
    });
  });

  var setEffectValue = function (shift) {
    switch (currentEffect) {
      case 'none':
        imagePreview.style.filter = 'none';
        break;
      case 'chrome':
        imagePreview.style.filter = 'grayscale(' + shift + ')';
        break;
      case 'sepia':
        imagePreview.style.filter = 'sepia(' + shift + ')';
        break;
      case 'marvin':
        imagePreview.style.filter = 'invert(' + shift * 100 + '%)';
        break;
      case 'phobos':
        imagePreview.style.filter = 'blur(' + shift * 3 + 'px)';
        break;
      case 'heat':
        imagePreview.style.filter = 'brightness(' + shift * 3 + ')';
        break;
    }
  };

  window.slider.init(setEffectValue);

})();
