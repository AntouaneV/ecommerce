import React from 'react';
import 'bulma/css/bulma.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import Product from './pages/Product/Product';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/Cart/Cart';
import Reset from './pages/PasswordReset/Reset/Reset';
import List from './pages/Product/List/List';
import Success from './pages/Payment/Success/Success';
import Cancel from './pages/Payment/Cancel/Cancel';

function App() {
  return (
    <PayPalScriptProvider
      options={{
        'client-id':
          'AW8xmURp2HjSrX9bajBQHokaR-BaqfWz0VA3OiSS3UcTVbJpy_dvwYKjkfz1_65xPUTw2FEuLX7O4P9b',
        currency: 'EUR',
      }}
    >
      <div className="App">
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <br />
          <br />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="connexion" element={<SignIn />} />
              <Route path="inscription" element={<SignUp />} />
              <Route path="profil-utilisateur" element={<Profile />} />
              <Route path="mot-de-passe-oublie" element={<PasswordReset />} />
              <Route path="paiement-reussi" element={<Success />} />
              <Route path="paiement-refuse" element={<Cancel />} />
              <Route path="mot-de-passe-oublie/reinitialisation">
                <Route path=":resetToken" element={<Reset />} />
              </Route>
              <Route path="mon-panier" element={<Cart />} />
              <Route path="produits">
                <Route index element={<List />} />
                <Route path=":productId" element={<Product />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
