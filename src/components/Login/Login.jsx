import{ Link } from 'react-router-dom'
import Header from '../header/Header'
import { useState, createRef } from 'react'

export default function Login({onLogin}) {
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
    onLogin(isEmail, isPassword)
  }

  return (
    <>
      <Header>
        <Link to='/sign-up' className='header__text'>Регистрация</Link>
      </Header>
      <main>
        <h2 className='login__text-entry'>Вход</h2>
        <form className="login__form" onChange={handleChange} onSubmit={handleSubmit}>
          <input
            className="login__input"
            id="email-input"
            name="email"
            type="email"
            placeholder="Email"
            ref={inputEmail}
            // required
          />
          <input
            className="login__input"
            id="password-input"
            name="password"
            type="password"
            placeholder="Пароль"
            ref={inputPassword}
            // required  
          />
          <button className="login__save-button" type="submit">
            Войти
          </button>
        </form>
      </main>
    </>
  )
}
