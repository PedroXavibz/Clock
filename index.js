///////////////////////////////////////
// ELEMENTS
const labelTimer = document.querySelector(
  '.app__container-clock__current-time--title'
);
const labelDate = document.querySelector(
  '.app__container-clock__info-clock__date--title'
);
const labelAlarm = document.querySelector(
  '.app__container-clock__info-clock__alarm--title'
);
const labelInputHours = document.querySelector('input[name=hours]');
const labelInputMinutes = document.querySelector('input[name=minutes]');

const overlay = document.querySelector('.overlay');
const modelWindow = document.querySelector('.app__model-alarm');

const bntOpenModel = document.querySelector('.btn-set-alarm');
const btnClose = document.querySelector('.btn-close-model');
const btnSet = document.querySelector('.btn-set');

///////////////////////////////////////
// CURRENT TIME 🕐
const locale = navigator.locale;

const getCurrentTime = function (locale) {
  const now = Date.now();

  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  const currentTime = new Intl.DateTimeFormat(locale, options).format(now);

  labelTimer.textContent = currentTime;
};

getCurrentTime();

setInterval(getCurrentTime, 1000, locale);

///////////////////////////////////////
// CURRENT DATE 📅

const getCurrentDate = function (locale) {
  const now = Date.now();

  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  const currentTime = new Intl.DateTimeFormat(locale, options).format(now);

  labelDate.textContent = currentTime.replaceAll('/', ' | ');
};

getCurrentDate(locale);

///////////////////////////////////////
// ALARM MODEL ⏰

const toggleClass = function () {
  overlay.classList.toggle('hidden');
  modelWindow.classList.toggle('hidden');
};

// Open model
bntOpenModel.addEventListener('click', toggleClass);

// Close model
btnClose.addEventListener('click', toggleClass);

document.addEventListener('keydown', function (e) {
  const isEscPressed = e.key === 'Escape';

  if (isEscPressed && !modelWindow.classList.contains('hidden')) toggleClass();
});

///////////////////////////////////////
// SET ALARM ⏰

btnSet.addEventListener('click', function () {
  const hours = +labelInputHours.value;
  const minutes = +labelInputMinutes.value;

  const now = Date.now();
});
