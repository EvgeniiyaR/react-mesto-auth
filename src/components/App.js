import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      setCurrentUser(userData);
      setCards([...initialCards]);
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleCardLike(card, id) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    function setCardsMap(newCard) {
      setCards((state) => state.map((item) => item._id === id ? newCard : item))
    }
    if (!isLiked) {
      api.addLikeCard(id)
      .then((newCard) => setCardsMap(newCard))
      .catch((err) => console.log(`Возникла ошибка: ${err}`));
    } else {
      api.deleteLikeCard(id)
      .then((newCard) => setCardsMap(newCard))
      .catch((err) => console.log(`Возникла ошибка: ${err}`));
    }
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
    .then(() => setCards((state) => state.filter((item) => id !== item._id)))
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  function handleUpdateUser(objInfo) {
    api.editUserInfo(objInfo.name, objInfo.about)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      setIsEditProfilePopupOpen(false);
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  function handleUpdateAvatar(objInfo) {
    api.editUserAvatar(objInfo.avatar)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      setIsEditAvatarPopupOpen(false);
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  function handleAddPlaceSubmit(objInfo) {
    api.addNewCard(objInfo.name, objInfo.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      setIsAddPlacePopupOpen(false);
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} />
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm name="delete" title="Вы&nbsp;уверены?" buttonText="Да" />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
