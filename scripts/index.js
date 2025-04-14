// @todo: Темплейт карточки
const cardTemplateContent = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (currentCard, cardValue) => {
  currentCard.querySelector('.card__image').src = cardValue.link;
  currentCard.querySelector('.card__title').textContent = cardValue.name;
  cardsList.append(currentCard);
};

// @todo: Функция удаления карточки
const deleteCard = (item) => {
  const currentCard = item.parentElement;
  currentCard.remove();
};

// @todo: Вывести карточки на страницу

initialCards.map((card) => {
  const cloneCard = cardTemplateContent.querySelector('.card').cloneNode(true);
  const deleteCardButton = cloneCard.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', (event) => {
    deleteCard(event.target);
  });
  createCard(cloneCard, card);
});
