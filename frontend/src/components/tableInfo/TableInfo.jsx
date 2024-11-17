import "./tableInfo.css";

import React from "react";

export default function TableInfo(props) {
  const { productTitle, title, prouctData } = props;
  return (
    <div className="tableInfo">
      <div className="tableInfo_container">
        <div className="title">All {title}</div>
        <table>
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
                  <td className="table_button">
                    <button>Edit</button>
                    <button>Delete</button>
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
