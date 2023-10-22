import{ Link, useNavigate } from 'react-router-dom'
import Header from '../header/Header'
import { useState, useRef } from 'react'

export default function Register({onRegister}) {
  const inputEmail = useRef()
  const inputPassword = useRef()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(inputEmail.current.value, inputPassword.current.value)
  }

  return (  
    <>
      <Header>
        <Link to='/react-mesto-auth/sign-in' replace className='header__text'>Войти</Link>
      </Header>
      <main>
        <h2 className='login__text-entry'>Регистрация</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            id="email-input"
            name="email"
            type="email"
            placeholder="Email"
            ref={inputEmail}
          />
          <input
            className="login__input"
            id="password-input"
            name="password"
            type="password"
            placeholder="Пароль"
            ref={inputPassword}
          />
          <button className="login__save-button" type="submit">
            Зарегистрироваться
          </button>
          <Link to='/react-mesto-auth/sign-in' replace className='login__text'>Уже зарегистрированы? Войти</Link>
        </form>
      </main>
    </>
  )
}
