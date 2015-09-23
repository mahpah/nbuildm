class DomUtils {

  toggleClass(className, elm) {

    if (elm instanceof NodeList) {
      return Array.from(elm).forEach(this.toggleClass.bind(this, className));
    }

    if (!(elm instanceof Node)) {
      throw 'Not a DOM node';
    }

    if (elm.classList) {
      return elm.classList.toggle(className);
    }

    let classes = elm.className.split(' ');
    let exists = classes.indexOf(className);

    if (exists) {
      classes.splice(exists, 1);
    } else {
      classes.push(className);
    }
  }

  containsClass(className, elm) {
    return elm.classList.has(className);
  }

}

export default new DomUtils();
