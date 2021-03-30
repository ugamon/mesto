export class Card {
    constructor(data, cardSelector, openPopupFunction){
        this._data = data;
        this._cardSelector = cardSelector;
        this._openPopup = openPopupFunction;
    }
    
    _copyTemplate(){
        this._templateCopy =  this._cardSelector.querySelector('.place').cloneNode(true)
    }
    
    _getElement(elementSelector){
        return this._templateCopy.querySelector(elementSelector);
    }

    _layoutSetup(){
        this.image = this._getElement('.place__image');
        this.desciption = this._getElement('.place__title');
        this._likeIcon = this._getElement('.place__button-like');
        this.deleteButton = this._getElement('.place__bucket');
        this.previewButton = this._getElement('button:not(.place__bucket)');
    }
    

    _fillLayout(){
       const {link, name } = this._data; 
       this.image.src = link;
       this.image.alt = name;
       this.desciption.textContent = name;    
    }

    _handleCardDelete(e){
        e.preventDefault();
        e.target.closest('.place').remove()
    }

    _handleLikeIcon(e){
        this._likeIcon.classList.toggle("place__button-like_active")
    }

    _handleImagePopupOpen(e){
        const imagePopup = document.querySelector('#imagePlacePopup');
        const imageElement = imagePopup.querySelector('.popup__image');
        const headerElement = imagePopup.querySelector('.popup__header');
        
        imageElement.src = this._data.link;
        imageElement.alt = this._data.name;
        headerElement.textContent = this._data.name;
        this._openPopup(imagePopup);
    }
    
    _addEventListeners(){
        this._likeIcon.addEventListener('click', (e) => this._handleLikeIcon(e));
        this.deleteButton.addEventListener('click',(e) => this._handleCardDelete(e));
        this.previewButton.addEventListener('click', (e) => this._handleImagePopupOpen(e));
    }


    render(){
        this._copyTemplate();
        this._layoutSetup();
        this._fillLayout();
        this._addEventListeners();
        return this._templateCopy
    }

}
