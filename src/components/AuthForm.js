import { useState } from 'react';

function AuthForm(props) {

  const [formValue, setFormValue] = useState({
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
    props.handleSubmit(email, password);
  }

  return (
    <>
      <h1 className="form__heading">{props.heading}</h1>
      <form className="form__form" onSubmit={handleSubmit}>
        <input className="form__input" type="email" value={formValue.email || ''} onChange={handleChange} name="email" placeholder="Email"></input>
        <input className="form__input" type="password" value={formValue.password || ''} onChange={handleChange} name="password" placeholder="Пароль"></input>
        <button className="form__button" type="submit">{props.buttonText}</button>
      </form>
      {props.children}
    </>
  )
}

export default AuthForm;