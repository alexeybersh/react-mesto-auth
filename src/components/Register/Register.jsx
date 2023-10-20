import{ Link, useNavigate } from 'react-router-dom'
import Header from '../header/Header'
import { useState, createRef } from 'react'

export default function Register({onRegister}) {
  const inputEmail = createRef()
  const inputPassword = createRef()

  const [isEmail, setIsEmail] = useState('')
  const [isPassword, setIsPassword] = useState('')

  const handleChange = (event) => {
    setIsEmail(inputEmail.current.value);
    setIsPassword(inputPassword.current.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(isEmail, isPassword)
  }

  return (  
    <>
      <Header>
        <Link to='/react-mesto-auth/sign-in' replace className='header__text'>Войти</Link>
      </Header>
      <main>
        <h2 className='login__text-entry'>Регистрация</h2>
        <form className="login__form" onChange={handleChange} onSubmit={handleSubmit}>
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
          <Link to='/react-mesto-auth/sign-in' className='login__text'>Уже зарегистрированы? Войти</Link>
        </form>
      </main>
    </>
  )
}
