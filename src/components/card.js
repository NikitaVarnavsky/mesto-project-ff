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
  // console.log(cardValue);
  // console.log(cardIsLike);
  // console.log(isLiked);
  // console.log(addLike);
  // console.log(removeLike);
  // console.log(cardImgModal);
  // console.log(cardLikes);
  // console.log(ownerName);
  // console.log(profileName);
  // console.log(confirmDelete);

  const cloneCard = cardTemplateContent.querySelector('.card').cloneNode(true);
  cloneCard.querySelector('.card__image').src = cardValue.link;
  cloneCard.querySelector('.card__image').alt = `Фотография места: ${cardValue.name}`;
  cloneCard.querySelector('.card__title').textContent = cardValue.name;
  cloneCard.querySelector('.quantity__likes').textContent = cardLikes.length;

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
  const cardImage = cloneCard.querySelector('.card__image');
  if (isLiked) {
    btnLike.classList.add('card__like-button_is-active');
  }

  let counterLike = cardLikes.length;

  btnLike.addEventListener('click', (e) => {
    if (!btnLike.classList.contains('card__like-button_is-active')) {
      addLike(cardValue._id).then((result) => {
        cloneCard.querySelector('.quantity__likes').textContent = result.likes.length;
        counterLike++;
      });
      cardIsLike(e);
    } else {
      removeLike(cardValue._id).then((result) => {
        counterLike--;
        cloneCard.querySelector('.quantity__likes').textContent = counterLike;
      });
      cardIsLike(e);
    }
  });

  cardImage.addEventListener('click', () => {
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
