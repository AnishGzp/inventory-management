import "../tableInfo.css";

import React, { useEffect, useState } from "react";

export default function PalesTableInfo(props) {
  const { purchaseTitle, title, purchaseData, handleDelete } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(purchaseData.length / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [purchaseData, currentPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = purchaseData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="tableInfo">
      <div className="tableInfo_container">
        <div className="title">All {title}</div>
        <table cellSpacing={0}>
          <thead>
            <tr>
              {purchaseTitle.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData && currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product}</td>
                  <td>{item.vendor}</td>
                  <td>{item.quantity}</td>
                  <td>{item.selling_price}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>

                  <td className="table_button">
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={purchaseTitle.length}>
                  No purchase record found. Add purchase order
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
