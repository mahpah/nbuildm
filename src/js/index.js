import DomUtils from './DomUtils.js';

let sidebar = document.querySelector('.cd-side-nav');
let header = document.querySelector('.cd-main-header');
let topNav = document.querySelector('.cd-top-nav');
let cdNav = document.querySelector('.cd-nav');
let searchBox = document.querySelector('.cd-search');
let mainContent = document.querySelector('.cd-main-content');
let menuTrigger = document.querySelector('.cd-nav-trigger');
let resizing = false;

menuTrigger.addEventListener('click', e => {
  DomUtils.toggleClass('show-nav', sidebar);
  DomUtils.toggleClass('show-nav', menuTrigger);
});

let getSize = () => {
  let before =  window.getComputedStyle(document.querySelector('.cd-main-content'), '::before');
  return before
    .getPropertyValue('content')
    .replace(/'/g, '')
    .replace(/"/g, '');
};

let moveTopNav = () => {
  let size = getSize();
  if (size === 'small' && topNav.parentNode === cdNav) {
    sidebar.insertBefore(searchBox, sidebar.firstChild);
    sidebar.appendChild(topNav);
  } else if (size === 'medium' || size === 'large') {
    header.querySelector('.cd-logo').insertAdjacentElement('afterend', searchBox);
    header.querySelector('.cd-nav').appendChild(topNav);
  }

  resizing = false;
};

window.addEventListener('resize', e => {
  if (!resizing) {
    window.requestAnimationFrame(moveTopNav);
  }

  resizing = true;
});

moveTopNav();

let hasChilds = Array.from(document.querySelectorAll('.has-child > a'));
let clearSelect = arr => {
  arr.forEach(node => {
    node.parentNode.classList.remove('selected');
  });
};

hasChilds.forEach(node => {
  node.addEventListener('click', e => {
    e.preventDefault();
    clearSelect(hasChilds);
    DomUtils.toggleClass('selected', e.target.parentNode);
  });
});

document.addEventListener('click', e => {
  let target = e.target;
  if (target.nodeName === 'A' && target.parentNode.classList.contains('has-child')) {
    return;
  }

  clearSelect(hasChilds);
});
