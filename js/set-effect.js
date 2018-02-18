'use strict';

(function () {

  var slider = document.querySelector('.upload-effect-level');
  var sliderPin = slider.querySelector('.upload-effect-level-pin'); // слайдер
  var sliderEffect = slider.querySelector('.upload-effect-level-val'); // полоса заполнения
  var imagePreview = document.querySelector('.effect-image-preview');
  var formsField = document.querySelector('.upload-effect-controls'); // поле с кнопками фильтров

  var showSlider = function () {
    slider.classList.remove('hidden');
  };
  var hideSlider = function () {
    slider.classList.add('hidden');
  };

  var currentEffect;
  var switchFilter = function (filterName) {
    imagePreview.classList = '';
    imagePreview.style.filter = '';
    imagePreview.classList.add('effect-' + filterName);
    sliderPin.style.left = window.util.MAX_SLIDER_VALUE + 'px';
    sliderEffect.style.width = '100%';
    if (filterName === 'none') {
      hideSlider();
    } else {
      showSlider();
    }
    currentEffect = filterName;
    return currentEffect;
  };

  var onFilterChange = function (evt) {
    if (evt.target.type === 'radio') {
      switchFilter(evt.target.value);
    }
  };

  formsField.addEventListener('click', onFilterChange);

  window.setEffectValue = function (shift) {
    if (currentEffect === 'none') {
      imagePreview.style.filter = 'none';
    }
    if (currentEffect === 'chrome') {
      document.querySelector('.effect-chrome').style.filter = 'grayscale(' + shift / window.util.MAX_SLIDER_VALUE + ')';
    }
    if (currentEffect === 'sepia') {
      document.querySelector('.effect-sepia').style.filter = 'sepia(' + shift / window.util.MAX_SLIDER_VALUE + ')';
    }
    if (currentEffect === 'marvin') {
      document.querySelector('.effect-marvin').style.filter = 'invert(' + shift / (window.util.MAX_SLIDER_VALUE / 100) + '%)';
    }
    if (currentEffect === 'phobos') {
      document.querySelector('.effect-phobos').style.filter = 'blur(' + shift / (window.util.MAX_SLIDER_VALUE / 3) + 'px)';
    }
    if (currentEffect === 'heat') {
      document.querySelector('.effect-heat').style.filter = 'brightness(' + shift / (window.util.MAX_SLIDER_VALUE / 3) + ')';
    }
  };

})();
