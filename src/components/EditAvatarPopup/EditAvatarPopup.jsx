import {createRef, useState, useEffect } from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup(props) {
  const avatarLink = createRef();
  const [linkDirty, setLinkDirty] = useState(0)
  const [linkError, setLinkError] = useState("Поле не может быть пустым")
  const [formVailed, setFormVailed] = useState(0)
  
  function bluerHandler(){
    setLinkDirty(1)
  }

  function handleChangeLink() {
    const urlPattern = new RegExp(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
    if (!urlPattern.test(avatarLink.current.value)) {
      setLinkDirty(1)
      setLinkError('Неверный адрес страницы')
      if (!avatarLink.current.value) {
        setLinkError("Поле не может быть пустым")
      }
    } else {
      setLinkError('')
    } 
  }

  useEffect(() => {
    setLinkDirty(0)
    avatarLink.current.value =""
    setLinkError("Поле не может быть пустым")
    setFormVailed(0)
  }, [props.isOpen])

  useEffect(() => {
    if(linkError) {
      setFormVailed(0)
    } else {
      setFormVailed(1)
    }
  }, [linkError])

  // Ручка для обновления информации после сохранения
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      link: avatarLink.current.value
    });
  } 
  
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitText={props.isRenderLoading? "Сохранить..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onDisabled={!formVailed}>      
      <label className="popup__field">
        <input
          className="popup__input popup__input_link_text"
          id="avatar-input"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          ref={avatarLink}
          onBlur={bluerHandler}
          onChange={handleChangeLink}
          />
          {(linkDirty && linkError)? <span className="popup__input-error avatar-input-error popup__input-error_active">{linkError}</span>: ''}
      </label>
    </PopupWithForm>
  )
}
