'use strict';

(function () {

  var overlay = document.querySelector('.gallery-overlay');
  var closeOverlayButton = overlay.querySelector('.gallery-overlay-close');

  var renderMainPhoto = function (photo) {
    overlay.querySelector('.gallery-overlay-image').src = photo.url;
    overlay.querySelector('.likes-count').textContent = photo.likes;
    overlay.querySelector('.comments-count').textContent = photo.comments.length;
    closeOverlayButton.addEventListener('click', function () {
      closeOverlay();
    });
    closeOverlayButton.addEventListener('keydown', function (evt) {
      window.util.activationEvent(evt, closeOverlay);
    });
  };

  var openOverlay = function () {
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', closeOverlayOnEsc);
  };

  var closeOverlay = function () {
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', closeOverlayOnEsc);
  };

  var closeOverlayOnEsc = function (evt) {
    window.util.deactivationEvent(evt, closeOverlay);
  };

  window.galleryMain = {
    renderMainPhoto: renderMainPhoto,
    openOverlay: openOverlay
  };

})();
