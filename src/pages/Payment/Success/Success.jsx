import React from 'react';
import Lottie from 'react-lottie';
import animationPayment from '../../../lotties/Payment/36107-validation.json';

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPayment,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="success">
      <Lottie options={defaultOptions} height={380} width={380} />
      <div className="is-centered">
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <p className="bd-notification is-primary">
              <code className="html">Paiement Réussi</code>
              <br />
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Success;
