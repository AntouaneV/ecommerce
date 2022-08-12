import React from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../features/userSlice';
import Lottie from 'react-lottie';
import animationUserM from '../lotties/Navbar/35756-user-profile-man.json';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationUserM,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt=""
            width="112"
            height="28"
          />
        </a>
        <a
          href="#"
          role="button"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          className="navbar-burger"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="/" className="navbar-item">
            Accueil
          </a>
          <a href="/produits" className="navbar-item">
            Produits
          </a>
          {/* <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Plus</a>
            <div className="navbar-dropdown">
              <a href="#" className="navbar-item">
                Packages
              </a>
              <a href="#" className="navbar-item">
                Accessoires
              </a>
              <a href="#" className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider" />
              <a href="#" className="navbar-item">
                Report an issue
              </a>
            </div>
          </div> */}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <LocalMallIcon onClick={() => navigate('/mon-panier')} />
            <div className="buttons">
              {currentUser ? (
                <div className="connected-buttons">
                  <a href="/profil-utilisateur" className="button is-white">
                    <Lottie options={defaultOptions} height={70} width={70} />
                  </a>
                  <button className="button is-primary" onClick={handleLogout}>
                    <strong>
                      <LogoutIcon /> Déconnexion
                    </strong>
                  </button>
                </div>
              ) : (
                <div className="unconnected-buttons">
                  <a href="/inscription" className="button is-primary">
                    <strong>Inscription</strong>
                  </a>
                  <a href="/connexion" className="button is-light">
                    <p>Connexion</p>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
