export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(content) {
    this._container.prepend(content);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._renderedItems.forEach(item => {
      this._content = this._renderer(item);
      this.addItem(this._content);
    });
  }
};
