import { useEffect, useState } from 'react'
import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup'
import DeleteConfirmPopup from './DeleteConfirmPopup/DeleteConfirmPopup'
import ImagePopup from './ImagePopup/ImagePopup'
import {CurrentUserContext } from '../components/contexts/CurrentUserContext';
import { api } from '../utils/Api'

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(0)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(0)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(0)
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(0)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(0)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState({})
  const [renderLoading, setRenderLoading] = useState(0)
  const [cardDelete, setCardDelete] = useState({})


  // Ручка для открытия попапа аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(1)
  }
  
  // Ручка для открытия попапа редактирование профиля
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(1)
  }

  // Ручка для открытия попапа добавление картинки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(1)
  }

  function handleDeleteConfirmClick(card){
    setIsDeleteConfirmPopupOpen(1)
    setCardDelete(card)
  }

  // Ручка для открытия попапа большой картинки
  function handleCardClick (card) {
    setIsImagePopupOpen(1)
    setSelectedCard({name: card.name, link: card.link})
  }

  // Ручка закрытия всех попапов
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(0)
    setIsEditProfilePopupOpen(0)
    setIsAddPlacePopupOpen(0)
    setIsImagePopupOpen(0)
    setIsDeleteConfirmPopupOpen(0)
  }

  // Ручка для установки лайка
  function handleCardLike(card){
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked){
    api.isLikeAdd(card._id)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));    
      })

      .catch((err) => {console.log(err)})   
    } else {
      api.isLikeRemove(card._id)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));    
      })

      .catch((err) => {console.log(err)})   
    }
  } 

  // Ручка для удаления карточки
  function handleCardDelete(card){
    setRenderLoading(1)
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      
      .catch((err) => {console.log(err)})
      
      .finally(() => {
        setRenderLoading(0)
      }) 
  }

  // Ручка для обновления профиля
  function handleUpdateUser(newData){
    setRenderLoading(1)
    api.setUserInfo(newData)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })  
  
    .catch((err) => {console.log(err)})

    .finally(() => {
      setRenderLoading(0)
    }) 
  } 

  // Ручка для обновления аватара
  function handleUpdateAvatar(newData){
    setRenderLoading(1)
    api.setAvatar(newData)
    .then((data) => { 
      setCurrentUser(data)
      closeAllPopups()
    })  
  
    .catch((err) => {console.log(err)})

    .finally(() => {
      setRenderLoading(0)
    }) 
  }

  // Ручка для обновления картинки
  function handleAddPlaceSubmit(newData){
    setRenderLoading(1)
    api.createCard(newData)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()      
    })

    .catch((err) => {console.log(err)})

    .finally(() => {
      setRenderLoading(0)
    }) 
  }
  
  // Эффект для получения по апи информации о юзере и массив картинок
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([userData, allCards]) => {
      setCurrentUser(userData);
       setCards(allCards.reverse());
    })

    .catch((err) => {console.log(err)})
  }, [])

  // Эффект для закрытия попапа по ESC и по overlay
  useEffect(() => {
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isDeleteConfirmPopupOpen || isImagePopupOpen)
    {
      function handleEscape(evt) {
        if(evt.key == 'Escape') {
          closeAllPopups()
        }        
      }

      function handleOverlay(evt) {
        if(evt.target.classList.contains('popup_opened') !==  evt.target.classList.contains('popup__close-button')) {
          closeAllPopups()
        };
      }    

      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleOverlay)

      return() => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('mousedown', handleOverlay)  
      }
    }    
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isDeleteConfirmPopupOpen, isImagePopupOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteConfirmClick}
        cards={ cards }/>      
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
        isRenderLoading={renderLoading}/>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closeAllPopups}
        isRenderLoading={renderLoading}/>  
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
        isRenderLoading={renderLoading}/>  
      <DeleteConfirmPopup
        isOpen={isDeleteConfirmPopupOpen}
        onClose={closeAllPopups}
        cardDelete={cardDelete}
        onDeleteSubmit={handleCardDelete}
        isRenderLoading={renderLoading}/>
      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}>
      </ImagePopup>
      <Footer/>
    </CurrentUserContext.Provider>
  )
}