export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _setEventListeners() {
    const {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
    } = this._settings;

    const inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    const buttonElement = this._formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        e.preventDefault();
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    inputList.length > 0
      ? true
      : console.log("Check the formList variable, inputList is empty");

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
      buttonElement.style.pointerEvents = "none";
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
      buttonElement.style.pointerEvents = "auto";
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(inputElement) {
    const errorFormElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        errorFormElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement, errorFormElement);
    }
  }

  _showInputError(inputElement, errorFormElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._settings;

    inputElement.classList.add(inputErrorClass);
    errorFormElement.textContent = errorMessage;
    errorFormElement.classList.add(errorClass);
  }

  _hideInputError(inputElement, errorFormElement) {
    const { inputErrorClass, errorClass } = this._settings;
    inputElement.classList.remove(inputErrorClass);
    errorFormElement.classList.remove(errorClass);
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners(this._formElement);
  }
}
