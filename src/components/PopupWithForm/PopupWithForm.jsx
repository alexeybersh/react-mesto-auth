export default function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen? "popup_opened": ''}`}>
        <div className="popup__content">
          <button
            type="button"
            className={`popup__close-button popup__close-button_${props.name}`}  onClick={props.onClose}></button>
          <h2 className="popup__title">{props.title}</h2>
          <form
            name={props.name}
            className={`popup__form popup__form_${props.name}`}
            onSubmit={props.onSubmit}
            noValidate
          >
            {props.children}
            <button
            type="submit"
            className={`popup__save-button popup__save-button_${props.name} ${props.onDisabled? 'popup__save-button_inactive': ''}`}
            >
              {props.submitText}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
