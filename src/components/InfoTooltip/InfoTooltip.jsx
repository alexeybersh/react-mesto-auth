export default function InfoTooltip({isMessage,onClose}) {
  const {text, isSign} = isMessage
  return (
    <>
      <div className={`popup popup_type_info ${text? "popup_opened": ''}`}>
        <div className="popup__content popup__content_size">
          {isSign === '1' && <img src='../src/images/UnionBlack.svg' alt="black" className='popup__image-info'></img>}
          {isSign === '0' && <img src='../src/images/UnionRed.svg' alt="red" className='popup__image-info'></img>}
          <button
            type="button"
            className={`popup__close-button`} onClick={onClose}></button>
          <h2 className="popup__title popup__title_size">{text}</h2>
        </div>
      </div>     
    </>
  )
}
