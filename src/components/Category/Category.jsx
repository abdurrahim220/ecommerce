import { useParams } from "react-router-dom";

import "./Category.scss";
import useFetch from "../../hooks/useFetch";
import useProducts from "../../hooks/useProducts";
import CategoryProducts from "../Products/CategoryProduct";

const Category = () => {
  const { id } = useParams();
  // console.log(id)
  const [data] = useFetch(`/categories`);
  const [data2] = useProducts(`/products`);
  // console.log(data2)
  const filteredData = data?.categories?.find((item) => item._id === id);
  // console.log(filteredData?.name)

  const products = data2?.filter(
    (item) => item.category === filteredData?.name
  );
  // console.log(products)

  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">{filteredData?.name}</div>
        <CategoryProducts innerPage={true} products={products} />
      </div>
    </div>
  );
};

export default Category;
