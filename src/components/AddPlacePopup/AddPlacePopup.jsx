import { createRef, useState, useEffect} from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup(props) {
  const namePlace = createRef();
  const linkPlace = createRef();
  const [nameDirty, setNameDyrty] = useState(0)
  const [nameError, setNameError] = useState("Поле не может быть пустым")
  const [linkDirty, setLinkDirty] = useState(0)
  const [linkError, setLinkError] = useState("Поле не может быть пустым")
  const [formVailed, setFormVailed] = useState(0)

  function bluerHandler(e){
    switch(e.target.name){
      case "name": 
        setNameDyrty(1)
        break
      case "link":
        setLinkDirty(1)
        break
    }
  }

  function handleChangeName() {
    if (namePlace.current.value.length < 2 || namePlace.current.value.length > 30) {
      setNameDyrty(1)
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
      setLinkDirty(1)
      setLinkError('Неверный адрес страницы')
      if (!linkPlace.current.value) {
        setLinkError("Поле не может быть пустым")
      }
    } else {
      setLinkError('')
    } 
  } 

  useEffect(() => {
    setNameDyrty(0)
    setLinkDirty(0)
    namePlace.current.value =""
    linkPlace.current.value =""
    setNameError("Поле не может быть пустым")
    setLinkError("Поле не может быть пустым")
    setFormVailed(0)
  }, [props.isOpen])

  useEffect(() => {
    if(linkError || nameError) {
      setFormVailed(0)
    } else {
      setFormVailed(1)
    }
  }, [linkError, nameError])
  
  // Ручка для Добавления картинки после сохранения
  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: namePlace.current.value,
      link: linkPlace.current.value
    });
  }
 
  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      submitText={props.isRenderLoading? "Сохранить..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
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
