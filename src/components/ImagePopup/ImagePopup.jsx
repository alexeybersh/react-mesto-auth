export default function ImagePopup({card,isOpen}) {
  return (
    <>
      <div className={`popup popup_type_big-image popup_opacity ${isOpen? "popup_opened": ''}`}>
        <div className="popup__image-container">
          <button
            type="button"
            className="popup__close-button popup__close-button_image_close-button"
          ></button>
          <img className="popup__image" alt={card.name} src={card.link} />
          <h2 className="popup__image-title">{card.name}</h2>
        </div>
      </div>
    </>
  )
}

