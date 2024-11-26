import "./tableInfo.css";

import React from "react";

export default function ProductTableInfo(props) {
  const { productTitle, title, prouctData, handleDelete, handleEdit } = props;

  return (
    <div className="tableInfo">
      <div className="tableInfo_container">
        <div className="title">All {title}</div>
        <table cellSpacing={0}>
          <thead>
            <tr>
              {productTitle.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {prouctData && prouctData.length > 0 ? (
              prouctData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.skuNo}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.vendor}</td>
                  <td className="table_button">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => handleDelete(item.skuNo)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={productTitle.length}>
                  No products found. Add Products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
