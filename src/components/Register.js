import React from 'react';

function Register(props) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

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
    props.handleRegister(email, password)
  }

  return (
    <>
      <section className="form">
        <h1 className="form__heading">Регистрация</h1>
        <form className="form__form" onSubmit={handleSubmit}>
          <input className="form__input" type="email" value={formValue.email || ''} onChange={handleChange} name="email" placeholder="Email"></input>
          <input className="form__input" type="password" value={formValue.password || ''} onChange={handleChange} name="password" placeholder="Пароль"></input>
          <button className="form__button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="form__question">Уже зарегистрированы? <a className="form__link" href="/sign-in">Войти</a></p>
      </section>
    </>
  )
}

export default Register;