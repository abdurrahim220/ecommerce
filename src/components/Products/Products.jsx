import Product from "./Product/Product";
import "./Products.scss";
const Products = ({ products, innerPage, headingText }) => {
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {products?.map((item) => (
          <Product key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
