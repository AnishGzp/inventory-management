import "./addInput.css";

import React from "react";

export default function AddInput(props) {
  const { addContents, title, handleChange, handleSubmit, select, addSelect } =
    props;
  return (
    <div className="addInput">
      <div className="title">{title}</div>
      <form>
        {addContents.map((item, index) => (
          <input
            key={index}
            type={item.type}
            id={item.id}
            placeholder={item.placeholder}
            onChange={handleChange}
            readOnly={item.readOnly}
          />
        ))}
        {select &&
          addSelect.map((item, index) => (
            <select key={index} id={item.id} onChange={handleChange}>
              <option value="">Select the {item.id}</option>
              {item.values.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          ))}
        <button onClick={handleSubmit}>{title}</button>
      </form>
    </div>
  );
}
