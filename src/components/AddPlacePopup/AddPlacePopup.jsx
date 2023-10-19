import { createRef, useState, useEffect} from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup({onClose,isRenderLoading,isOpen,onAddPlace}){
  const namePlace = createRef();
  const linkPlace = createRef();
  const [nameDirty, setNameDyrty] = useState(false)
  const [nameError, setNameError] = useState("Поле не может быть пустым")
  const [linkDirty, setLinkDirty] = useState(false)
  const [linkError, setLinkError] = useState("Поле не может быть пустым")
  const [formVailed, setFormVailed] = useState(false)

  function bluerHandler(e){
    switch(e.target.name){
      case "name": 
        setNameDyrty(true)
        break
      case "link":
        setLinkDirty(true)
        break
    }
  }

  function handleChangeName() {
    if (namePlace.current.value.length < 2 || namePlace.current.value.length > 30) {
      setNameDyrty(true)
      setNameError('Название не может быть короче 2 символов или длинее 30 символов')
    if (!namePlace.current.value) {
      setNameError("Поле не может быть пустым")
      }
    } else {
      setNameError('')
    } 
  }  

  function handleChangeLink() {
    const urlPattern = new RegExp(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
    if (!urlPattern.test(linkPlace.current.value)) {
      setLinkDirty(true)
      setLinkError('Неверный адрес страницы')
      if (!linkPlace.current.value) {
        setLinkError("Поле не может быть пустым")
      }
    } else {
      setLinkError('')
    } 
  } 

  useEffect(() => {
    setNameDyrty(false)
    setLinkDirty(false)
    namePlace.current.value =""
    linkPlace.current.value =""
    setNameError("Поле не может быть пустым")
    setLinkError("Поле не может быть пустым")
    setFormVailed(false)
  }, [isOpen])

  useEffect(() => {
    if(linkError || nameError) {
      setFormVailed(false)
    } else {
      setFormVailed(true)
    }
  }, [linkError, nameError])
  
  // Ручка для Добавления картинки после сохранения
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: namePlace.current.value,
      link: linkPlace.current.value
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
      onDisabled={!formVailed}> 
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
          ref={namePlace}
          onBlur={bluerHandler}
          onChange={handleChangeName}
        />
        <span className={`popup__input-error title-input-error ${(nameDirty && nameError) && "popup__input-error_active"}`}>{nameError}</span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_link_text"
          id="url-input"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          ref={linkPlace}
          onBlur={bluerHandler}
          onChange={handleChangeLink}
          />
          <span className={`popup__input-error url-input-error ${(linkDirty && linkError) && "popup__input-error_active"}`}>{linkError}</span>
      </label>
    </PopupWithForm>
  )
}
