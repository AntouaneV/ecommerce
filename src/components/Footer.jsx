import React from 'react';
import Lottie from 'react-lottie';
import animationTwitter from '../lotties/Footer/71665-twitter-icon.json';
import animationInstagram from '../lotties/Footer/71666-instagram-icon.json';
import animationSnapchat from '../lotties/Footer/71784-snapchat-icon.json';
import animationTiktok from '../lotties/Footer/71785-tiktok-icon.json';

const Footer = () => {
  const defaultOptionsTwitter = {
    loop: true,
    autoplay: true,
    animationData: animationTwitter,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsInstagram = {
    loop: true,
    autoplay: true,
    animationData: animationInstagram,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsSnapchat = {
    loop: true,
    autoplay: true,
    animationData: animationSnapchat,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsTiktok = {
    loop: true,
    autoplay: true,
    animationData: animationTiktok,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column">
              <Lottie options={defaultOptionsTwitter} height={65} width={65} />
            </div>
            <div className="column">
              <Lottie
                options={defaultOptionsInstagram}
                height={65}
                width={65}
              />
            </div>
            <div className="column">
              <Lottie options={defaultOptionsSnapchat} height={65} width={65} />
            </div>
            <div className="column">
              <Lottie options={defaultOptionsTiktok} height={65} width={65} />
            </div>
          </div>
        </div>
        <br />
        <br />
        <p>
          <strong>Bulma e-commmerce</strong> by{' '}
          <a href="https://jgthms.com">Antouane - Trasko - ImSugoii</a>. The
          source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The
          website content is licensed{' '}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
