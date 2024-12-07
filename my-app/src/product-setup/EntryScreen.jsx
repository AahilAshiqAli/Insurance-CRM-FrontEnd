import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import "./EntryScreen.css";
import { useNavigate } from "react-router-dom";
import { useProductSetup } from "./ProductSetupProvider";

const EntryScreen = () => {
  const navigate = useNavigate();
  const { setProductId } = useProductSetup();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleEdit = (productId) => {
    setProductId(productId);
    navigate("/product-setup/");
  };

  const handleDelete = (productId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzI0MzYwOSwiZXhwIjoxNzM2ODQzNjA5fQ.P_jHI1g8jST9T5sHppb36gh0ZBV14M9lzbxx9ZkU88A";
    setLoading(true);
    fetch(`http://localhost:3000/api/product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // Attempt to parse the response body
        return response.json().then((data) => {
          if (!response.ok) {
            // If response is not OK (status 400), throw error with backend message
            throw new Error(data.error || "Failed to delete product data");
          }
          // If response is OK, continue with the data (e.g., successful delete)
          return data;
        });
      })
      .then((data) => {
        console.log("Product deleted successfully:", data);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.product_id !== productId)
        ); // Remove deleted product from the state
        setLoading(false);
        // Optionally handle successful deletion (e.g., update state)
      })
      .catch((err) => {
        console.log(err); // Logs the actual error message from the backend
        setError(err.message || "Failed to delete product data");
        setLoading(false);
      });
  };

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzI0MzYwOSwiZXhwIjoxNzM2ODQzNjA5fQ.P_jHI1g8jST9T5sHppb36gh0ZBV14M9lzbxx9ZkU88A";
    setLoading(true);
    fetch("http://localhost:3000/api/product/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); // Update state with fetched data
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product data");
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/product-setup/");
  };

  return (
    <div className="body">
      <Navbar />
      <ProductSidebar />
      <div className="content-container">
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4">No products available</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.product_id}>
                      <td>{product.product_id}</td>
                      <td>{product.product_name}</td>
                      <td>
                        {product.status ? <p>Completed</p> : <p>In Progress</p>}
                      </td>
                      <td>
                        <button
                          className="update-btn"
                          onClick={() => handleEdit(product.product_id)}
                        >
                          Update
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(product.product_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-end mt-16">
          <button
            type="submit"
            className="py-4 px-10 bg-primary text-white font-semibold rounded-md hover:bg-secondary transition duration-300"
            onClick={handleSubmit}
          >
            Create a New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
