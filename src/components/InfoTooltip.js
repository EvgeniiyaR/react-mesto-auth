import imageSrcErr from '../images/icon-error.svg';
import imageSrcOk from '../images/icon-ok.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_status">
        <button className="popup__exit-button" type="button" onClick={props.onClose}></button>
        <div className="popup__wrapper">
          <img className="popup__img" src={props.isStatus ? imageSrcOk : imageSrcErr} alt={props.isStatus ? "Успешно" : "Ошибка"} />
          <h2 className="popup__label popup__label_type_status">{props.status}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;