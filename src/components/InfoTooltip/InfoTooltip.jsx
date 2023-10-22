import ImageSuccess from '../../images/UnionBlack.svg'
import ImageFaild from '../../images/UnionRed.svg'


export default function InfoTooltip({isMessage,onClose}) {
  const {text, isSign} = isMessage
  return (
    <div className={`popup popup_type_info ${text? "popup_opened": ''}`}>
      <div className="popup__content popup__content_size">
        {isSign === '1' && <img src={ImageSuccess} alt='Знак успешности'/>}
        {isSign === '0' && <img src={ImageFaild} alt='Знак ошибки'/>}
        <button
          type="button"
          className={`popup__close-button`} onClick={onClose}></button>
        <h2 className="popup__title popup__title_size">{text}</h2>
      </div>
    </div>     
  )
}
