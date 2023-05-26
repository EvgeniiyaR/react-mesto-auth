import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

function Register(props) {
  return (
    <section className="form form_type_register">
      <AuthForm heading="Регистрация" buttonText="Зарегистрироваться" handleSubmit={props.handleRegister}>
        <p className="form__question">Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></p>
      </AuthForm>
    </section>
  )
}

export default Register;