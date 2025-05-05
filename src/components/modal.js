const overlayCloseClick = (elem) => {
  if (elem.target.classList.contains('popup')) {
    closePopup(elem.target);
  }
};

const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
};

// Открытие модального окна

const openPopup = (elem) => {
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

export { openPopup, closePopup, overlayCloseClick };
