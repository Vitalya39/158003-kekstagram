'use strict';

(function () {

  var POST_URL = 'https://js.dump.academy/kekstagram';
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  var ERROR_TIMER = 5000;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соеднинения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания сервера');
    });

    return xhr;
  };

  var upload = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var error = function (errorMessage) {
    var errorNode = document.createElement('div');
    errorNode.classList.add('error');
    errorNode.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorNode);
    window.debounce(function () {
      document.body.removeChild(errorNode);
    }, ERROR_TIMER);
  };

  window.backend = {
    upload: upload,
    load: load,
    error: error
  };

})();
