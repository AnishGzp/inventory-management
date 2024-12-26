import "./home.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import React, { useEffect, useState } from "react";

export default function Home() {
  const [productData, setProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);

  async function getProduct() {
    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/products"
    );

    const data = await res.json();

    setProductData(data);
  }

  async function gatSales() {
    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/sales"
    );

    const data = await res.json();

    setSalesData(data);
  }

  useEffect(() => {
    getProduct();
    gatSales();
  }, []);

  const numberOfProduct = productData.length;
  console.log(salesData);

  const productSold = salesData
    .reduce((total, item) => {
      return total + parseInt(item.quantity, 10);
    }, 0)
    .toLocaleString();

  const revenueGenerated = salesData
    .reduce((total, item) => {
      return total + parseInt(item.price, 10);
    }, 0)
    .toLocaleString();

  const aggregatedSalesData = salesData.reduce((acc, item) => {
    const productName = item.productName;
    const quantity = parseInt(item.quantity, 10);

    if (acc[productName]) {
      acc[productName] += quantity;
    } else {
      acc[productName] = quantity;
    }

    return acc;
  }, {});

  const labels = Object.keys(aggregatedSalesData);
  const dataPoints = Object.values(aggregatedSalesData);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Products Sold",
        data: dataPoints,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Sales Overview",
      },
    },
  };

  return (
    <div className="home">
      <div className="home_container">
        <div className="home_container_header">
          <h2>Inventory Details</h2>
          <div className="home_container_header_content">
            <div className="card">
              <p>
                <span>Number of products: </span>
                {numberOfProduct}
              </p>
            </div>
            <div className="card">
              <p>
                <span>Products Sold: </span>
                {productSold}
              </p>
            </div>
            <div className="card">
              <p>
                <span>Revenue Generated: </span>
                {revenueGenerated}
              </p>
            </div>
          </div>
        </div>
        <div className="home_container_body">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
