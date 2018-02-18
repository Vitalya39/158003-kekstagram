'use strict';

(function () {

  var MAX_SLIDER_VALUE = 455;
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

  var onFilterChange = function (evt) {
    if (evt.target.type === 'radio') {
      applyFilter(evt.target.value);
    }
  };

  formsField.addEventListener('click', onFilterChange);

  // напишем функцию которая меняет уровень насыщенности, в качестве параметров изменение значения и название эффекта
  window.effectValue = function (shift, effectName) {
    if (effectName === 'none') {
      imagePreview.style.filter = 'none';
    }
    if (effectName === 'chrome') {
      document.querySelector('.effect-chrome').style.filter = 'grayscale(' + shift / MAX_SLIDER_VALUE + ')';
    }
    if (effectName === 'sepia') {
      document.querySelector('.effect-sepia').style.filter = 'sepia(' + shift / MAX_SLIDER_VALUE + ')';
    }
    if (effectName === 'marvin') {
      document.querySelector('.effect-marvin').style.filter = 'invert(' + shift / 4.55 + '%)';
    }
    if (effectName === 'phobos') {
      document.querySelector('.effect-phobos').style.filter = 'blur(' + shift / (MAX_SLIDER_VALUE / 3) + 'px)';
    }
    if (effectName === 'heat') {
      document.querySelector('.effect-heat').style.filter = 'brightness(' + shift * (MAX_SLIDER_VALUE / 3) + ')';
    }
  };

})();
