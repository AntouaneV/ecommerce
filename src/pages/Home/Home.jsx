import React, { useEffect, useState } from 'react';
import './home.css';
import PopularCard from '../../components/PopularCard';
import Card from '../../components/Card';
import About from '../../components/About';
import Incentives from '../../components/Incentives';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [imageDel, setImageDel] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('/products/famous');
        setBestSellers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <div className="home">
      <div className="container is-fluid">
        <PopularCard />
        <br />
        <br />
        <br />
        <h1 className="title">Nos Meilleurs Ventes.</h1>
        <div className="columns">
          {bestSellers.map((bestSeller) => (
            <div key={bestSeller._id} className="column">
              <Card
                price={bestSeller.price + '€'}
                image={
                  'http://localhost:8800/uploads/' +
                  bestSeller.imgUrl.contentType
                }
                name={bestSeller.name}
                type_id={bestSeller.type}
                id={bestSeller._id}
              />
            </div>
          ))}
        </div>
        <div className="is-flex is-justify-content-center">
          <div className="see-more-products">
            <a href="/produits">
              Voir Plus <AddIcon />
            </a>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <About />
        <br />
        <br />
        <br />
        <br />
        <Incentives />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
