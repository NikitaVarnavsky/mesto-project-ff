import './pages/index.css';
import { initialCards } from './scripts/cards.js';

import { openPopup, closePopup, overlayCloseClick } from './components/modal.js';
import { createCard, deleteCard } from './components/card.js';

const cardsList = document.querySelector('.places__list');

const profileEdit = document.querySelector('.profile__edit-button');
const profileAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');

const profileTitleValue = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = popupEdit.querySelector('.popup__form input[name="name"]');
const inputDescription = popupEdit.querySelector('.popup__form input[name="description"]');
const formEditProfile = popupEdit.querySelector('[name="edit-profile"]');

const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = popupNewCard.querySelector('[name="new-place"]');
const inputNamePlace = popupNewCard.querySelector('.popup__form input[name="place-name"]');
const inputLinkPlace = popupNewCard.querySelector('.popup__form input[name="link"]');

const allPopup = document.querySelectorAll('.popup');

const popupImg = document.querySelector('.popup_type_image');

const cardIsLike = (e) => {
  if (e.target.classList.contains('card__like-button')) {
    e.target.classList.toggle('card__like-button_is-active');
  }
};

const cardImgModal = (e) => {
  if (e.target.classList.contains('card__image')) {
    const currentCard = popupImg.querySelector('.popup__image');
    currentCard.src = e.target.src;
    openPopup(popupImg);
    popupImg.querySelector('.popup__caption').textContent =
      e.currentTarget.querySelector('.card__title').textContent;
    popupImg.querySelector('img').alt = e.target.alt;
    addListenerClose(popupImg);
  }
};

const addListenerClose = (elem) => {
  const currentModalPopupClose = elem.querySelector('.popup__close');
  currentModalPopupClose.addEventListener('click', btnCloseClick);
  elem.addEventListener('mousedown', overlayCloseClick);
};

const btnCloseClick = (elem) => {
  if (elem.target.classList.contains('popup__close')) {
    closePopup(elem.target);
  }
};

allPopup.forEach((item) => {
  item.classList.add('popup_is-animated');
});

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, cardIsLike, cardImgModal);
  cardsList.append(card);
});

profileEdit.addEventListener('click', (e) => {
  openPopup(popupEdit);
  addListenerClose(popupEdit);
  inputName.value = profileTitleValue.textContent;
  inputDescription.value = profileDescription.textContent;
});

profileAdd.addEventListener('click', (e) => {
  openPopup(popupNewCard);
  addListenerClose(popupNewCard);
});

formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitleValue.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  const currentOpenPopup = document.querySelector('.popup_is-opened');
  closePopup(currentOpenPopup);
});

formNewPlace.addEventListener('submit', (e) => {
  e.preventDefault();
  const dataNewCard = {};
  dataNewCard.name = inputNamePlace.value;
  dataNewCard.link = inputLinkPlace.value;
  const newCard = createCard(dataNewCard, deleteCard, cardIsLike, cardImgModal);
  cardsList.prepend(newCard);
  inputNamePlace.value = '';
  inputLinkPlace.value = '';
  const currentOpenPopup = document.querySelector('.popup_is-opened');
  closePopup(currentOpenPopup);
});

export { btnCloseClick };
