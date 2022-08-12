import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import { useLocation, useNavigate } from 'react-router';

const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');

  const path = useLocation().pathname.split('/')[3];
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (!path) return navigate('/');
    const verifyToken = async () => {
      try {
        const res = await axios.get(`/auth/resetpassword/${path}`);
        console.log(res.data);
        setUserId(res.data.id);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        console.log('navigate(/)');
        if (error.response.status == 403) console.log('bad token navigate()');
        setIsLoading(false);
      }
    };
    verifyToken();
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password && password == confirmPassword) {
      try {
        const res = await axios.post('/auth/resetpassword', {
          password,
          id: userId,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('exit');
    }
  };

  return (
    <div className="reset">
      {isLoading ? (
        'Loadingg...'
      ) : (
        <div className="container isfluid">
          <h1 className="title">Réinitialiser votre mot de passe</h1>
          <form onSubmit={handleResetPassword}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <LockIcon />
                </span>
                <span className="icon is-small is-right">
                  <CheckIcon />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  name="confirm_password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <LockIcon />
                </span>
                <span className="icon is-small is-right">
                  <CheckIcon />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Modifier mon mot de passe
                </button>
              </p>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </form>
        </div>
      )}
    </div>
  );
};

export default Reset;
