import React, { useEffect, useState } from 'react';
import './card.css';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const MultipleCard = (props) => {
  const [productType, setProductType] = useState({});
  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get(`/types/${props.type_id}`);
        setProductType(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchType();
  }, [props.type_id]);

  return (
    <div className="card multiple">
      <div className="card-image">
        <figure className="image">
          <img src={props.image} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <div className="is-flex is-justify-content-space-between is-flex-wrap-wrap">
              <div className="title is-6">{props.name}</div>
              <div className="price">{props.price}</div>
            </div>
            <p className="subtitle is-6">
              <span className="tag is-primary">{productType.name}</span>
            </p>
          </div>
        </div>
        <div className="content">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
        <a
          href={'/produits/' + props.id}
          className="button is-primary is-outlined is-fullwidth"
        >
          Voir
        </a>
      </div>
    </div>
  );
};

export default MultipleCard;
