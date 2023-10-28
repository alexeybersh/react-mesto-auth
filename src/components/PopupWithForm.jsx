import { usePopupClose } from '../hooks/usePopupClose'

export default function PopupWithForm({name,title,submitText,children,isOpen,onClose,onSubmit,isValid}) {
  
  usePopupClose(isOpen, onClose)
 
  return (
    <div className={`popup popup_type_${name} ${isOpen? "popup_opened": ''}`}>
      <div className="popup__content">
        <button
          type="button"
          className={`popup__close-button popup__close-button_${name}`}  onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className={`popup__form popup__form_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
          type="submit"
          className={`popup__save-button popup__save-button_${name} ${isValid? '': 'popup__save-button_inactive'}`}
          >
            {submitText}
          </button>
        </form>
      </div>
    </div>
  )
}
