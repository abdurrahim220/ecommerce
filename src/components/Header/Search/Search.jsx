import { MdClose } from "react-icons/md";
import "./Search.scss";
import prod from "../../../assets/products/earbuds-prod-1.webp";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import React, { useState } from "react";

const Search = ({ setShowSearch }) => {
  const { data2 } = useProducts(`/products`);
  // console.log(data2)
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(null);
  const navigate = useNavigate();

  const filterProducts = () => {
    if (query.trim() === "") {
      setFilteredProducts(null);
    } else {
      const filtered = data2?.filter((product) => {
        return product.title.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  };

  // Update filtered products whenever the query changes
  React.useEffect(() => {
    filterProducts();
  }, [query, data2]);

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search for products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MdClose onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {filteredProducts === null ? (
            <div>No results</div>
          ) : (
            filteredProducts?.map((product) => (
              <div
                onClick={() => {
                  navigate(`/product/${product._id}`);
                  setShowSearch(false);
                }}
                className="search-result-item"
                key={product.id}
              >
                <div className="image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="prod-details">
                  <span className="name">{product.title}</span>
                  <span className="desc">{product.description}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
