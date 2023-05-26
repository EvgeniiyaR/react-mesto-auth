import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      <nav>
        <ul className='header__list'>
          {
            location.pathname === "/" &&
            <li className='header__info'>
              <p className='header__email'>{props.userInfo.email}</p>
              <button className='header__btn-logout' type="button" onClick={props.handleSignOut}>Выйти</button>
            </li>
          }
          {location.pathname === "/sign-in" && <li><Link className='header__link' to="/sign-up">Регистрация</Link></li>}
          {location.pathname === "/sign-up" && <li><Link className='header__link' to="/sign-in">Войти</Link></li>}
        </ul>
      </nav>
    </header>
  )
}

export default Header;