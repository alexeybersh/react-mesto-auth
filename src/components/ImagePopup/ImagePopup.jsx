export default function ImagePopup(props) {
  return (
    <>
      <div className={`popup popup_type_big-image popup_opacity ${props.isOpen? "popup_opened": ''}`}>
        <div className="popup__image-container">
          <button
            type="button"
            className="popup__close-button popup__close-button_image_close-button"
          ></button>
          <img className="popup__image" alt={props.card.name} src={props.card.link} />
          <h2 className="popup__image-title">{props.card.name}</h2>
        </div>
      </div>
    </>
  )
}

