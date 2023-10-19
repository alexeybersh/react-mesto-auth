import { useEffect, useState } from 'react'
import{ Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Register from './Register/Register'
import Login from './Login/Login'
import InfoTooltip from './InfoTooltip/InfoTooltip'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup'
import DeleteConfirmPopup from './DeleteConfirmPopup/DeleteConfirmPopup'
import ImagePopup from './ImagePopup/ImagePopup'
import {CurrentUserContext } from '../components/contexts/CurrentUserContext';
import { api } from '../utils/Api'
import { authApi } from '../utils/Auth'

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState({})
  const [renderLoading, setRenderLoading] = useState(false)
  const [cardDelete, setCardDelete] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMessage, setIsMessage] = useState({ text: '', isSign: '' })
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  // Ручка для открытия попапа аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  
  // Ручка для открытия попапа редактирование профиля
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }

  // Ручка для открытия попапа добавление картинки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteConfirmClick(card){
    setIsDeleteConfirmPopupOpen(true)
    setCardDelete(card)
  }

  // Ручка для открытия попапа большой картинки
  function handleCardClick (card) {
    setIsImagePopupOpen(true)
    setSelectedCard({name: card.name, link: card.link})
  }

  // Ручка закрытия всех попапов
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeleteConfirmPopupOpen(false)
    setIsMessage('')
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
    setRenderLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      
      .catch((err) => {console.log(err)})
      
      .finally(() => {
        setRenderLoading(false)
      }) 
  }

  // Ручка для обновления профиля
  function handleUpdateUser(newData){
    setRenderLoading(true)
    api.setUserInfo(newData)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })  
  
    .catch((err) => {console.log(err)})

    .finally(() => {
      setRenderLoading(false)
    }) 
  } 

  // Ручка для обновления аватара
  function handleUpdateAvatar(newData){
    setRenderLoading(true)
    api.setAvatar(newData)
    .then((data) => { 
      setCurrentUser(data)
      closeAllPopups()
    })  
  
    .catch((err) => {console.log(err)})

    .finally(() => {
      setRenderLoading(false)
    }) 
  }

  // Ручка для обновления картинки
  function handleAddPlaceSubmit(newData){
    setRenderLoading(true)
    api.createCard(newData)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()      
    })

    .catch((err) => {console.log(err)})

    .finally(() => {
      setRenderLoading(false)
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
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isDeleteConfirmPopupOpen || isImagePopupOpen || setIsMessage)
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
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isDeleteConfirmPopupOpen, isImagePopupOpen, setIsMessage])

  function auth(token) {
    authApi.getContent(token).then(() => {
      setIsLoggedIn(true)
      navigate('/')
    })
    .catch(() => {
      navigate('/sign-in')
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    auth(token)
  }, [])
  
  function hahdleLogin(email, password) {
    return authApi.authorize(email, password)
    .then((res) => {
      if (res.token) {

        setIsLoggedIn(true)
        localStorage.setItem('jwt', res.token)
        navigate('/')
      }
    })
    .catch((error) => {
      if(error === 'Ошибка: 400') {
        setIsMessage({
          text: 'не передано одно из полей', 
          isSign: '0'})
      }
      if(error === 'Ошибка: 401') {
        setIsMessage({
          text: 'пользователь с email не найден', 
          isSign: '0'})
      }
    })
  }

  function handleRegister(email, password) {
    return authApi.register(email, password)
    .then(() => {
      setIsMessage({
        text: 'Вы успешно зарегистрировались!', 
        isSign: '1'})
        navigate('/sign-in')
    })
    .catch((err) => {
      if (err === 'Ошибка: 400') {
        setIsMessage({
          text: 'Что-то пошло не так! Попробуйте ещё раз.', 
          isSign: '0'})
    }})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/sign-in' element={<Login onLogin={hahdleLogin}/>}
        />
        <Route path='/sign-up' element={<Register onRegister={handleRegister}/>}
        />
        <Route path='/' element={
          <ProtectedRoute loggedIn={isLoggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteConfirmClick}
              cards={ cards }
            />
          </ProtectedRoute>}
        />
      </Routes>
      {isLoggedIn && <Footer/>}
      <InfoTooltip
        isMessage={isMessage}
        onClose={closeAllPopups}/>
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
    </CurrentUserContext.Provider>
  )
}