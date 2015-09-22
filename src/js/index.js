import TheClass from './TheClass.js';
import DomUtils from './DomUtils.js';
console.log(DomUtils);

document.addEventListener('DOMContentLoaded', e => {
  let ps = document.querySelectorAll('p');
  setTimeout(() => {
    DomUtils.toggleClass('test', ps);
  }, 2000);
});
