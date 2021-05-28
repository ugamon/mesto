export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    this._inactiveButtonClass = this._settings.inactiveButtonClass;
  }

  _setEventListeners() {
    // this._formElement.addEventListener("reset", () => {
    //   this._toggleButtonState();
    //   this._inputList.forEach((inputElement) => {
    //     this._hideInputError(inputElement);
    //   });
    // });

    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        e.preventDefault();
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState() {
    this._inputList.length > 0
      ? true
      : console.log("Check the formList variable, inputList is empty");

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
      this._buttonElement.style.pointerEvents = "none";
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
      this._buttonElement.style.pointerEvents = "auto";
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._settings;

    const errorFormElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(inputErrorClass);
    errorFormElement.textContent = errorMessage;
    errorFormElement.classList.add(errorClass);
  }

  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._settings;
    const errorFormElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorFormElement.classList.remove(errorClass);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
