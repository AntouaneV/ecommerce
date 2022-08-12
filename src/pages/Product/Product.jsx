import React, { useEffect, useState } from 'react';
import './product.css';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductTag from '../../components/ProductTag';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import moment from 'moment';

const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [productType, setProductType] = useState({});
  const [theArray, setTheArray] = useState([]);
  const [myImg, setMyImg] = useState('');
  const dispatch = useDispatch();

  const path = useLocation().pathname.split('/')[2];

  useEffect(() => {
    setIsLoading(true);
    const fetchDataProduct = async () => {
      try {
        const product = await axios.get(`/products/${path}`);
        const type = await axios.get(`/types/${product.data.type}`);
        setTheArray(product.data.searchTag);
        setProductType(type.data);
        setDataProduct(product.data);
        setMyImg(
          'http://localhost:8800/uploads/' + product.data.imgUrl.contentType
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchDataProduct();
  }, []);

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(dataProduct));
  };

  return (
    <div className="product">
      {isLoading ? (
        <div className="Load">Load....</div>
      ) : (
        <>
          <div className="container is-fluid">
            <div className="columns">
              <div className="column">
                <figure className="image">
                  <img src={myImg} alt="Image du produit" />
                </figure>
              </div>
              <div className="column">
                <h1>{dataProduct.name}</h1>
                <span className="tag is-primary">{productType.name}</span>
                <br />
                <br />
                <h2>
                  {dataProduct.price}€{' '}
                  <span>
                    <TrendingDownIcon />
                  </span>{' '}
                </h2>
                <h3>
                  Date de départ :{' '}
                  {moment(dataProduct.travelDate).format('DD-MM-YYYY')}
                </h3>
                {theArray.map((data, index) => (
                  <ProductTag key={index} tagId={data} />
                ))}
                <br />
                <br />
                <br />
                <button
                  className="button is-primary is-large is-fullwidth"
                  onClick={handleCart}
                >
                  Ajouter au panier
                </button>
                <br />
                <br />
                <span className="tag is-dark">
                  Voir information complémentaire ci-dessous
                </span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ipsam
              suscipit facere ad ut maxime odit? Fuga animi sequi quos ipsam.
              Neque aut asperiores iusto officia, doloribus laboriosam
              necessitatibus ad fugiat vitae, eum dolorem autem, amet delectus
              ex quod adipisci quae dignissimos.
              <br /> Quibusdam aut quae animi amet incidunt molestiae vel
              obcaecati et aliquid dignissimos consequatur aspernatur voluptate
              doloribus quisquam sapiente perferendis, architecto itaque. Aut
              sunt unde, obcaecati quam, maiores consectetur asperiores nobis
              voluptatibus mollitia saepe nostrum fugiat voluptates sint quasi!
              Iusto magni saepe, in sunt error perferendis laboriosam aperiam
              porro? Soluta doloremque, illum veritatis sed tenetur, iure id
              tempore nam, doloribus distinctio eligendi unde? Velit sint iste
              itaque ad et. Enim ea unde doloribus dolorem aperiam illo
              laudantium hic.
              <br />
              <br /> Dolores itaque repellat reprehenderit delectus excepturi,
              consequatur molestiae placeat, deserunt atque voluptatem nesciunt
              aliquid ipsum ea deleniti rem autem mollitia optio repellendus
              ducimus id tempore. Excepturi sapiente cupiditate quisquam
              possimus nisi qui alias molestias aliquid accusantium aperiam odio
              non nemo earum magni provident maxime, atque doloremque veniam
              explicabo ullam ad minus cumque? Voluptatem rem nam, sed placeat
              repellat voluptatibus mollitia, vel aliquid vero quo perspiciatis
              modi maiores, ut minima provident praesentium dolores at! Vitae,
              vero error aspernatur eius corrupti natus nulla repudiandae
              temporibus placeat totam, consequatur ab, repellendus eos sed
              mollitia! Praesentium aspernatur maiores libero obcaecati sint
              cumque, dolore saepe laboriosam voluptatum enim tempora, ut et
              reiciendis doloremque quisquam molestiae maxime ipsa nostrum eius
              explicabo illum eaque cupiditate id doloribus? Fuga quam iusto
              nesciunt id totam unde sint quo illum iste.
            </p>
          </div>
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default Product;
