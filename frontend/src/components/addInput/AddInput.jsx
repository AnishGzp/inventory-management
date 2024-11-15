import "./addInput.css";

import React from "react";

export default function AddInput(props) {
  const { addProducts, title } = props;
  return (
    <div className="addInput">
      <div className="title">Add {title}</div>
      <form>
        {addProducts.map((item, index) => (
          <input
            key={index}
            type={item.type}
            id={item.id}
            placeholder={item.placeholder}
          />
        ))}
        <button>Add {title}</button>
      </form>
    </div>
  );
}
