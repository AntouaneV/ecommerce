import React, { useState, useRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const form = useRef();
  const [templateParams, setTemplateParams] = useState({});

  const sendEmail = async (thisParams) => {
    emailjs
      .send(
        'service_jz77yrj',
        'template_wsr5pxh',
        thisParams,
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

  const handleLostPassword = async (e) => {
    e.preventDefault();

    if (!email) return console.log('email is empty');

    try {
      const res = await axios.post('/auth/forgotpassword', { email });
      const tempParams = {
        token: res.data,
        email: form.current.email.value,
      };
      await sendEmail(tempParams);
      toast.success('Un email vous a été envoyer 📬', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="passwordreset container is-fluid">
      <h1 className="title">Mot de passe oublié</h1>
      <div className="columns">
        <div className="column">
          <form ref={form} onSubmit={handleLostPassword}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  name="email"
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
            <br />
            <div className="field">
              <p className="control">
                <button className="button is-success">Envoyer</button>
              </p>
            </div>
          </form>
        </div>
        <div className="column"></div>
      </div>
      <span className="tag is-info is-light">
        Un lien pour réinitialiser votre mot de passe vous sera envoyé par
        e-mail
      </span>
      <br />
      {/* <small className="small">
        Pour des raisons de sécurité, un délai de 15 minutes, au moment de
        l'envoie du cette e-mail, vous sera accordé pour réinitialiser votre mot
        de passe. Une fois ce délai écoulé, vous devrez renouveller votre
        demande.
      </small> */}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default PasswordReset;
