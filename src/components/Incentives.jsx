import React from 'react';
import './incentives.css';
import Lottie from 'react-lottie';
import animationData from '../lotties/98455-delivery-truck.json';
import paymentData from '../lotties/98100-payment-cards.json';
import travelData from '../lotties/17582-world-animation.json';

const Incentives = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsPayment = {
    loop: true,
    autoplay: true,
    animationData: paymentData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsTravel = {
    loop: true,
    autoplay: true,
    animationData: travelData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="incentives box">
      <h1 className="title">We Build Our Business On Customer Service</h1>
      <div className="is-flex is-justify-content-space-around">
        <div className="columns">
          <div className="column">
            <Lottie options={defaultOptions} height={180} width={180} />
            <h2 className="subtitle">Lorem, Ipsum.</h2>
            <p>
              This Is The Most Impresive Bat7. Veniam neque culpa reiciendis
              vero amet ipsa.
            </p>
          </div>
          <div className="column">
            <Lottie options={defaultOptionsPayment} height={180} width={180} />
            <h2 className="subtitle">Lorem, Ipsum.</h2>
            <p>
              This Is The Most Impresive Bat7. Veniam neque culpa reiciendis
              vero amet ipsa.
            </p>
          </div>
          <div className="column">
            <Lottie options={defaultOptionsTravel} height={180} width={180} />
            <h2 className="subtitle">Lorem, Ipsum.</h2>
            <p>
              This Is The Most Impresive Bat7. Veniam neque culpa reiciendis
              vero amet ipsa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incentives;
