import "./product.css";

import React from "react";
import { useNavigate } from "react-router-dom";

import { SearchAdd, TableInfo } from "../../components";
import { productTitle } from "../../utilities";

export default function Products() {
  const navigate = useNavigate();

  return (
    <div className="product">
      <div className="product_container">
        <SearchAdd
          handleClick={() => {
            navigate("/products/addProducts");
          }}
        />
        <TableInfo title="Products" productTitle={productTitle} />
      </div>
    </div>
  );
}
