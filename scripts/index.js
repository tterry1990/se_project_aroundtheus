const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

// Buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form Data
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  evt.target.reset();
  closeModal(addCardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const previewImage = document.querySelector(".modal__image");

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const imageCaption = document.querySelector(".modal__title");
  // add event listener to the delete button
  // cardElement.remove() when this button gets clicked

  // add click listener to cardImage element
  // open modal with previewImageModal

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    imageCaption.textContent = data.name;
    openModal(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

// Form Listeners
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector("#preview-modal-close");
previewImageModalClose.addEventListener("click", () => {
  closeModal(previewImageModal);
});

profileModalCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

// add new card
addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
