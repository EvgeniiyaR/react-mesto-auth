import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__view">
          <button className="profile__avatar-container" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Карточки путешествий">
        <ul className="elements__list">
          {cards.map(({ _id, ...props }) => (
            <li className="elements__element" key={_id}>
              <Card card={props} id={_id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;