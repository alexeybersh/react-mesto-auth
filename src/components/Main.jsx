import { useContext, useState} from 'react';
import{ Link } from 'react-router-dom'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';

export default function Main({cards,email,onEditAvatar,onEditProfile,onAddPlace,onCardClick,onCardLike,onCardDelete,onSignOut}) {
const {avatar,name,about} = useContext(CurrentUserContext);

return (
  <>
    <Header
      isLoggedIn={true}
      email={email}
      onSignOut={onSignOut}>
    </Header>
    <main className="main-page">
      <section className="profile">
        <div className="profile__intro"> 
          <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
            <img className="profile__avatar" src={avatar} alt="Аватар профиля"/>
          </button>
          <div className="profile__profile-info">
            <div className="profile__first-row">
              <h1 className="profile__title">{name}</h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key= {card._id} 
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              cardLink={card.link}
              cardName={card.name}
              >
            </Card>
          ))}
        </ul>
      </section>
    </main>
  </>
)
}

