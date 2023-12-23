import React, { useEffect, useState } from "react";
import "./AllItems.scss";
import Price from "../Price/Price";
import CategoryInput from "../CategoryInput/CategoryInput";
import { fetchDataFromApi } from "../../utils/api";
import Product from "../Products/Product/Product";
import TablePagination from "@mui/material/TablePagination";
import Loader from "../Loader/Loader";

const AllItems = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectPriceRange, setSelectPriceRange] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromApi("/products");
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 8));
    setPage(0);
  };

  useEffect(() => {
    let newFilteredProducts = [...products];

    if (selectCategory) {
      newFilteredProducts = newFilteredProducts.filter(
        ({ category }) => category === selectCategory
      );
    }
    if (selectPriceRange) {
      const [minPrice, maxPrice] = selectPriceRange.split("-");
      newFilteredProducts = newFilteredProducts.filter(
        ({ price }) =>
          price >= parseInt(minPrice) && price <= parseInt(maxPrice)
      );
    }
    setFilteredProducts(newFilteredProducts);
  }, [selectCategory, selectPriceRange, products]);
  
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="items-container">
      <div className="c-1">
        <div className="filter-data-container">
          <div className="price-data">
            <Price
              handleChange={(event) => setSelectPriceRange(event.target.value)}
            />
          </div>
          <div className="category-data">
            <CategoryInput
              handleChange={(event) => setSelectCategory(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="c-2">
        <div className="product-card-container">
          {filteredProducts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => (
              <Product key={item._id} item={item} />
            ))}
        </div>
        <div className="pagination">
          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllItems;
