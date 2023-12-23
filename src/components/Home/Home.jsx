import { useContext, useEffect } from "react";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import "./Home.scss";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
const Home = () => {
  const { categories, setCategories, setProducts, products } =
    useContext(Context);

  useEffect(() => {
    Promise.all([
      fetchDataFromApi("/categories"),
      fetchDataFromApi("/products"),
    ])
      .then(([categoriesRes, productsRes]) => {
        setCategories(categoriesRes);
        setProducts(productsRes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products products={products} headingText="Popular Products" />
          <Products products={products} headingText="Popular smart watches" />
          <Products products={products} headingText="Popular wireless earbuds" />
          <Products products={products} headingText="Popular bluetooth speakers" />
          <Products products={products} headingText="Popular headphones" />
          
        </div>
      </div>
    </div>
  );
};

export default Home;
