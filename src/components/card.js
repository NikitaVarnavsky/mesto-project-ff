import { openPopup, closePopup, overlayCloseClick } from './modal.js';

const cardTemplateContent = document.querySelector('#card-template').content;
const popupImg = document.querySelector('.popup_type_image');

const createCard = (cardValue, deleteCard) => {
  const cloneCard = cardTemplateContent.querySelector('.card').cloneNode(true);
  const deleteCardButton = cloneCard.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', (event) => {
    deleteCard(event.target);
  });
  cloneCard.querySelector('.card__image').src = cardValue.link;
  cloneCard.querySelector('.card__image').alt = `Фотография места: ${cardValue.name}`;
  cloneCard.querySelector('.card__title').textContent = cardValue.name;
  return cloneCard;
};

const deleteCard = (item) => {
  const currentCard = item.closest('.places__item');
  currentCard.remove();
};

const btnCloseClick = (elem) => {
  if (elem.target.classList.contains('popup__close')) {
    closePopup(elem.target);
  }
};

const addListenerClose = (elem) => {
  const currentModalPopupClose = elem.querySelector('.popup__close');
  currentModalPopupClose.addEventListener('click', btnCloseClick);
  elem.addEventListener('mousedown', overlayCloseClick);
};

const addListenerCard = (e) => {
  if (e.target.classList.contains('card__image')) {
    const currentCard = popupImg.querySelector('.popup__image');
    currentCard.src = e.target.src;
    openPopup(popupImg);
    addListenerClose(popupImg);
  }
  if (e.target.classList.contains('card__like-button')) {
    e.target.classList.toggle('card__like-button_is-active');
  }
};

export { createCard, addListenerCard, addListenerClose, deleteCard };
