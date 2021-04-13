class Popup {
    constructor(selector) {
        this.popupElement = document.querySelector(selector);
    }

    open() {
        this.popupElement.classList.add("popup_opened");
    }

    close() {
        this.popupElement.classList.remove("popup_opened");
        // this._removeEventListeners();
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners(action) {
        document.addEventListener(action, this._handleEscClose.bind(this));

        this.popupElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (e.target.classList.contains('popup__close-button')) {
                this.close();
            }
        })

    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose.bind(this))
    }
}

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
    }

    open({link, name}) {
        const imageElement = this.popupElement.querySelector('.popup__image');
        const headerElement = this.popupElement.querySelector('.popup__header');
        imageElement.src = link;
        imageElement.alt = name;
        headerElement.textContent = name;
        super.open();
    }
}


export class PopupWithForm extends Popup {
    constructor(selector, submitCallBack) {
        super(selector);
        this._submitCallBack = submitCallBack;
        this.attributes = {};

    }

    _getInputValues() {
        const _inputs = this.popupElement.querySelectorAll('.popup__input');
        _inputs.forEach((node) => {
            this.attributes[node.getAttribute('name')] = node.value;
        });
    }

    open() {
        this.popupElement.classList.add("popup_opened");

    }

    _handleCardSubmit(e) {
        e.preventDefault();
        this._getInputValues();
        this._submitCallBack(this.attributes);
        this.popupElement.removeEventListener("submit", this._handleCardSubmit);
        this.close()
    }

    _removeEventListeners() {
        // super._removeEventListeners();
        this.popupElement.removeEventListener("submit", this._handleCardSubmit.bind(this))
    }

    setEventListeners() {
        // super.setEventListeners('keydown');
        this.popupElement.addEventListener("submit", this._handleCardSubmit.bind(this));
    }


    close() {
        // const _inputs = this.popupElement.querySelectorAll('.popup__input');
        // _inputs.forEach((input)=> {
        //     input.setAttribute('value', '');
        // });
        // this._removeEventListeners();
        super.close()

    }
}

