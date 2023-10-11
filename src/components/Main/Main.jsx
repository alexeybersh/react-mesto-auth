import { useContext} from 'react';
import Card from '../Card/Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
const currentUser = useContext(CurrentUserContext);

return (
  <>
    <main className="main-page">
      <section className="profile">
        <div className="profile__intro">
          <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля"/>
          </button>
          <div className="profile__profile-info">
            <div className="profile__first-row">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              card={card}
              key= {card._id} 
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
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

