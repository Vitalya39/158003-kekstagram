'use strict';

(function () {
  var MAX_SLIDER_VALUE = 455;
  var MIN_SLIDER_VALUE = 1;
  var slider = document.querySelector('.upload-effect-level');
  var sliderPin = slider.querySelector('.upload-effect-level-pin'); // слайдер
  var sliderEffect = slider.querySelector('.upload-effect-level-val'); // полоса заполнения

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
      sliderEffect.style.width = parseFloat(sliderPin.style.left) / 4.55 + '%';
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

})();
