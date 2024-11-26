import "../style.css";

import React from "react";
import { AddInput } from "../../../components";
import { editProducts, editProductSelect } from "../../../utilities";

export default function EditProducts() {
  return (
    <div className="editProducts">
      <AddInput title="Edit products" addContents={editProducts} />
    </div>
  );
}
