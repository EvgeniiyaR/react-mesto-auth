import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setAvatar('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar,
    });
  }

  function handleChange(e) {
    setAvatar(e.target.value);
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить&nbsp;аватар" buttonText="Сохранить" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__input-label" htmlFor="title-input">
        <input className="popup__input popup__input_type_avatar" value={avatar || ''} onChange={handleChange} id="avatar-input" type="url" name="avatar" placeholder="Ссылка на аватар" required />
        <span className="avatar-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;