'use strict';

(function () {
  var slider = document.querySelector('.upload-effect-level');
  var sliderPin = slider.querySelector('.upload-effect-level-pin'); // слайдер
  var sliderEffect = slider.querySelector('.upload-effect-level-val'); // полоса заполнения

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordinate = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordinate - moveEvt.clientX;
      startCoordinate = moveEvt.clientX;
      sliderPin.style.left = (sliderPin.offsetLeft - shiftX) + 'px';
      if (sliderPin.offsetLeft - shiftX >= 455) {
        sliderPin.style.left = 455 + 'px';
      }
      if (sliderPin.offsetLeft - shiftX <= 0) {
        sliderPin.style.left = 1 + 'px';
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
  });

})();
