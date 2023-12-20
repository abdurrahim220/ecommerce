import React, { useEffect, useState } from "react";

import "./DetailsProduct";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
const DetailsProduct = () => {
  const [product, setProduct] = useState([]);
  // console.log(product)
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi(`/products/${id}`)
      .then((res) => {
        setProduct(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="styledProduct">
      <div className="productContainer">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="imageContainer">
              <img src={product.image} alt="" />
            </div>
            <div className="productDetails">
              <h3>{product.tile}</h3>
              <p>
                <span>Category:</span>{product.category}
              </p>
              <p>
                <span>Description:</span>{product.desc}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsProduct;
