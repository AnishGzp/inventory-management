import "./category.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CategoryTableInfo, SearchAdd } from "../../components";
import { categoryTitle } from "../../utilities";
import { toast } from "react-toastify";

export default function Category() {
  const [categoryData, setCategoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  async function getCategory() {
    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/category"
    );
    const data = await res.json();

    setCategoryData(data);
  }

  useEffect(() => {
    getCategory();
  }, []);

  const filteredData =
    searchQuery.trim() !== ""
      ? categoryData.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase());
        })
      : categoryData;

  function handleDelete(name) {
    const delteAlert = window.confirm("Delete the product");
    if (delteAlert) {
      fetch(
        `https://inventory-management-1m3p.onrender.com/delete/category/${name}`
      ).then((res) => {
        if (res.status === 500) {
          toast.error("Internal server error");
        } else if (res.status === 404) {
          toast.error("Category not found");
        } else if (res.status === 200) {
          toast.success("Category deleted successfully");
          setCategoryData((prevData) =>
            prevData.filter((item) => item.name !== name)
          );
        }
      });
    } else return;
  }

  return (
    <div className="category">
      <div className="category_container">
        <SearchAdd
          title="category"
          handleClick={() => {
            navigate("/category/AddCategory");
          }}
          setSearchQuery={setSearchQuery}
        />
        <CategoryTableInfo
          title="category"
          categoryTitle={categoryTitle}
          categoryData={filteredData}
          handleDelete={handleDelete}
          handleEdit={(item) => {
            navigate("/category/editCategory", { state: { item } });
          }}
        />
      </div>
    </div>
  );
}
