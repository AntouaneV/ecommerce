import React from 'react';
import './popularCard.css';

const PopularCard = () => {
  return (
    <div>
      <h1 className="title">Voyage Where You Want.</h1>
      <h2 className="subtitle">
        We Are The Best Offers In The Market Place Become Crypto World.
      </h2>
      <div className="columns">
        <div className="column">
          <div className="card">
            {/* <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src="https://www.iamsterdam.com/media/spring/kloveniersburgwal-in-spring-adrien-olichon.jpg"
                  alt="Placeholder image"
                />
              </figure>
            </div> */}
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Amesterdam Full Package</p>
                  <p className="subtitle is-6">
                    <span className="tag is-primary">Primary</span>
                    <span className="tag is-info">Info</span>
                    <span className="tag is-success">Success</span>
                  </p>
                </div>
              </div>
              <div className="content">
                <span className="package-price">€1025.50</span>
                TTC
              </div>
              <button className="button is-primary is-fullwidth">
                Découvrir
              </button>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            {/* <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src="https://img.ev.mu/images/portfolio/villes/3924/1605x1070/3056.jpg"
                  alt="Placeholder image"
                />
              </figure>
            </div> */}
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Las Vegas Full Package</p>
                  <p className="subtitle is-6">
                    <span className="tag is-primary">Primary</span>
                    <span className="tag is-info">Info</span>
                  </p>
                </div>
              </div>
              <div className="content">
                <span className="package-price">€2425.50</span>
                TTC
              </div>
              <button className="button is-primary is-fullwidth">
                Découvrir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
