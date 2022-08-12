import React, { useEffect, useState } from 'react';
import './list.css';
import Card from '../../../components/Card';
import axios from 'axios';
import MultipleCard from '../../../components/MultipleCard';

const List = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productPriceRange, setProductPriceRange] = useState(200);
  const [allCountry, setAllCountry] = useState([]);
  const [countrySelected, setCountrySelected] = useState('');
  const [hightPrice, setHightPrice] = useState(1000);

  const getAllCountryInArray = async (products) => {
    products.map((product) => {
      setAllCountry((oldArray) => [...oldArray, product.countryDestination]);
    });
    setAllCountry((oldArray) => [...new Set(oldArray)]);
  };

  const getHightPrice = async (products) => {
    products.map((product) => {
      if (product.price > hightPrice) {
        setHightPrice(product.price);
      }
    });
    setProductPriceRange(hightPrice);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('/products');
        setProducts(res.data);
        await getAllCountryInArray(res.data);
        await getHightPrice(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="list">
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="container is-fluid">
          <h1 className="title">Tous nos produits</h1>
          <div className="field">
            <input
              type="range"
              min="1"
              max={hightPrice + 100}
              defaultValue="500"
              onChange={(e) => setProductPriceRange(e.target.value)}
            />
            {productPriceRange}€
          </div>
          <div className="field">
            <div className="control">
              {allCountry.map((country, index) => (
                <label key={index} className="radio">
                  <input
                    type="radio"
                    value={country}
                    name="country"
                    checked={countrySelected == country}
                    onChange={(e) => setCountrySelected(e.target.value)}
                  />{' '}
                  {country}
                </label>
              ))}
              <br />
              <button
                className="button is-small is-danger is-outlined"
                onClick={() => setCountrySelected('')}
              >
                Annuler
              </button>
            </div>
          </div>
          <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
            {countrySelected ? (
              <>
                {products
                  .filter(
                    (product) => product.countryDestination == countrySelected
                  )
                  .filter((product) => product.price <= productPriceRange)
                  .map((product) => (
                    <MultipleCard
                      key={product._id}
                      price={product.price + '€'}
                      image={
                        'http://localhost:8800/uploads/' +
                        product.imgUrl.contentType
                      }
                      name={product.name}
                      type_id={product.type}
                      id={product._id}
                    />
                  ))}
              </>
            ) : (
              <>
                {products
                  .filter((product) => product.price <= productPriceRange)
                  .map((product) => (
                    <MultipleCard
                      key={product._id}
                      price={product.price + '€'}
                      image={
                        'http://localhost:8800/uploads/' +
                        product.imgUrl.contentType
                      }
                      name={product.name}
                      type_id={product.type}
                      id={product._id}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default List;
