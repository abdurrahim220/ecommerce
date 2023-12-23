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

  const SmartWatch = products?.filter(
    (item) => item.category === "SmartWatch"
  );
  const WirelessEarbuds = products?.filter(
    (item) => item.category === "WirelessEarbuds"
  );
  const BluetoothSpeakers = products?.filter(
    (item) => item.category === "BluetoothSpeakers"
  );
  const Headphones = products?.filter(
    (item) => item.category === "Headphones"
  );

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />

          <Products products={products} headingText="Popular Products" />

          <Products products={SmartWatch} headingText="Popular smart watches" />

          <Products
            products={WirelessEarbuds}
            headingText="Popular wireless earbuds"
          />

          <Products
            products={BluetoothSpeakers}
            headingText="Popular bluetooth speakers"
          />
          <Products products={Headphones} headingText="Popular headphones" />
        </div>
      </div>
    </div>
  );
};

export default Home;
