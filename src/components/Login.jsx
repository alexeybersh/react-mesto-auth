import{ Link } from 'react-router-dom'
import Header from './Header'
import { useForm } from '../hooks/useForm' 

export default function Login({onLogin}) {
  const {values, handleChange} = useForm({});

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLogin(values)
  }

  return (
    <>
      <Header isEntryOrRegister={false}>
      </Header>
      <main>
        <h2 className='login__text-entry'>Вход</h2>
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
            Войти
          </button>
        </form>
      </main>
    </>
  )
}
