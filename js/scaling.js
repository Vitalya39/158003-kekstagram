'use strict';

(function () {

  var STEP_VALUE = 25;
  var MAX_SIZE_VALUE = 100;
  var MIN_SIZE_VALUE = 0;
  var INC_SIZE_BUTTON = 'upload-resize-controls-button-inc';
  var DEC_SIZE_BUTTON = 'upload-resize-controls-button-dec';

  var size = document.querySelector('.upload-resize-controls-value');

  var changeSize = function (photo) {
    var currentValue = parseInt(size.value, 10);
    var scale = currentValue / MAX_SIZE_VALUE;
    photo.style.transform = 'scale(' + scale + ')';
  };

  var increaseSize = function (photo) {
    var currentValue = parseInt(size.value, 10);
    size.value = currentValue + STEP_VALUE + '%';
    if (parseInt(size.value, 10) > MAX_SIZE_VALUE) {
      size.value = MAX_SIZE_VALUE + '%';
    }
    changeSize(photo);
  };

  var decreaseSize = function (photo) {
    var currentValue = parseInt(size.value, 10);
    size.value = currentValue - STEP_VALUE + '%';
    if (parseInt(size.value, 10) < MIN_SIZE_VALUE) {
      size.value = MIN_SIZE_VALUE + '%';
    }
    changeSize(photo);
  };

  var onClickResize = function (evt, photo) {
    var currentTarget = evt.target;
    if (currentTarget.classList.contains(DEC_SIZE_BUTTON)) {
      decreaseSize(photo);
    }
    if (currentTarget.classList.contains(INC_SIZE_BUTTON)) {
      increaseSize(photo);
    }
  };

  window.scale = {
    onClickResize: onClickResize
  };

})();
