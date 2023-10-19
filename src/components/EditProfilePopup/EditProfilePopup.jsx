import { useEffect, useState, useContext} from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfilePopup({isOpen,onUpdateUser,isRenderLoading,onClose}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('')
    const [description  , setDescription  ] = useState('')  
    const [nameDirty, setNameDyrty] = useState(false)
    const [nameError, setNameError] = useState('')
    const [jobDirty, setJobDirty] = useState(false)
    const [jobError, setJobError] = useState('')
    const [formVailed, setFormVailed] = useState(false)
  
    function bluerHandler(e){
      switch(e.target.name){
        case "name": 
          if(!name) setNameDyrty(true)
          break
        case "job":
          if(!description) setJobDirty(true)
          break
      }
    }

    // Ручка для отслеживания изменений в имени профеля
    function handleNameChange(e) {
      setName(e.target.value);
      if (e.target.value.length < 2 || e.target.value.length > 40) {
        setNameDyrty(true)
        setNameError('Имя не может быть короче 2 символов или длинее 40 символов')
      if (!e.target.value) {
        setNameError("Поле не может быть пустым")
        }
      } else {
        setNameError('')
      } 
    }  

    // Ручка для отслеживания изменений в о себе профиля
    function handledDescriptionChange(e) {
      setDescription(e.target.value);
      if (e.target.value.length < 2 || e.target.value.length > 200) {
        setJobDirty(true)
        setJobError('Название не может быть короче 2 символов или длинее 200 символов')
        if (!e.target.value) {
          setJobError("Поле не может быть пустым")
        }
      } else {
        setJobError('')
      } 
    }
    
    // Эффект для вставки текущий ниформации в попап
    useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser]);

    useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setNameDyrty(false)
      setJobDirty(false)
      setFormVailed(false)
    }, [isOpen])
  
    useEffect(() => {
      if((nameError || jobError))  {
        setFormVailed(false)
      } else {
        setFormVailed(true)
      }
    }, [name, description])
    
   // Ручка для обновления информации после сохранения
    function handleSubmit(e) {
      e.preventDefault();

      onUpdateUser({
        name,
        job: description,
      });
    } 

  return (
    <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        submitText={isRenderLoading? "Сохранить..." : "Сохранить"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        onDisabled={!formVailed}>  
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
          value={name || ""}
          onBlur={bluerHandler}
          onChange={handleNameChange}
        />
        <span className={`popup__input-error name-input-error ${(nameDirty && nameError)? "popup__input-error_active": ''}`}>{nameError}</span>
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
          value={description || ""}
          onBlur={bluerHandler}
          onChange={handledDescriptionChange}
        />
         <span className={`popup__input-error job-input-error ${(jobDirty && jobError)? "popup__input-error_active": ''}`}>{jobError}</span>
      </label>
    </PopupWithForm>
  )
}
