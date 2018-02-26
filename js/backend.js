'use strict';

(function () {

  var upload = function (data, onLoad, onError) {
    var POST_URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var GET_URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания сервера');
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соеднинения');
    });

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var error = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    upload: upload,
    load: load,
    error: error
  };

})();
