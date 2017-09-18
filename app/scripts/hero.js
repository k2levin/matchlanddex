/* eslint-env browser */
/* eslint max-len: 0 */
(function() {
  'use strict';

  var getHeroName = function() {
    return window.location.search.substr(6).toUpperCase();
  };

  var heroNames = ['ALEXANDER', 'BARRETT', 'FENRUS', 'JADE', 'PRIMM'];
  if (heroNames.includes(getHeroName()) === false) {
    window.location.replace('/');
  }
  document.getElementById('hero-img').src = 'images/' + getHeroName() + '.png';
  document.getElementById('hero-img').alt = getHeroName();

  var updateStatTable = function(stats) {
    var table = document.querySelector('table');
    var i = 1;
    stats.forEach(function(hero) {
      var tr = document.createElement('tr');
      var tbody = document.getElementById('table-body');
      tbody.appendChild(tr);
      for (var key in hero) {
        if (hero.hasOwnProperty(key)) {
          var row1 = table.rows[i];
          var cell0 = row1.insertCell(-1);
          cell0.textContent = hero[key];
          cell0.className = 'mdl-data-table__cell--non-numeric';
        }
      }
      i++;
    });
  };

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      var response = JSON.parse(request.response);
      document.getElementById('hero-title').textContent = getHeroName();
      updateStatTable(response);
    }
  };
  request.open('GET', '/datas/' + getHeroName() + '.json');
  request.send();
})();
