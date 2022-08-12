import React, { useEffect, useState, useRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Lottie from 'react-lottie';
import animationLogIn from '../../lotties/SignIn/72874-user-profile-v2.json';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const SignUp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const form = useRef();
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (currentUser != null) {
      navigate('/');
    }
  }, [currentUser]);

  const sendEmail = async () => {
    emailjs
      .sendForm(
        'service_jz77yrj',
        'template_akzwd07',
        form.current,
        'Zm4iwyewkNzmBTzR-'
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log('message sent!');
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      form.current.user_password.value ==
      form.current.user_confirm_password.value
    ) {
      try {
        const res = await axios.post('/auth/signup', {
          civility: gender,
          lastname,
          firstname,
          email,
          password,
        });
        console.log(res.data);
        await sendEmail();
        navigate('/connexion', { state: { message: 'Bravo Frérrooooo!' } });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Les mots de passe ne correspondent pas !');
    }

    // sendEmail();
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLogIn,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="sign-in container is-fluid">
      <div className="columns">
        <div className="column">
          <h1 className="title">Inscription</h1>
          <form ref={form} onSubmit={handleSignUp}>
            <div className="field">
              <div
                className="control"
                onChange={(e) => setGender(e.target.value)}
              >
                <label className="radio">
                  <input type="radio" value="Monsieur" name="gender" /> Monsieur
                </label>
                <label className="radio">
                  <input type="radio" value="Madame" name="gender" /> Madame
                </label>
                <label className="radio">
                  <input type="radio" value="Autre" name="gender" /> Autre
                </label>
              </div>
            </div>
            <div className="field">
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Nom"
                      name="user_lastname"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <PersonIcon />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control is-expanded has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="Prénom"
                      name="user_firstname"
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <PersonIcon />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  name="user_email"
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
                  name="user_password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <LockIcon />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirmer votre mot de Passe"
                  name="user_confirm_password"
                />
                <span className="icon is-small is-left">
                  <LockIcon />
                </span>
              </p>
            </div>
            <label className="checkbox">
              <input type="checkbox" /> J'accepte les{' '}
              <a href="#">termes et conditions</a>
            </label>
            <br />
            <br />
            <div className="field">
              <p className="control">
                <button type="submit" className="button is-success">
                  Inscription
                </button>
              </p>
            </div>
          </form>
          <br />
          <br />
          <div className="box">
            <label className="checkbox">
              <p>
                Vous avez déjà un compte ?
                <br />
                <br />
                Vous pouvez vous connecter en cliquant ci-dessous
              </p>
              <br />

              <a href="/connexion">Connexion</a>
            </label>
          </div>
        </div>
        <div className="column">
          <Lottie options={defaultOptions} />
        </div>
      </div>
      <br />
    </div>
  );
};

export default SignUp;
