import { useEffect} from 'react'
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from '../hooks/useFormAndValidation'

export default function AddPlacePopup({onClose,isRenderLoading,isOpen,onAddPlace}){
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

  // Эффект для очистки формы
  useEffect(() =>{
    if(!isOpen) {
      resetForm();
    }
  },[isOpen, resetForm])

 
  // Ручка для Добавления картинки после сохранения
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      submitText={isRenderLoading? "Сохранить..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <label className="popup__field">
        <input
          className="popup__input popup__input_input-name-image_text"
          id="title-input"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className={`popup__input-error title-input-error ${(!isValid) && "popup__input-error_active"}`}>{errors.name}</span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_link_text"
          id="url-input"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={values.link || ''}
          onChange={handleChange}
          />
          <span className={`popup__input-error url-input-error ${(!isValid) && "popup__input-error_active"}`}>{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}
