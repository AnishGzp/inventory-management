import "./searchAdd.css";

import React from "react";

export default function SearchAdd(props) {
  const { handleClick, setSearchQuery } = props;

  return (
    <div className="searchAdd">
      <input
        type="text"
        placeholder="Search products"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleClick}>Add Products</button>
    </div>
  );
}
