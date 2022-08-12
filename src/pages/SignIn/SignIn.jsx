import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Lottie from 'react-lottie';
import animationLogIn from '../../lotties/SignIn/72874-user-profile-v2.json';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../../features/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const SignIn = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (currentUser != null) {
      navigate('/');
    }
    if (state) {
      const { message } = state;
      console.log(message);
    } else {
      console.log('');
    }
  }, [currentUser]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLogIn,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('/auth/signin', { email, password });
      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginFailure());
    }
  };
  return (
    <div className="sign-up container is-fluid">
      <div className="columns">
        <div className="column">
          <Lottie options={defaultOptions} />
        </div>
        <div className="column">
          <h1 className="title">Connexion</h1>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon is-small is-left">
                <EmailIcon />
              </span>
              <span className="icon is-small is-right">
                <CheckIcon />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Mot de Passe"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon is-small is-left">
                <LockIcon />
              </span>
            </p>
          </div>
          <label className="checkbox">
            <a href="/mot-de-passe-oublie">Mot de passe oublié ?</a>
          </label>
          <br />
          <br />
          <div className="field">
            <p className="control">
              <button className="button is-success" onClick={handleLogin}>
                Connexion
              </button>
            </p>
          </div>
          <br />
          <br />
          <div className="box">
            <label className="checkbox">
              <p>
                Vous n'avez toujours pas de compte ?
                <br />
                <br />
                Vous pouvez en créer un gratuitement
              </p>
              <br />

              <a href="/inscription">Créer un compte</a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
