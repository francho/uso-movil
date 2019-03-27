var user = {
  name: null,
  age: null,
  usage: null
}

var deadAge = 90;

var forEach = function(arr, callback) {
  Array.prototype.forEach.call(arr, callback);
};

function onChangeName() {
  user.name = document.getElementById('userName').value;
  refreshPages();
  if (user.name) {}
}

function onChangeAge() {
  user.age = document.getElementById('userAge').value;
  refreshPages();
}

function onChangeMobileUsage() {
  user.usage = parseInt(document.getElementById('userMobileUsage').value, 10);
  refreshPages();
}

function _refreshName() {
  var nameContainers = document.getElementsByClassName('user-name');
  forEach(nameContainers, function(nameContainer) {
    nameContainer.textContent = user.name;
  });
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
  var partsHtml = parts.map(function(part) {
    return part.replace(/([^ ]+) (.*)/mg, "<dt>$1</dt><dd>$2</dd>");
  })
  return "<dl>" + partsHtml.join('') + "</dl>";
}

function _refreshWeekUsage() {
  if (!user.usage) {
    return;
  }
  var weekUsage = _humanize(user.usage * 7);
  _addSection('weekusage', '<span class="user-name">' + user.name + '</span> pasas ' + weekUsage + " a la semana con tu 📱");
}

function _refreshMonthUsage() {
  if (!user.usage) {
    return;
  }
  var monthUsage = _humanize(user.usage * 31);
  _addSection('monthusage', '<span class = "user-name" > ' + user.name + ' </span> tu 📱 te roba' + monthUsage + " al mes ");
}

function _refreshYearUsage() {
  if (!user.usage) {
    return;
  }
  var yearUsage = _humanize(user.usage * 365);
  _addSection('yearusage', '<span class = "user-name" > ' + user.name + ' </span> este año estarás' + yearUsage + " delante de tu 📱");
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
  _addSection('lifeusage', '<span class="user-name">' + user.name + '</span> si no cambias tus hábitos,<br> cuando mueras habrás perdido ' + lifeUsage + " delante de la pantalla de tu móvil 😱");
}

function nextSection(event) {
  var nextSection = event.target.parentNode.nextElementSibling;
  var scroll = new SmoothScroll();
  scroll.animateScroll(nextSection);
}

function refreshPages() {
  _refreshName();
  _refreshWeekUsage();
  _refreshMonthUsage();
  _refreshYearUsage();
  _refreshLifeRemain();
  _refreshLifeUsage();
}
var scroll;

function init() {
  onChangeName();
  onChangeAge();
  onChangeMobileUsage();
  var nextButtons = document.getElementsByClassName('next');
  forEach(nextButtons, function(button) {
    button.addEventListener('click', nextSection);
  });
}

init();