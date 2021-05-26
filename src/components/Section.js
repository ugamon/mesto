export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._items.unshift(item);
  }

  renderItems() {
    //this._cleanContainer();
    this._items.map((item) => {
      const domElementToInsert = this._renderer(item);
      this._container.prepend(domElementToInsert);
    });
  }
}
