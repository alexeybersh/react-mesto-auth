import { useState,useEffect, useResize} from 'react';
import{ Link } from 'react-router-dom'
import {  } from 'react';
import useWindowSize from '../hooks/useResize'

export default function Header({email,isEntryOrRegister,isLoggedIn,children,onSignOut}) {
  const [isVisable, setIsVisable] = useState(false)
  // let   [screenWidth, setScreenWidth] = useState(window.screen.width)
  const { width, height } = useWindowSize()
  const header = document.querySelector(".header__container");
  const mainPage = document.querySelector(".main-page");
  const footer = document.querySelector(".footer");

  // const screenWidth2= (window.screen.width)

  // window.addEventListener('resize',(e) => {
  //   setScreenWidth(window.screen.width);  
  // });

  useEffect(() =>{
    if(width <= 890 && mainPage){
      setIsVisable(false)
      mainPage.classList.add('main-page_active');
      footer.classList.add('footer_active');
      header.classList.add('header__container_active');  
    }    
    else if(mainPage) {
      setIsVisable(true)
      mainPage.classList.remove('main-page_active');
      footer.classList.remove('footer_active');
      header.classList.remove('header__container_active');  
      mainPage.classList.remove("main-page_inactive");
      footer.classList.remove("footer_inactive");
      header.classList.remove('header__container_active');  
    }
  },[width])


  function handleNavBarOpen(){
    setIsVisable(true)
    mainPage.classList.add("main-page_inactive");
    footer.classList.add("footer_inactive");
    header.classList.remove('header__container_active');  
  }

  function handleNavBarClose(){
    console.log('>>>');
    setIsVisable(false)
    mainPage.classList.remove("main-page_inactive");
    footer.classList.remove("footer_inactive");
    header.classList.add  ('header__container_active');  
  }

  return (
    <header className={`header ${!isVisable && 'header_active'}`}>
      <div className='header__container'>  
        {isLoggedIn && <div className='header__navbar' id="mobileNav" >
          <p className='header__text-email'>{email}</p>
          <Link to='/react-mesto-auth/sign-in' replace className='header__text_color' onClick={onSignOut}>Выйти</Link>
        </div>}
        <div className='header_container-logo'>  
          <div className="header__logo"></div>
          {!isLoggedIn && (
          <>
          {isEntryOrRegister? <Link to='/react-mesto-auth/sign-in' replace className='header__text'>Войти</Link>:
          <Link to='/react-mesto-auth/sign-up' replace className='header__text'>Регистрация</Link>}
          </>
          )}        
          {isLoggedIn && (
          <>
            {!isVisable? <button type='button' className="header__menu-btn" id="burger" onClick={handleNavBarOpen}>
              <span></span>
              <span></span>
              <span></span>
            </button>:
            <button type='button' className="header__close-button" id="burger" onClick={handleNavBarClose}>
            </button>}
            <p className='header__text-email' id="nav">{email}
              <Link to='/react-mesto-auth/sign-in' replace className='header__text_color' onClick={onSignOut}>Выйти</Link>
            </p>
          </>)}
        </div>
      </div>
      {children}
    </header>
  )
}