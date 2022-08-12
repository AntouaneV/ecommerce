import React from 'react';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Lottie from 'react-lottie';
import animationAbout from '../lotties/About/73386-problem-solving-team.json';

const About = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationAbout,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="columns">
      <div className="column">
        <Lottie options={defaultOptions} height={380} width={380} />
      </div>
      <div className="column">
        <h1 className="title">We Are The Team Worker!</h1>
        <p>
          sit amet consectetur adipisicing elit. Reiciendis laborum eaque, ullam
          culpa nemo voluptas! Veniam neque culpa reiciendis vero amet ipsa quos
          accusamus molestias, ex asperiores odit nostrum cupiditate illo
          dignissimos? Facere sapiente explicabo sequi sunt velit dolores
          reprehenderit?Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reiciendis laborum eaque, ullam culpa nemo voluptas!
          <br />
          <br />
          Ex asperiores odit nostrum cupiditate illo dignissimos? Facere
          sapiente explicabo sequi sunt velit dolores reprehenderit?Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Reiciendis laborum eaque,
          ullam culpa nemo voluptas!
        </p>

        <br />
        <div className="tags">
          <span className="tag">One</span>
          <span className="tag">Two</span>
          <span className="tag">Three</span>
          <span className="tag">Four</span>
          <span className="tag">Five</span>
          <span className="tag">Six</span>
          <span className="tag">Seven</span>
          <span className="tag">Eight</span>
          <span className="tag">Nine</span>
          <span className="tag">Ten</span>
          <span className="tag">Eleven</span>
        </div>
        <div className="buttons-are-large">
          <button className="button is-primary is-fullwidth">
            <ConnectWithoutContactIcon />
            Nous Contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
