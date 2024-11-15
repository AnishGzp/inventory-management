import "./searchAdd.css";

import React from "react";

export default function SearchAdd(props) {
  const { handleClick } = props;

  return (
    <div className="searchAdd">
      <input type="text" placeholder="Search products" />
      <button onClick={handleClick}>Add Products</button>
    </div>
  );
}
