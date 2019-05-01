var user = {
  name: null,
  age: null,
  usage: null
}

var deadAge = 90;
var scroll;

var forEach = function(arr, callback) {
  Array.prototype.forEach.call(arr, callback);
};

function onChangeName() {
  user.name = document.getElementById('userName').value;
  var nameContainers = document.getElementsByClassName('user-name');
  forEach(nameContainers, function(nameContainer) {
    nameContainer.textContent = user.name;
  });
  refreshPages();
}

function onChangeAge() {
  user.age = parseInt(document.getElementById('userAge').value);
  refreshPages();
}

function onChangeMobileUsage() {
  user.usage = parseInt(document.getElementById('userMobileUsage').value, 10);
  refreshPages();
}

function _addSection(sectionName, text) {
  var section = document.getElementById(sectionName);
  if (section) {
    section.parentNode.removeChild(section);
  }
  section = document.createElement('section');
  section.setAttribute('id', sectionName);
  section.innerHTML = '<div class="text"><div>' + text + '</div></div>';

  var next = document.createElement('div');
  next.setAttribute('class', 'next arrow');
  next.setAttribute('data-scroll', 'data-scroll');
  next.addEventListener('click', nextSection);

  section.appendChild(next);

  document.querySelector('main').appendChild(section);
}

function _humanize(minutes) {
  var milliseconds = minutes * 60 * 1000;
  var humanized = humanizeDuration(milliseconds, {
    language: 'es',
    delimiter: ','
  });

  var parts = humanized.split(',');
  var template = '<div class="row"><div class="col number">$1</div><div class="col">$2</div></div>';
  var partsHtml = parts.map(function(part) {
    return part.replace(/([^ ]+) (.*)/mg, template);
  })
  return '<div class="grid">' + partsHtml.join('') + "</div>";
}

function _refreshWeekUsage() {
  if (!user.usage) {
    return;
  }
  var weekUsage = _humanize(user.usage * 7);
  _addSection('weekusage', '<span class="user-name">' + user.name + '</span>, así que pasas ' + weekUsage + " a la semana con tu móvil 🤔");
}

function _refreshMonthUsage() {
  if (!user.usage) {
    return;
  }
  var monthUsage = _humanize(user.usage * 31);
  _addSection('monthusage', '<span class = "user-name" > ' + user.name + ' </span> tu móvil te roba' + monthUsage + " al mes 😬");
}

function _refreshYearUsage() {
  if (!user.usage) {
    return;
  }
  var yearUsage = _humanize(user.usage * 365);
  _addSection('yearusage', '<span class = "user-name" > ' + user.name + ' </span> este año estarás' + yearUsage + " delante de tu móvil 😖");
}

function _refreshLifeRemain() {
  if (!user.age) {
    return;
  }

  var remainYears = deadAge - user.age;
  _addSection('liferemain', '<span class="user-name">' + user.name + '</span> según la estádistica te quedan <strong>' + remainYears + "</strong> años de vida");
}

function _refreshLifeUsage() {
  if (!user.usage || !user.age) {
    return;
  }

  var remainYears = deadAge - user.age;
  var lifeUsage = _humanize(remainYears * user.usage * 365);
  _addSection('lifeusage', '<span class="user-name">' + user.name + '</span> si no cambias tus hábitos, cuando mueras habrás perdido ' + lifeUsage + " delante de la pantalla de tu móvil 😱");
}

function nextSection(event) {
  var nextSection = event.target.parentNode.nextElementSibling;
  scroll.animateScroll(nextSection);
}

function refreshPages() {
  if (!user.name) {
    scroll.animateScroll(document.getElementById('page-1'));
  } else if (!user.age) {
    scroll.animateScroll(document.getElementById('page-2'));
  } else if (!user.usage) {
    scroll.animateScroll(document.getElementById('page-3'));
  } else {
    _refreshWeekUsage();
    _refreshMonthUsage();
    _refreshYearUsage();
    _refreshLifeRemain();
    _refreshLifeUsage();
    scroll.animateScroll(document.getElementById('weekusage'));
  }
}


function init() {
  scroll = new SmoothScroll();
  onChangeName();
  onChangeAge();
  onChangeMobileUsage();
  var nextButtons = document.getElementsByClassName('next');
  forEach(nextButtons, function(button) {
    button.addEventListener('click', nextSection);
  });
  document.getElementById('no-se-button').addEventListener('click', function(event) {
    event.preventDefault();
    event.target.classList.add('is-hidden');
    document.getElementById('no-se').classList.remove('is-hidden');
  });
}

init();