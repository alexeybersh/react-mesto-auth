import { useEffect } from 'react'
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from '../hooks/useFormAndValidation'

export default function EditAvatarPopup({isOpen,isRenderLoading,onUpdateAvatar,onClose}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

  // Эффект для очистки формы
  useEffect(() =>{
    if(!isOpen) {
      resetForm();
    }
  },[isOpen, resetForm])

  // Ручка для обновления информации после сохранения
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      link: values.avatarLink
    });
  } 
  
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitText={isRenderLoading? "Сохранить..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>      
      <label className="popup__field">
        <input
          className="popup__input popup__input_link_text"
          id="avatar-input"
          name="avatarLink"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={values.avatarLink || ''}
          onChange={handleChange}
          />
          <span className={`popup__input-error title-input-error ${(!isValid) && "popup__input-error_active"}`}>{errors.avatarLink}</span>
      </label>
    </PopupWithForm>
  )
}
