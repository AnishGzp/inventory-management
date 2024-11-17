import "./product.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchAdd, TableInfo } from "../../components";
import { productTitle } from "../../utilities";

export default function Products() {
  const [prouctData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  async function getProduct() {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();

    setProductData(data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  console.log(searchQuery);
  console.log(prouctData);

  const filteredData =
    searchQuery.trim() !== ""
      ? prouctData.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase());
        })
      : prouctData;

  console.log(filteredData);

  return (
    <div className="product">
      <div className="product_container">
        <SearchAdd
          handleClick={() => {
            navigate("/products/addProducts");
          }}
          setSearchQuery={setSearchQuery}
        />
        <TableInfo
          title="products"
          productTitle={productTitle}
          prouctData={filteredData}
        />
      </div>
    </div>
  );
}
