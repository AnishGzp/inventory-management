import "../tableInfo.css";

import React, { useState } from "react";

export default function VendorTableInfo(props) {
  const { vendorTitle, title, vendorData, handleDelete, handleEdit } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(vendorData.length / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [vendorData, currentPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = vendorData.slice(startIndex, endIndex);

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
              {vendorTitle.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData && currentData.length > 0 ? (
              currentData.map((item, index) => (
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
                <td colSpan={vendorTitle.length}>
                  No vendors found. Add Vendors
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
