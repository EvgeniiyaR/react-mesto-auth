function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_type_img ${card.link && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button className="popup__exit-button" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <h2 className="popup__title">{card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;