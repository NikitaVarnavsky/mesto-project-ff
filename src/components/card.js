import { openPopup } from './modal.js';

const cardTemplateContent = document.querySelector('#card-template').content;
const popupImg = document.querySelector('.popup_type_image');
const currentImageCard = popupImg.querySelector('.popup__image');
const nameCard = popupImg.querySelector('.popup__caption');

const createCard = (cardValue, deleteCard, cardIsLike, cardImgModal) => {
  const cloneCard = cardTemplateContent.querySelector('.card').cloneNode(true);
  const deleteCardButton = cloneCard.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', (event) => {
    deleteCard(event.target);
  });
  cloneCard.querySelector('.card__image').src = cardValue.link;
  cloneCard.querySelector('.card__image').alt = `Фотография места: ${cardValue.name}`;
  cloneCard.querySelector('.card__title').textContent = cardValue.name;

  const btnLike = cloneCard.querySelector('.card__like-button');
  const cardImage = cloneCard.querySelector('.card__image');

  btnLike.addEventListener('click', cardIsLike);
  cardImage.addEventListener('click', cardImgModal);

  return cloneCard;
};

const cardImgModal = (e) => {
  currentImageCard.src = e.target.src;
  popupImg.querySelector('img').alt = e.target.alt;
  openPopup(popupImg);
  nameCard.textContent = e.currentTarget.closest('.card').querySelector('.card__title').textContent;
};

const cardIsLike = (e) => {
  e.target.classList.toggle('card__like-button_is-active');
};

const deleteCard = (item) => {
  const currentCard = item.closest('.places__item');
  currentCard.remove();
};

export { createCard, deleteCard, cardIsLike, cardImgModal };
