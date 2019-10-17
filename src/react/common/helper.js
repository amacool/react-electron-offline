export const setArabicMarkup = (lang) => {
  let body = document.querySelector('body');
  if (lang === 'AR') {
    body.dir = 'rtl';
    body.className = 'main-arabic';
  } else {
    body.dir = '';
    body.className = '';
  }
};
