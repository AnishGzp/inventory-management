import "./addInput.css";

import React from "react";

export default function AddInput(props) {
  const {
    addContents,
    title,
    handleChange,
    handleSubmit,
    select,
    addSelect,
    loading,
  } = props;
  return (
    <div className="addInput">
      <div className="title">{title}</div>
      <form>
        {addContents.map((item, index) => (
          <div className="addInput_form" key={index}>
            <label htmlFor={item.id}>{item.placeholder}</label>
            <input
              type={item.type}
              id={item.id}
              placeholder={item.placeholder}
              onChange={handleChange}
              readOnly={item.readOnly}
              value={item.value}
            />
          </div>
        ))}
        {select &&
          addSelect.map((item, index) => (
            <div className="addInput_form" key={index}>
              <label htmlFor={item.id}>{`Select the ${item.id}`}</label>
              <select id={item.id} value={item?.value} onChange={handleChange}>
                <option value="">Select the {item.id}</option>
                {item.values.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        <button disabled={loading} onClick={handleSubmit}>
          {!loading ? title : `Loading...`}
        </button>
      </form>
    </div>
  );
}
