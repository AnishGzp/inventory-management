import "./addInput.css";

import React from "react";

export default function AddInput(props) {
  const {
    addProducts,
    title,
    handleChange,
    handleSubmit,
    select,
    addProductSelect,
  } = props;
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
            onChange={handleChange}
          />
        ))}
        {select &&
          addProductSelect.map((item, index) => (
            <select key={index} id={item.id} onChange={handleChange}>
              <option value="">Select the {item.id}</option>
              {item.values.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          ))}
        <button onClick={handleSubmit}>Add {title}</button>
      </form>
    </div>
  );
}
