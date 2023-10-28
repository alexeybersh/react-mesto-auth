import{ Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import { useForm } from '../hooks/useForm' 

export default function Register({onRegister}) {
  const {values, handleChange} = useForm({});

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(values)
  }

  return (  
    <>
      <Header isEntryOrRegister={true}>        
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
            value={values.email || ''}
            onChange={handleChange}
          />
          <input
            className="login__input"
            id="password-input"
            name="password"
            type="password"
            placeholder="Пароль"
            value={values.password || ''}
            onChange={handleChange}
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
