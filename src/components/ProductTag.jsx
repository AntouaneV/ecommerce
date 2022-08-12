import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductTag = (props) => {
  const [tagName, setTagName] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/types/${props.tagId}`);
        setTagName(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [props.tagId]);
  return <span className="tag is-primary">{tagName.name}</span>;
};

export default ProductTag;
