const cardTemplateContent = document.querySelector('#card-template').content;

const createCard = (
  cardValue,
  deleteCard,
  cardIsLike,
  isLiked,
  addLike,
  removeLike,
  cardImgModal,
  cardLikes,
  ownerName,
  profileName,
  confirmDelete,
) => {
  const cloneCard = cardTemplateContent.querySelector('.card').cloneNode(true);
  const cardImg = cloneCard.querySelector('.card__image');
  const quantityLikes = cloneCard.querySelector('.quantity__likes');
  cardImg.src = cardValue.link;
  cardImg.alt = `Фотография места: ${cardValue.name}`;
  cloneCard.querySelector('.card__title').textContent = cardValue.name;
  quantityLikes.textContent = cardLikes.length;

  //Удаление карточки
  const btnDeleteCard = cloneCard.querySelector('.card__delete-button');
  if (ownerName !== profileName) {
    btnDeleteCard.style.display = 'none';
  }
  btnDeleteCard.addEventListener('click', (event) => {
    const cardForDelete = event.target.closest('.places__item');
    confirmDelete(cardValue._id, cardForDelete);
  });

  const btnLike = cloneCard.querySelector('.card__like-button');
  if (isLiked) {
    btnLike.classList.add('card__like-button_is-active');
  }

  let counterLike = cardLikes.length;

  btnLike.addEventListener('click', (e) => {
    if (!btnLike.classList.contains('card__like-button_is-active')) {
      addLike(cardValue._id)
        .then((result) => {
          quantityLikes.textContent = result.likes.length;
          counterLike++;
        })
        .catch((err) => `Ошибка: ${err}`);
      cardIsLike(e);
    } else {
      removeLike(cardValue._id)
        .then((result) => {
          counterLike--;
          quantityLikes.textContent = counterLike;
        })
        .catch((err) => `Ошибка: ${err}`);
      cardIsLike(e);
    }
  });

  cardImg.addEventListener('click', () => {
    cardImgModal(cardValue.name, cardValue.link);
  });

  return cloneCard;
};

const cardIsLike = (e) => {
  e.target.classList.toggle('card__like-button_is-active');
};

const deleteCard = (item) => {
  const currentCard = item.closest('.places__item');
  currentCard.remove();
};

export { createCard, deleteCard, cardIsLike };
