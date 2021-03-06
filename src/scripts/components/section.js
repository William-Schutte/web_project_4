// ###########################  Section Class  ####################################################

export default class Section {
    constructor({ items, renderer }, classSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(classSelector);
    }

    renderSection() {
        this._container.innerHTML = "";
        this._items.forEach((item) => {
            this._renderer(item);
        });
    };

    addItem(cardElement) {
        this._container.prepend(cardElement);
    };
}
