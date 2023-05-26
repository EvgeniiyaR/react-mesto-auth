import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  function handleChange(e) {
    if (e.target.name === 'author') {
      setName(e.target.value);
    } else if (e.target.name === 'about') {
      setDescription(e.target.value);
    }
  }

  return (
    <PopupWithForm name="edit" title="Редактировать&nbsp;профиль" buttonText="Сохранить" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__input-label" htmlFor="author-input">
        <input className="popup__input popup__input_type_name" id="author-input" value={name || ''} onChange={handleChange} type="text" name="author" placeholder="Имя" required minLength="2" maxLength="40"/>
        <span className="author-input-error popup__input-error"></span>
      </label>
      <label className="popup__input-label" htmlFor="about-input">
        <input className="popup__input popup__input_type_about" id="about-input" value={description || ''} onChange={handleChange} type="text" name="about" placeholder="О себе" required minLength="2" maxLength="200"/>
        <span className="about-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;