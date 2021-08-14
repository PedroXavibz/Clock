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
const labelWarning = document.querySelector('.app__model-alarm--warning');

const overlay = document.querySelector('.overlay');
const modelWindow = document.querySelector('.app__model-alarm');

const bntOpenModel = document.querySelector('.btn-open-set-alarm');
const bntStopAlarm = document.querySelector('.btn-stop-alarm');
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

const toggleButtons = function () {
  bntOpenModel.classList.toggle('hidden');
  bntStopAlarm.classList.toggle('hidden');
};

const resetUIAlarm = function () {
  labelInputHours.value = '';
  labelInputMinutes.value = '';
  labelAlarm.textContent = '00:00';
  toggleButtons();
};

const startAlarm = function (dateAlarm) {
  const tick = function () {
    const now = new Date();

    if (+now >= +dateAlarm) {
      clearInterval(handlerTime);
      alert('Tick ⏰');
      resetUIAlarm();
    }
  };

  const handlerTime = setInterval(tick, 1000);

  return handlerTime;
};

let timer;

btnSet.addEventListener('click', function () {
  const hoursValue = +labelInputHours.value;
  const minutesValue = +labelInputMinutes.value;

  if (Number.isNaN(hoursValue) || Number.isNaN(minutesValue)) {
    labelWarning.classList.remove('hidden');
    return false;
  }

  if (
    hoursValue > 23 ||
    hoursValue < 0 ||
    minutesValue > 59 ||
    minutesValue < 0
  ) {
    labelWarning.classList.remove('hidden');
    return false;
  }

  const currentTime = new Date();

  // Set Alarm
  const dateAlarm = new Date();
  dateAlarm.setHours(hoursValue);
  dateAlarm.setMinutes(minutesValue);
  dateAlarm.setSeconds(0);

  // Alarm Day
  if (
    dateAlarm.getHours() >= currentTime.getHours() &&
    dateAlarm.getMinutes() >= currentTime.getMinutes()
  ) {
    dateAlarm.setDate(dateAlarm.getDate());
  } else {
    dateAlarm.setDate(dateAlarm.getDate() + 1);
  }

  // Display alarm
  options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  labelAlarm.textContent = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(dateAlarm);

  // Close model
  toggleClass();

  timer = startAlarm(dateAlarm);

  // Reset UI
  labelInputHours.value = '';
  labelInputMinutes.value = '';
  toggleButtons();
});

// STOP ALARM ⏰
bntStopAlarm.addEventListener('click', function () {
  if (timer) clearInterval(timer);

  resetUIAlarm();
});
