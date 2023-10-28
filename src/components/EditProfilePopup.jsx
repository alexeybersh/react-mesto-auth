import { useEffect, useState, useContext} from 'react'
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation'


export default function EditProfilePopup({isOpen,onUpdateUser,isRenderLoading,onClose}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, setValues, handleChange, errors, isValid} = useFormAndValidation()

  // Эффект для заполнения формы
  useEffect(() =>{
    if(isOpen) {
      setValues({
        name: currentUser.name,
        job: currentUser.about
      })
     }
  },[isOpen])

    
   // Ручка для обновления информации после сохранения
    function handleSubmit(e) {
      e.preventDefault();

      onUpdateUser(values);
    } 

  return (
    <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        submitText={isRenderLoading? "Сохранить..." : "Сохранить"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isValid={isValid}>  
      <label className="popup__field">
        <input
          className="popup__input popup__input_input-name_text"
          id="name-input"
          name="name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className={`popup__input-error name-input-error ${(!isValid)? "popup__input-error_active": ''}`}>{errors.name}</span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_input-job_text"
          id="job-input"
          name="job"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          value={values.job || ""}
          onChange={handleChange}
        />
         <span className={`popup__input-error job-input-error ${(!isValid)? "popup__input-error_active": ''}`}>{errors.job}</span>
      </label>
    </PopupWithForm>
  )
}
