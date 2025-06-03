import './pages/index.css';
// import { initialCards } from './scripts/cards.js';

import { openPopup, closePopup, overlayCloseClick } from './components/modal.js';
import { createCard, deleteCard, cardIsLike } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';

import {
  getInitialCards,
  getInitialUser,
  submitDataProfile,
  addCard,
  addLike,
  removeLike,
  setProfile,
  removeCard,
} from './components/api.js';

const cardsList = document.querySelector('.places__list');

const profileEdit = document.querySelector('.profile__edit-button');
const profileAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const currentImgProfile = document.querySelector('.profile__image');

const newImg = document.querySelector('.popup_type_edit__image-profile');

const deleteIcon = document.querySelector('.popup_type_delete_card');
const formDeleteCard = document.querySelector('[name="delete__card"]');

const profileTitleValue = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const inputName = popupEdit.querySelector('.popup__form input[name="name"]');
const inputDescription = popupEdit.querySelector('.popup__form input[name="description"]');
const formEditProfile = popupEdit.querySelector('[name="edit-profile"]');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = popupNewCard.querySelector('[name="new-place"]');
const inputNamePlace = popupNewCard.querySelector('.popup__form input[name="place-name"]');
const inputLinkPlace = popupNewCard.querySelector('.popup__form input[name="link"]');
const formImgProfile = document.querySelector('[name="new-img-profile"]');
const inputImgProfile = document.querySelector('input[name="imgLink"]');
const popupImg = document.querySelector('.popup_type_image');
const currentImageCard = popupImg.querySelector('.popup__image');
const nameCard = popupImg.querySelector('.popup__caption');
const allPopup = document.querySelectorAll('.popup');

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

let userId;
let cardForDelete = {};

// Получение данных пользователя
const initialUser = () => {
  return getInitialUser()
    .then((result) => {
      userId = result._id;
      profileTitleValue.textContent = result.name;
      profileDescription.textContent = result.about;
      profileImage.style['background-image'] = `url(${result.avatar})`;
    })
    .catch((err) => `Ошибка: ${err}`);
};

// Рендер карточек

const initialCards = () => {
  return getInitialCards()
    .then((result) => {
      result.forEach((item) => {
        const isLiked = item.likes.some((like) => like._id === userId);
        const card = createCard(
          item,
          deleteCard,
          cardIsLike,
          isLiked,
          addLike,
          removeLike,
          cardImgModal,
          item.likes,
          item.owner.name,
          profileTitleValue.textContent,
          confirmDelete,
        );
        cardsList.append(card);
      });
    })
    .catch((err) => `Ошибка: ${err}`);
};

Promise.all([initialUser(), initialCards()])
  .then((result) => {
    return result;
  })
  .catch((err) => `Ошибка: ${err}`);

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

const cardImgModal = (name, link) => {
  currentImageCard.src = link;
  popupImg.querySelector('.popup__image').alt = name;
  openPopup(popupImg);
  nameCard.textContent = name;
};

allPopup.forEach((item) => {
  item.classList.add('popup_is-animated');
  addListenerClose(item);
});

profileEdit.addEventListener('click', (e) => {
  openPopup(popupEdit);
  inputName.value = profileTitleValue.textContent;
  inputDescription.value = profileDescription.textContent;
  clearValidation(inputName.closest('.popup__form'), configValidation);
});

profileAdd.addEventListener('click', (e) => {
  clearValidation(formNewPlace, configValidation);
  openPopup(popupNewCard);
});

currentImgProfile.addEventListener('click', (e) => {
  openPopup(newImg);
});

formImgProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  let isLoading = true;
  currentImgProfile.style['background-image'] = `url(${inputImgProfile.value})`;
  onLoading(isLoading, e.target);
  setProfile(inputImgProfile.value)
    .then(() => {
      inputImgProfile.value = '';
      closePopup(newImg);
    })
    .finally(() => {
      isLoading = false;
      onLoading(false, e.target);
    });
});

formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  let isLoading = true;
  profileTitleValue.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  onLoading(isLoading, e.target);

  submitDataProfile(inputName.value, inputDescription.value)
    .then(() => {
      closePopup(popupEdit);
    })
    .finally(() => {
      isLoading = false;
      onLoading(isLoading, e.target);
    });
});

formNewPlace.addEventListener('submit', (e) => {
  e.preventDefault();
  let isLoading = true;
  onLoading(isLoading, e.target);
  const dataNewCard = {};
  addCard(inputNamePlace.value, inputLinkPlace.value)
    .then((res) => {
      dataNewCard.name = inputNamePlace.value;
      dataNewCard.link = inputLinkPlace.value;
      dataNewCard._id = res._id;
      dataNewCard.owner = res.owner.name;
      const newCard = createCard(
        dataNewCard,
        deleteCard,
        cardIsLike,
        false,
        addLike,
        removeLike,
        cardImgModal,
        [],
        dataNewCard.owner,
        profileTitleValue.textContent,
        confirmDelete,
      );
      cardsList.prepend(newCard);
      inputNamePlace.value = '';
      inputLinkPlace.value = '';
      clearValidation(inputNamePlace.closest('.popup__form'), configValidation);

      closePopup(popupNewCard);
    })
    .finally(() => {
      isLoading = false;
      onLoading(isLoading, e.target);
    });
});

formDeleteCard.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!cardForDelete.cardElement) return;
  removeCard(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closePopup(deleteIcon);
      cardForDelete = {};
    })
    .catch((err) => console.log(err));
});

const confirmDelete = (cardId, cardElement) => {
  openPopup(deleteIcon);
  cardForDelete = {
    id: cardId,
    cardElement,
  };
};

const onLoading = (isLoading, button) => {
  isLoading
    ? (button.querySelector('.popup__button').textContent = 'Сохранение...')
    : (button.querySelector('.popup__button').textContent = 'Сохранить');
};

enableValidation(configValidation);
