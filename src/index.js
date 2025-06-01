import './pages/index.css';
// import { initialCards } from './scripts/cards.js';

import { openPopup, closePopup, overlayCloseClick } from './components/modal.js';
import { createCard, deleteCard, cardIsLike } from './components/card.js';

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

// const formSelector = document.querySelectorAll('.popup__form');
// const inputSelector = formElement.querySelectorAll('.popup__input');
// const submitButtonSelector = formElement.querySelector('.popup__button');

let userId;
let cardForDelete = {};

// Получение данных пользователя
const initialUser = () => {
  return getInitialUser().then((result) => {
    userId = result._id;
    profileTitleValue.textContent = result.name;
    profileDescription.textContent = result.about;
    profileImage.style['background-image'] = `url(${result.avatar})`;
  });
};
// initialUser();

// Рендер карточек

const initialCards = () => {
  return getInitialCards().then((result) => {
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
  });
};
// initialCards();

const initial = async () => {
  await initialUser();
  await initialCards();
};

initial();

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
});

profileAdd.addEventListener('click', (e) => {
  openPopup(popupNewCard);
});

currentImgProfile.addEventListener('click', (e) => {
  openPopup(newImg);
});

formImgProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  currentImgProfile.style['background-image'] = `url(${inputImgProfile.value})`;
  setProfile(inputImgProfile.value);
  inputImgProfile.value = '';
  closePopup(newImg);
});

formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitleValue.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  submitDataProfile(inputName.value, inputDescription.value);
  closePopup(popupEdit);
});

formNewPlace.addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.querySelector('.popup__button').textContent = 'Сохранение...';
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
      closePopup(popupNewCard);
    })
    .finally(() => {
      e.target.querySelector('.popup__button').textContent = 'Сохранить';
    });
});

formDeleteCard.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log(cardForDelete);
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

const inputNameError = popupEdit.querySelector(`.${inputName.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('form__input_type_error');
  errorElement.classList.add('input__name-error-active');
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('input__name-error-active');
  errorElement.textContent = '';
};

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  const regex = /[^A-Za-zА-Яа-я\s-]+$/;
  const errorRegexValid = inputElement.getAttribute('data-error-message');
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else if (regex.test(`${inputElement.value}`)) {
    showInputError(formElement, inputElement, errorRegexValid);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((form) => {
    setEventListener(form);
  });
};

enableValidation();
