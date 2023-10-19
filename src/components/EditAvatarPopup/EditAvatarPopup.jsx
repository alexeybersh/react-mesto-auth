import {createRef, useState, useEffect } from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup({isOpen,isRenderLoading,onUpdateAvatar,onClose}) {
  const avatarLink = createRef();
  const [linkDirty, setLinkDirty] = useState(false)
  const [linkError, setLinkError] = useState("Поле не может быть пустым")
  const [formVailed, setFormVailed] = useState(false)
  
  function bluerHandler(){
    setLinkDirty(true)
  }

  function handleChangeLink() {
    const urlPattern = new RegExp(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
    if (!urlPattern.test(avatarLink.current.value)) {
      setLinkDirty(true)
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
    setFormVailed(false)
  }, [isOpen])

  useEffect(() => {
    if(linkError) {
      setFormVailed(false)
    } else {
      setFormVailed(true)
    }
  }, [linkError])

  // Ручка для обновления информации после сохранения
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      link: avatarLink.current.value
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
