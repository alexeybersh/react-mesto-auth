import imageSuccess from '../images/UnionBlack.svg'
import imageFaild from '../images/UnionRed.svg'
import { usePopupClose } from '../hooks/usePopupClose'


export default function InfoTooltip({isMessage,onClose}) {
  const {text, isSign} = isMessage
  
  usePopupClose(isMessage, onClose)

  return (
    <div className={`popup popup_type_info ${text? "popup_opened": ''}`}>
      <div className="popup__content popup__content_size">
        {isSign === '1' && <img src={imageSuccess} alt='Знак успешности'/>}
        {isSign === '0' && <img src={imageFaild} alt='Знак ошибки'/>}
        <button
          type="button"
          className={`popup__close-button`} onClick={onClose}></button>
        <h2 className="popup__title popup__title_size">{text}</h2>
      </div>
    </div>     
  )
}
