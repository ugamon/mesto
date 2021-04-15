export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(domElementToInsert) {
    this._container.prepend(domElementToInsert);
  }

  renderItems() {
    //this._cleanContainer();
    this._items.map((item) => {
      const domElementToInsert = this._renderer(item);
      this.addItem(domElementToInsert);
    });
  }
}
