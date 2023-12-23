import React, { useState } from 'react';
import Product from "./Product/Product";
import "./Products.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Products = ({ products, innerPage, headingText }) => {
  const productsArray = products || [];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(productsArray.length / itemsPerPage);

  const handleNextClick = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleProducts = productsArray.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="products-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!innerPage && <div className="sec-heading">{headingText}</div>}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MdNavigateBefore
            size={25}
            onClick={handlePrevClick}
            style={{ cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
            disabled={currentPage === 0}
          />
          <MdNavigateNext
            size={25}
            onClick={handleNextClick}
            style={{ cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer' }}
            disabled={currentPage === totalPages - 1}
          />
        </div>
      </div>

      <div className="products">
        {visibleProducts.map((item) => (
          <Product key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
