import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DataArrayIcon from '@mui/icons-material/DataArray';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { loginSuccess } from '../../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import emailjs from '@emailjs/browser';
import moment from 'moment';

const Profile = () => {
  const notifySuccess = () =>
    toast.success('Nous avons bien sauvegarder vos modifications', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.error("Une erreur s'est produite lors de la modification", {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState();
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [civility, setCivility] = useState('');

  const [userOrders, setUserOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (!currentUser) {
      navigate('/connexion');
    } else {
      setAddress(currentUser.address);
      setCountry(currentUser.country);
      setCity(currentUser.city);
      setZipcode(currentUser.zipcode);
      setLastname(currentUser.lastname);
      setFirstname(currentUser.firstname);
      setEmail(currentUser.email);
      setCivility(currentUser.civility);
      setIsLoading(false);
    }
    const fetchOrders = async (id) => {
      try {
        const res = await axios.get(`/orders/${id}`);
        setUserOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders(currentUser._id);
  }, [currentUser]);

  const handleInput = (e) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/users/' + currentUser._id, {
        civility,
        address,
        city,
        zipcode,
        country,
        lastname,
        firstname,
        email,
      });
      dispatch(loginSuccess(res.data));
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  };

  return (
    <div className="profile container is-fluid">
      {isLoading ? (
        'Its Loading'
      ) : (
        <div className="columns">
          <div className="column">
            <h1 className="title"> Page Profil</h1>
            <div className="field">
              <div
                className="control"
                onChange={(e) => setCivility(e.target.value)}
              >
                <label className="radio">
                  <input
                    type="radio"
                    value="Monsieur"
                    name="gender"
                    disabled={isDisabled}
                    checked={civility == 'Monsieur' ? 'checked' : ''}
                  />{' '}
                  Monsieur
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    value="Madame"
                    name="gender"
                    disabled={isDisabled}
                    checked={civility == 'Madame' ? 'checked' : ''}
                  />{' '}
                  Madame
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    value="Autre"
                    name="gender"
                    disabled={isDisabled}
                    checked={civility == 'Autre' ? 'checked' : ''}
                  />{' '}
                  Autre
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
                      defaultValue={lastname}
                      disabled={isDisabled}
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
                      defaultValue={firstname}
                      disabled={isDisabled}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <PersonIcon />
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
                  defaultValue={email}
                  disabled={isDisabled}
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
              <button className="button" onClick={handleInput}>
                <EditIcon />
              </button>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success is-outlined">
                  Modifier mon mot de passe
                </button>
              </p>
            </div>
            <br />

            <h1 className="title">Information Complémentaire</h1>
            {!address || !city || !zipcode || !country ? (
              <span className="tag is-danger is-light">
                ces informations sont nécessaires pour l'achat d'un produit
              </span>
            ) : (
              <span className="tag is-primary is-light">
                n'hésitez pas à verifier vos informations de livraison
              </span>
            )}
            <br />
            <br />
            <div className="field">
              <div className="control has-icons-left">
                <div className="select">
                  <select onChange={(e) => setCountry(e.target.value)}>
                    {country ? (
                      <option>{country}</option>
                    ) : (
                      <option defaultValue="">sélectionnez votre pays</option>
                    )}
                    <option value="France">France</option>
                    <option value="Pologne">Pologne</option>
                  </select>
                </div>
                <span className="icon is-left">
                  <LanguageIcon />
                </span>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="adresse"
                  placeholder="Adresse"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <HomeIcon />
                </span>
              </p>
            </div>
            <div className="field">
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      className="input"
                      type="city"
                      placeholder="Ville"
                      defaultValue={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <LocationCityIcon />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control is-expanded has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="zip"
                      placeholder="Code Postal"
                      defaultValue={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <DataArrayIcon />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <br />
            <div className="field">
              <p className="control">
                <button className="button is-success" onClick={handleUpdate}>
                  Enregistrer les modifications
                </button>
              </p>
            </div>
          </div>
          <div className="column">
            <h1 className="title">Mes Commandes</h1>
            {userOrders ? (
              <span className="tag is-info is-light">
                voici l'historique de vos commandes ci-dessous
              </span>
            ) : (
              <span className="tag is-danger is-light">
                aucune commande effectuée
              </span>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <abbr title="Position">Date</abbr>
                    </th>
                    <th>Produits</th>
                    <th>
                      <abbr title="Played">Prix</abbr>
                    </th>
                    <th>
                      <abbr title="Won">Paiement</abbr>
                    </th>
                    <th>
                      <abbr title="Won">État</abbr>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map((order, index) => (
                    <tr key={index}>
                      <th>{moment(order.createdAt).format('DD-MM-YYYY')}</th>
                      <td>
                        {order.product.map((pr, index) => (
                          <div key={index}>
                            <a
                              href={`http://localhost:3000/produits/${pr._id}`}
                              title="Leicester City F.C."
                            >
                              {pr.name}
                            </a>
                            <br />
                          </div>
                        ))}
                      </td>
                      <td>{order.amount}€</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
};

export default Profile;
