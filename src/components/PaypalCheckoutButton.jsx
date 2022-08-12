import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../features/cartSlice';

const PaypalCheckoutButton = (props) => {
  const { currentUser } = useSelector((state) => state.user);
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    navigate('/paiement-reussi');
    dispatch(clearCart());
  }
  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  return (
    <PayPalButtons
      onClick={(data, actions) => {
        // Validate on button click, client or server side
        const hasAlreadyBoughtCourse = false;

        if (hasAlreadyBoughtCourse) {
          setError(
            'You already bought this course. Go to your account to view your list of courses.'
          );

          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: 'Paiement BULMA',
              amount: {
                value: product.cartTotalAmount,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        const res = await axios.post('/orders/', {
          trackingID: data.orderID,
          product: product.cartItems,
          productImg: 'IBIZA.png',
          customer: currentUser.lastname + ' ' + currentUser.firstname,
          customer_id: currentUser._id,
          amount: product.cartTotalAmount,
          paymentMethod: 'Paypal',
          status: order.status,
        });
        console.log(res.data);
        console.log('order', order);

        handleApprove(data.orderID);
      }}
      onError={(err) => {
        setError(err);
        console.error('PayPal Checkout onError', err);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
      }}
    />
  );
};

export default PaypalCheckoutButton;
