'use strict';

(function () {
  var MAX_SLIDER_VALUE = 455;
  var MIN_SLIDER_VALUE = 1;
  var slider = document.querySelector('.upload-effect-level');
  var sliderPin = slider.querySelector('.upload-effect-level-pin'); // слайдер
  var sliderEffect = slider.querySelector('.upload-effect-level-val'); // полоса заполнения
  var imagePreview = document.querySelector('.effect-image-preview');

  // функция движения слайдера
  var onEffectLevelPinMousedown = function (evt) {
    evt.preventDefault();
    var startCoordinate = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordinate - moveEvt.clientX;
      startCoordinate = moveEvt.clientX;
      sliderPin.style.left = (sliderPin.offsetLeft - shiftX) + 'px';
      if (sliderPin.offsetLeft - shiftX >= MAX_SLIDER_VALUE) {
        sliderPin.style.left = MAX_SLIDER_VALUE + 'px';
      }
      if (sliderPin.offsetLeft - shiftX <= MIN_SLIDER_VALUE) {
        sliderPin.style.left = MIN_SLIDER_VALUE + 'px';
      }
      formValue(sliderPin.offsetLeft - shiftX, window.currentEffect);
      sliderEffect.style.width = parseFloat(sliderPin.style.left) / (MAX_SLIDER_VALUE / 100) + '%';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      slider.removeEventListener('mousemove', onMouseMove);
      slider.removeEventListener('mouseup', onMouseUp);
    };
    slider.addEventListener('mousemove', onMouseMove);
    slider.addEventListener('mouseup', onMouseUp);
  };

  // обработчик событий для пина слайдера
  sliderPin.addEventListener('mousedown', onEffectLevelPinMousedown);
  // напишем функцию которая меняет уровень насыщенности, в качестве параметров изменение значения и название эффекта
  var formValue = function (shift, effectName) {
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
