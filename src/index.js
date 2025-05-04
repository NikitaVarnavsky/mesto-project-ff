import './pages/index.css';
import { initialCards } from './scripts/cards.js';

// @todo: Темплейт карточки
const cardTemplateContent = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
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

// @todo: Функция удаления карточки
const deleteCard = (item) => {
  const currentCard = item.closest('.places__item');
  currentCard.remove();
};

// @todo: Вывести карточки на страницу

// const popupImg = document.querySelector('.popup_type_image');

// initialCards.forEach((item) => {
//   const card = createCard(item, deleteCard);
//   cardsList.append(card);

//   card.addEventListener('click', (e) => {
//     console.log(e.target.src)
//   });
// });

// 2й спринт

const profileEdit = document.querySelector('.profile__edit-button');
const profileAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');

const popupNewCard = document.querySelector('.popup_type_new-card');

const popupImg = document.querySelector('.popup_type_image');

const profileTitleValue = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = popupEdit.querySelector('.popup__form input[name="name"]');
const inputDescription = popupEdit.querySelector('.popup__form input[name="description"]');
const formEditProfile = popupEdit.querySelector('[name="edit-profile"]');

const formNewPlace = popupNewCard.querySelector('[name="new-place"]');
const inputNamePlace = popupNewCard.querySelector('.popup__form input[name="place-name"]');
const inputLinkPlace = popupNewCard.querySelector('.popup__form input[name="link"]');

const allPopup = document.querySelectorAll('.popup');
allPopup.forEach((item) => {
  item.classList.add('popup_is-animated');
});

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);

  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('card__image')) {
      const currentCard = popupImg.querySelector('.popup__image');
      currentCard.src = e.target.src;
      openPopup(popupImg);
      addListener(popupImg);
    }
    if (e.target.classList.contains('card__like-button')) {
      e.target.classList.toggle('card__like-button_is-active');
    }
  });

  cardsList.append(card);
});

// Открытие модального окна

const openPopup = (elem) => {
  const modal = elem.closest('.popup');

  elem.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscKeyUp);
};

// Закрытие модального окна

const closePopup = (elem) => {
  const modal = elem.closest('.popup');
  modal.classList.toggle('popup_is-opened');
  document.removeEventListener('keyup', handleEscKeyUp);
  elem.removeEventListener('mousedown', overlayCloseClick);
};

//  Закрытие по нажатию Esc
const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
};

const btnCloseClick = (elem) => {
  if (elem.target.classList.contains('popup__close')) {
    closePopup(elem.target);
  }
};

const overlayCloseClick = (elem) => {
  if (elem.target.classList.contains('popup')) {
    closePopup(elem.target);
  }
};

const addListener = (elem) => {
  const currentModalPopupClose = elem.querySelector('.popup__close');
  currentModalPopupClose.addEventListener('click', btnCloseClick);
  elem.addEventListener('mousedown', overlayCloseClick);
};

//  Открытие окна профиля

profileEdit.addEventListener('click', (e) => {
  openPopup(popupEdit);
  addListener(popupEdit);
  inputName.value = profileTitleValue.textContent;
  inputDescription.value = profileDescription.textContent;
});

//  Открытие окна добавления карточки

profileAdd.addEventListener('click', () => {
  openPopup(popupNewCard);
  addListener(popupNewCard);
});

formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitleValue.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  const popup = document.querySelector('.popup_is-opened');
  closePopup(popup);
});

formNewPlace.addEventListener('submit', (e) => {
  e.preventDefault();
  const dataNewCard = {};
  dataNewCard.name = inputNamePlace.value;
  dataNewCard.link = inputLinkPlace.value;
  const newCard = createCard(dataNewCard, deleteCard);
  cardsList.prepend(newCard);
  newCard.addEventListener('click', (e) => {
    if (e.target.classList.contains('card__image')) {
      const currentCard = popupImg.querySelector('.popup__image');
      currentCard.src = e.target.src;
      openPopup(popupImg);
      addListener(popupImg);
    }
    if (e.target.classList.contains('card__like-button')) {
      e.target.classList.toggle('card__like-button_is-active');
    }
  });
  const popup = document.querySelector('.popup_is-opened');

  closePopup(popup);
});
