const enableValidation = (settings) => {

    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        setEventListeners(settings);
    });
};


const setEventListeners = (settings) => {
    const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass} = settings;
    const formElement = document.querySelector(formSelector);

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
            e.preventDefault();
            isValid(formElement, inputElement, settings)
        });
    });

    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass)
};


const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
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



