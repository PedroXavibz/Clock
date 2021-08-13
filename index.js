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
const btnSetAlarm = document.querySelector('.btn-set-alarm');

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
// ALARM ⏰
