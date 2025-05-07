const cardTemplateContent = document.querySelector('#card-template').content;

const createCard = (cardValue, deleteCard, cardIsLike, cardImgModal) => {
  const cloneCard = cardTemplateContent.querySelector('.card').cloneNode(true);
  const deleteCardButton = cloneCard.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', (event) => {
    deleteCard(event.target);
  });
  cloneCard.querySelector('.card__image').src = cardValue.link;
  cloneCard.querySelector('.card__image').alt = `Фотография места: ${cardValue.name}`;
  cloneCard.querySelector('.card__title').textContent = cardValue.name;

  cloneCard.addEventListener('click', (e) => {
    cardIsLike(e);
    cardImgModal(e);
  });
  return cloneCard;
};

const deleteCard = (item) => {
  const currentCard = item.closest('.places__item');
  currentCard.remove();
};

export { createCard, deleteCard };
