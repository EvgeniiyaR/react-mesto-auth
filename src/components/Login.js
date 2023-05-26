import React from 'react';

function Login(props) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    const { email, password } = formValue;
    e.preventDefault();
    props.handleLogin(email, password)
    .catch((err) => setErrorMessage(err));
  }

  return (
    <section className="form">
      <h1 className="form__heading">Вход</h1>
      <form className="form__form" onSubmit={handleSubmit}>
        <input className="form__input" type="email" value={formValue.email || ''} onChange={handleChange} name="email" placeholder="Email"></input>
        <input className="form__input" type="password" value={formValue.password || ''} onChange={handleChange} name="password" placeholder="Пароль"></input>
        <button className="form__button" type="submit">Войти</button>
        <p>{errorMessage}</p>
      </form>
    </section>
  )
}

export default Login;
