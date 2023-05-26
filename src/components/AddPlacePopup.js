import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }

  function handleChange(e) {
    if (e.target.name === 'title') {
      setName(e.target.value);
    } else if (e.target.name === 'url') {
      setLink(e.target.value);
    }
  }

  return (
    <PopupWithForm name="add" title="Новое&nbsp;место" buttonText="Создать" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__input-label" htmlFor="title-input">
        <input className="popup__input popup__input_type_title" value={name || ''} onChange={handleChange} id="title-input" type="text" name="title" placeholder="Название" required minLength="2" maxLength="30" />
        <span className="title-input-error popup__input-error"></span>
      </label>
      <label className="popup__input-label" htmlFor="url-input">
        <input className="popup__input popup__input_type_url" value={link || ''} onChange={handleChange} id="url-input" type="url" name="url" placeholder="Ссылка на картинку" required />
        <span className="url-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;