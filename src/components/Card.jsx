import { useContext } from 'react';
import imageTrash from '../images/trash.svg';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({card,cardLink,cardName,onCardClick,onCardLike,onCardDelete,handleDeleteClick}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__group-button ${isLiked && 'elements__group-button_active'}` );

  // Ручка для отображения большой картинки 
  function handleClick() {
    onCardClick(card);
  } 

  // Ручка для установки лайка
  function handleLikeClick() {
    onCardLike(card);
  }

  // Ручка для удаления картички
  function handleDeleteClick() {
    onCardDelete(card)
  } 

  return (
    <li className="elements__element">
      {isOwn &&  <img src={imageTrash} alt="Корзина" className="elements__trash" onClick={handleDeleteClick}/>}
      <img className="elements__masc-group" src={cardLink} alt={cardName} onClick={handleClick}/>
      <div className="elements__description">
        <h2 className="elements__title">{cardName}</h2>
        <div className="elements__group-like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="elements__count-like">{card.likes.length? card.likes.length: 0}</p>
        </div>
      </div>
    </li>
  )
}
