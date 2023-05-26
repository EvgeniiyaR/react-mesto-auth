import AuthForm from './AuthForm';

function Login(props) {
  return (
    <section className="form">
      <AuthForm heading="Вход" buttonText="Войти" handleSubmit={props.handleLogin}/>
    </section>
  )
}

export default Login;
