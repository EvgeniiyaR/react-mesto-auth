import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltipOk from './InfoTooltipOk';
import InfoTooltipError from './InfoTooltipError';
import NotFound from './NotFound';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isStatusOkPopupOpen, setStatusOkPopupOpen] = React.useState(false);
  const [isStatusErrorPopupOpen, setStatusErrorPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

  const navigate = useNavigate();

  function checkToken() {
    if (localStorage.getItem('token')) {
      auth.getInfo(localStorage.getItem('token'))
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          navigate('/');
          setUserInfo(res.data);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(`Возникла ошибка: ${err}`));
    }
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      setCurrentUser(userData);
      setCards([...initialCards]);
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }, []);

  React.useEffect(() => {
    checkToken();
  }, [isLoggedIn]);

  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setIsLoggedIn(true);
      navigate('/');
    }).catch(() => {
      setStatusErrorPopupOpen(true);
    });
  }

  function handleRegister(email, password) {
    auth.register(email, password)
    .then(() => {
      setStatusOkPopupOpen(true);
      navigate('/sign-in');
    })
    .catch(() => {
      setStatusErrorPopupOpen(true);
    });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

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
    setStatusOkPopupOpen(false);
    setStatusErrorPopupOpen(false);
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
          <Header isLoggedIn={isLoggedIn} userInfo={userInfo} handleSignOut={handleSignOut}/>
          <Routes>
            <Route path="/" element={<ProtectedRouteElement element={<Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} />} isLoggedIn={isLoggedIn} />} />
            <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm name="delete" title="Вы&nbsp;уверены?" buttonText="Да" />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <InfoTooltipOk isOpen={isStatusOkPopupOpen} onClose={closeAllPopups} />
        <InfoTooltipError isOpen={isStatusErrorPopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
