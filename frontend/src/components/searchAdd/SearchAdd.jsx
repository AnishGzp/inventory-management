import "./searchAdd.css";

import React from "react";

export default function SearchAdd(props) {
  const { handleClick, setSearchQuery, title } = props;

  return (
    <div className="searchAdd">
      <input
        type="text"
        placeholder={`Search ${title}`}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleClick}>Add {title}</button>
    </div>
  );
}
