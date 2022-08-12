import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
} from '../../features/cartSlice';
import axios from 'axios';
import PaypalCheckoutButton from '../../components/PaypalCheckoutButton';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart">
      <div className="container is-fluid">
        <h1 className="title">Mon Panier</h1>
        <br />
        <br />
        <div className="columns">
          <div className="column">
            <div className="table-container">
              {cart.cartTotalQuantity == 0 ? (
                'Votre panier est vide'
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <abbr title="Position">Produit</abbr>
                      </th>
                      <th>Nom de l'article</th>
                      <th>
                        <abbr title="Played">Prix</abbr>
                      </th>
                      <th>
                        <abbr title="Played">Quantitée</abbr>
                      </th>
                      <th>
                        <abbr title="Played">Total</abbr>
                      </th>
                      <th>
                        <abbr title="Played">Action</abbr>
                      </th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>
                        <button
                          className="button is-small is-danger is-outlined"
                          onClick={() => handleClearCart()}
                        >
                          Supprimer le panier
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <abbr title="Position">Total</abbr>
                      </th>
                      <th>{cart.cartTotalAmount} €</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {cart.cartItems?.map((cartItem) => (
                      <tr key={cartItem._id}>
                        <th>
                          <img
                            src={`http://localhost:8800/uploads/${cartItem.imgUrl.contentType}`}
                            width="60"
                            height="60"
                            alt="Image du produit"
                          />
                        </th>
                        <td>
                          <a
                            href={`http://localhost:3000/produits/${cartItem._id}`}
                          >
                            {cartItem.name}
                          </a>
                        </td>
                        <td>{cartItem.price}€</td>
                        <td>
                          <button
                            className="button is-small is-primary is-rounded"
                            onClick={() => handleDecreaseCart(cartItem)}
                          >
                            -
                          </button>
                          <br />
                          {cartItem.cartQuantity}
                          <br />
                          <button
                            className="button is-small is-primary is-rounded"
                            onClick={() => handleIncreaseCart(cartItem)}
                          >
                            +
                          </button>
                        </td>
                        <td>{cartItem.price * cartItem.cartQuantity}€</td>
                        <td>
                          <DeleteIcon
                            onClick={() => handleRemoveFromCart(cartItem)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="column">
            {cart.cartTotalQuantity == 0 ? (
              ''
            ) : (
              <>
                {!currentUser ? (
                  'Vous devez être connecté pour payer ! '
                ) : (
                  <div className="paypal-button-container">
                    <PaypalCheckoutButton product={cart} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Cart;
