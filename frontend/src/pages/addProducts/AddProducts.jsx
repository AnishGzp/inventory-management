import "./addProducts.css";

import React from "react";
import { AddInput } from "../../components";
import { addProducts } from "../../utilities";

export default function AddProducts() {
  return (
    <div className="addProducts">
      <div className="addProducts_container">
        <AddInput title="Products" addProducts={addProducts} />
      </div>
    </div>
  );
}
