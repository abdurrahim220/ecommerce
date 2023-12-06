import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import "./Category.scss";
import useFetch from "../../hooks/useFetch";

const Category = () => {

  const {id} = useParams()
  // console.log(id)
  const {data}=useFetch(`/categories`)
  // console.log(data)
  const filteredData = data?.categories?.filter(item => item._id === id);
  // console.log(filteredData)


  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">
          Category Title
        </div>
          <Products innerPage={true} />
      </div>
    </div>
  );
};

export default Category;
