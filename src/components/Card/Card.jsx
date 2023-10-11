import { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__group-button ${isLiked && 'elements__group-button_active'}` );

  // Ручка для отображения большой картинки 
  function handleClick() {
    props.onCardClick(props.card);
  } 

  // Ручка для установки лайка
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  // Ручка для удаления картички
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  } 

  return (
    <>
      <li className="elements__element">
        {isOwn &&  <img src='../src/images/Trash.svg' alt="Корзина" className="elements__trash" onClick={handleDeleteClick}/>}
        <img className="elements__masc-group" src={props.cardLink} alt={props.cardName} onClick={handleClick}/>
        <div className="elements__description">
          <h2 className="elements__title">{props.cardName}</h2>
          <div className="elements__group-like">
           <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="elements__count-like">{props.card.likes.length? props.card.likes.length: 0}</p>
          </div>
        </div>
      </li>
    </>
  )
}
