/* eslint-env browser */
(function() {
  'use strict';

  var getHeroName = function() {
    return window.location.search.substr(6);
  };

  var getStats = function(name, data) {
    var stats = [];
    switch (name) {
      case 'ALEXANDER':
        stats = data.alexander;
        break;
      case 'BARRETT':
        stats = data.barrett;
        break;
      default:
        window.location.replace('/index.html');
    }

    return stats;
  };

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
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        var response = JSON.parse(request.response);
        var heroName = getHeroName().toUpperCase();
        document.getElementById('hero-title').textContent = heroName;
        var stats = getStats(heroName, response);
        updateStatTable(stats);
      }
    } else {
      // Return the dummy data since no data is available.
    }
  };
  request.open('GET', '/stat.json');
  request.send();
})();
