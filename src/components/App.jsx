import { useEffect, useState } from 'react'
import{ Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import InfoTooltip from './InfoTooltip'
import Main from './Main'
import Footer from './Footer'
import ProtectedRoute from './ProtectedRoute'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeleteConfirmPopup from './DeleteConfirmPopup'
import ImagePopup from './ImagePopup'
import {CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api'
import { authApi } from '../utils/Auth'

export default function App() {
  const loggenInFromStorage = JSON.parse(localStorage.getItem('isLoggenIn'))
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
  const [isLoggedIn, setIsLoggedIn] = useState(loggenInFromStorage)
  const [isMessage, setIsMessage] = useState({ text: '', isSign: '' })
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

  // Ручка для для попапа подтверждения удаления
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

      .catch((console.error))   
    } else {
      api.isLikeRemove(card._id)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));    
      })

      .catch(console.error)   
    }
  } 

  // Универсальная функция запроса
  function handleSubmit(request) {
    setRenderLoading(true);
    request()
      .then(closeAllPopups)

      .catch(console.error)

      .finally(() => setRenderLoading(false));
  }

  // Ручка для обновления профиля
  function handleUpdateUser(newData){
    function makeRequest() {
      return api.setUserInfo(newData).then(setCurrentUser)
    }
    handleSubmit(makeRequest)
  }

  // Ручка для обновления аватара
  function handleUpdateAvatar(newData){
    function makeRequest() {
      return api.setAvatar(newData).then(setCurrentUser)
    }
    handleSubmit(makeRequest)
  }

  // Ручка для обновления картинки
  function handleAddPlaceSubmit(newData){
    function makeRequest() {
      return api.createCard(newData).then((newCard) => setCards([newCard, ...cards]))
    }
    handleSubmit(makeRequest)
  }

  // Ручка для удаления карточки
  function handleCardDelete(card){
    function makeRequest() {
      console.log(cards);
      return api.deleteCard(card._id).then(() => setCards(cards.filter((c) => c._id !== card._id)))
    }
    handleSubmit(makeRequest)
  }

  // Эффект для получения по апи информации о юзере и массив картинок
  useEffect(() => {
    if (isLoggedIn){
      Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([userData, allCards]) => {
        setCurrentUser(userData);
        setCards(allCards.reverse());
      })

      .catch(console.error)
    }
  }, [isLoggedIn])

  function auth(token) {
    authApi.getContent(token).then(() => {
      localStorage.setItem('isLoggenIn', JSON.stringify(true))
      setIsLoggedIn(true)
      navigate('/react-mesto-auth', {replace: true})
    })
    .catch(() => {
      localStorage.setItem('isLoggenIn', JSON.stringify(false))
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token) {    
      auth(token)
    }
  }, [])
  
  function handleLogin({email, password}) {
    console.log(email, password);
    localStorage.setItem('email', email)
    return authApi.authorize(email, password)
    .then((res) => {
      if (res.token) {
        setIsLoggedIn(true)
        localStorage.setItem('jwt', res.token)
        localStorage.setItem('isLoggenIn', JSON.stringify(true))
        navigate('/react-mesto-auth' , {replece: true})
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

  function handleRegister({email, password}) {
    return authApi.register(email, password)
    .then(() => {
      setIsMessage({
        text: 'Вы успешно зарегистрировались!', 
        isSign: '1'})
        navigate('/react-mesto-auth/sign-in', {replece: true})
    })
    .catch((err) => {
      setIsMessage({
        text: 'Что-то пошло не так! Попробуйте ещё раз.', 
        isSign: '0'
      })
    })
  }

  function onSignOut(){
    localStorage.clear()
    setIsLoggedIn(false)
    setCards([]);    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/react-mesto-auth/sign-in' element={<Login onLogin={handleLogin}/>}
        />
        <Route path='/react-mesto-auth/sign-up' element={<Register onRegister={handleRegister}/>}
        />
       <Route path='/react-mesto-auth' element={
          <ProtectedRoute loggedIn={isLoggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              email={localStorage.getItem('email')}
              onCardDelete={handleDeleteConfirmClick}
              onSignOut={onSignOut}
              cards={ cards }
            />
          </ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? '/react-mesto-auth' : '/react-mesto-auth/sign-in'} />}
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