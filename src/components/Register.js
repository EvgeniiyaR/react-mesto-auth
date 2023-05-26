import React from 'react';
import AuthForm from './AuthForm';

function Register(props) {
  return (
    <section className="form form_type_register">
      <AuthForm heading="Регистрация" buttonText="Зарегистрироваться" handleSubmit={props.handleRegister}>
        <p className="form__question">Уже зарегистрированы? <a className="form__link" href="/sign-in">Войти</a></p>
      </AuthForm>
    </section>
  )
}

export default Register;