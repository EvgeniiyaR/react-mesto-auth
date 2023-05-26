import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function Header(props) {
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  function handleBurger() {
    setIsOpenInfo(true);
  }

  function handleExitButtonInfo() {
    setIsOpenInfo(false);
  }

  function handleExitButtonInfoAndLogout() {
    props.handleSignOut();
    setIsOpenInfo(false);
  }

  return (
    <header className="header">
      {isOpenInfo &&
      <div className="header__info header__info_type_mobile">
        <p className="header__email">{props.userInfo.email}</p>
        <button className="header__logout-button" type="button" onClick={handleExitButtonInfoAndLogout}>Выйти</button>
      </div>
      }

      <div className={`header__container ${isOpenInfo && "header__container_type_mobile"}`}>
        <img className="header__logo" src={logo} alt="Логотип"/>
      {props.isLoggedIn ?
        <>
          {isOpenInfo ?
            <button className="header__exit-button" type="button" onClick={handleExitButtonInfo}></button>
            :
            <button className="header__burger" type="button" onClick={handleBurger}>
              <p className="header__line"></p>
              <p className="header__line"></p>
              <p className="header__line"></p>
            </button>
          }
          <nav>
            <ul className="header__list">
              <Routes>
                <Route path="/" element=
                {
                  <li className="header__info">
                    <p className="header__email">{props.userInfo.email}</p>
                    <button className="header__logout-button" type="button" onClick={handleExitButtonInfoAndLogout}>Выйти</button>
                  </li>
                } />
              </Routes>
            </ul>
          </nav>
        </>
        :
          <nav>
            <ul className="header__list">
              <Routes>
                <Route path="/sign-in" element={<li><Link className="header__link" to="/sign-up">Регистрация</Link></li>} />
                <Route path="/sign-up" element={<li><Link className="header__link" to="/sign-in">Войти</Link></li>} />
                <Route path="*" element=
                {
                  <>
                    <li><Link className="header__link" to="/sign-up">Регистрация</Link></li>
                    <li><Link className="header__link" to="/sign-in">Войти</Link></li>
                  </>
                } />
              </Routes>
            </ul>
          </nav>
        }
      </div>

    </header>
  )
}

export default Header;
