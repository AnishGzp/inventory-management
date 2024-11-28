import "../tableInfo.css";

import React from "react";

export default function VendorTableInfo(props) {
  const { categoryTitle, title, categoryData, handleDelete, handleEdit } =
    props;

  return (
    <div className="tableInfo">
      <div className="tableInfo_container">
        <div className="title">All {title}</div>
        <table cellSpacing={0}>
          <thead>
            <tr>
              {categoryTitle.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {categoryData && categoryData.length > 0 ? (
              categoryData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>{item.name}</td>

                  <td className="table_button">
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.name)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={categoryTitle.length}>
                  No vendors found. Add Vendors
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
