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

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  cardsList.append(card);
});
