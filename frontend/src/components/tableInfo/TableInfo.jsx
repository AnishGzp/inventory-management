import "./tableInfo.css";

import React from "react";

export default function TableInfo(props) {
  const { productTitle, title } = props;
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
        </table>
      </div>
    </div>
  );
}
