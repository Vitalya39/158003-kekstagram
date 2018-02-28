'use strict';

(function () {
  var MAX_SLIDER_VALUE = 456;
  var MIN_SLIDER_VALUE = 0;

  var slider = document.querySelector('.upload-effect-level');
  var sliderPin = slider.querySelector('.upload-effect-level-pin');
  var sliderEffect = slider.querySelector('.upload-effect-level-val');

  var initSlider = function (callback) {
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
        callback((sliderPin.offsetLeft - shiftX) / MAX_SLIDER_VALUE);
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

    sliderPin.addEventListener('mousedown', onEffectLevelPinMousedown);
  };

  var showSlider = function () {
    slider.classList.remove('hidden');
  };

  var hideSlider = function () {
    slider.classList.add('hidden');
  };

  var resetSlider = function (value) {
    sliderPin.style.left = value;
    sliderEffect.style.width = value;
  };

  window.slider = {
    initSlider: initSlider,
    showSlider: showSlider,
    hideSlider: hideSlider,
    resetSlider: resetSlider,
  };

})();
