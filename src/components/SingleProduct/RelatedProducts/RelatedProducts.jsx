import useProducts from "../../../hooks/useProducts";
import Products from "../../Products/Products";

const RelatedProducts = ({categoryName,productsId}) => {

  const  [data2]  = useProducts(`/products`);
  // console.log(productsId)

  const products = data2?.filter((item) => item.category === categoryName && !productsId.includes(item._id));

  // console.log(products)

  return (
    <div className="related-products">
      <Products products={products} headingText="Related Products" />
    </div>
  );
};

export default RelatedProducts;
