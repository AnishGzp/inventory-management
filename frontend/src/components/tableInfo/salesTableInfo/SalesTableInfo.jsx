import "../tableInfo.css";

import React from "react";

export default function SalesTableInfo(props) {
  const { salesTitle, title, salesData, handleDelete, handleEdit } = props;

  return (
    <div className="tableInfo">
      <div className="tableInfo_container">
        <div className="title">All {title}</div>
        <table cellSpacing={0}>
          <thead>
            <tr>
              {salesTitle.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {salesData && salesData.length > 0 ? (
              salesData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.customer}</td>
                  <td>{item.productName}</td>
                  <td>{item.vandorName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>

                  <td className="table_button">
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={salesTitle.length}>
                  No sales record found. Add sales order
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
