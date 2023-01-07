export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems(data) {
    return this._renderer(data)
  }
};
