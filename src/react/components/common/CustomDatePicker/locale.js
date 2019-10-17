const WEEKDAYS_SHORT = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  cn: ['天', '一', '二', '三', '四', '五', '六'],
  fr: ['dim', 'lu', 'Ma', 'Me', 'jeu', 'vend', 'sam'],
  ar: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  sp: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Vend', 'Sam']
};

const MONTHS = {
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  cn: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ],
  fr: [
    'Janvier',
    'Février',
    'marcher',
    'Avril',
    'pouvoir',
    'Juin',
    'Juillet',
    'majestueux',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  ar: [
    'يناير',
    'فبراير',
    'مارس',
    'ابريل',
    'قد',
    'حزيران',
    'تموز',
    'اغسطس',
    'ايلول',
    'تشرين',
    'تشرين الثاني',
    'كانون الاول'
  ],
  sp: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Puede',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
};

const WEEKDAYS_LONG = {
  ru: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  cn: [
    'Domenica',
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato',
  ],
  fr: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  ar: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  sp: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ]
};

const FIRST_DAY_OF_WEEK = {
  ru: 1,
  fr: 1,
  ar: 1,
  cn: 1,
  sp: 1
};
// Translate aria-labels
const LABELS = {
  ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' },
  cn: { nextMonth: 'Prossimo mese', previousMonth: 'Mese precedente' },
  fr: { nextMonth: 'Prossimo mese', previousMonth: 'Mese precedente' },
  ar: { nextMonth: 'Prossimo mese', previousMonth: 'Mese precedente' },
  sp: { nextMonth: 'Prossimo mese', previousMonth: 'Mese precedente' }
};

export {
  WEEKDAYS_SHORT,
  MONTHS,
  WEEKDAYS_LONG,
  FIRST_DAY_OF_WEEK,
  LABELS
};