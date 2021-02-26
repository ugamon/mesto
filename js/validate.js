const enableValidation = (settings) => {

    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        setEventListeners(formElement, settings);
    });

};


const setEventListeners = (formElement, settings) => {
    const {inputSelector, submitButtonSelector, inactiveButtonClass} = settings;


    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
            e.preventDefault();
            isValid(formElement, inputElement, settings)
            toggleButtonState(inputList, buttonElement, inactiveButtonClass)
        });
    });


};


const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    inputList.length > 0 ? true : console.log('Check the formList variable, inputList is empty')

    if (hasInvalidInput(inputList)) {

        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
        buttonElement.style.pointerEvents = "none";
    } else {

        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
        buttonElement.style.pointerEvents = "auto";
    }
};

const hasInvalidInput = (inputList) => {

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};


function isValid(formElement, inputElement, settings) {
    const errorFormElement = formElement.querySelector(`.${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorFormElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(inputElement, errorFormElement, settings);
    }
}


function showInputError(inputElement, errorFormElement, errorMessage, settings) {
    const {inputErrorClass, errorClass} = settings;

    inputElement.classList.add(inputErrorClass);
    errorFormElement.textContent = errorMessage;
    errorFormElement.classList.add(errorClass);

}

function hideInputError(inputElement, errorFormElement, settings) {
    const {inputErrorClass, errorClass} = settings;
    inputElement.classList.remove(inputErrorClass);
    errorFormElement.classList.remove(errorClass);
}


const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
};


enableValidation(config);
