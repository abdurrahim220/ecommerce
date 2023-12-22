import "./Category.scss";
import {useNavigate} from 'react-router-dom'
import cat1 from "../../../assets/category/cat-1.jpg";
import cat2 from "../../../assets/category/cat-2.jpg";
import cat3 from "../../../assets/category/cat-3.jpg";
import cat4 from "../../../assets/category/cat-4.jpg";

const Category = ({ categories }) => {
  const navigate = useNavigate()
  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories.categories?.map((item) => (
          <div key={item._id} onClick={()=>navigate(`/category/${item._id}`)} className="category">
            <img alt="" src={item.img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
