import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import "./Product_Name.css";
import { useNavigate } from "react-router-dom";
import { useProductSetup } from "./ProductSetupProvider";

const ProductName = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { productId, productData, setProductData, setProductId } =
    useProductSetup();
  const [product, setProduct] = useState({
    product_name: "",
    package_name: "",
    product_abbreviation: "",
    policy_type: "",
    policy_period: "",
    temporary_cn_max_time: "",
    customer_type: "",
  });
  const validateInputs = () => {
    const {
      product_name,
      package_name,
      product_abbreviation,
      policy_type,
      policy_period,
      temporary_cn_min_time,
      temporary_cn_max_time,
      customer_type,
    } = product;

    if (!product_name.trim()) {
      alert("Product Name is required.");
      return false;
    }

    if (product.package === "yes" && !package_name.trim()) {
      alert("Package Name is required when 'Package' is 'Yes'.");
      return false;
    }

    if (!product_abbreviation.trim()) {
      alert("Product Abbreviation is required.");
      return false;
    }

    if (!policy_type) {
      alert("Please select a Policy Type.");
      return false;
    }

    if (!policy_period) {
      alert("Please select a Policy Period.");
      return false;
    }

    if (isNaN(temporary_cn_min_time) || temporary_cn_min_time === "") {
      alert("Temporary CN Minimum Time must be a valid number.");
      return false;
    }

    if (isNaN(temporary_cn_max_time) || temporary_cn_max_time === "") {
      alert("Temporary CN Maximum Time must be a valid number.");
      return false;
    }

    if (Number(temporary_cn_min_time) > Number(temporary_cn_max_time)) {
      alert(
        "Temporary CN Minimum Time cannot be greater than Temporary CN Maximum Time."
      );
      return false;
    }

    if (!customer_type) {
      alert("Please select a Customer Type.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return; // Stop if validation fails
    }
    if (!productId) {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("jwt_token");
      const insertData = {
        product_name: product.product_name,
        package_name: product.package_name,
        product_abbreviation: product.product_abbreviation,
        policy_type: product.policy_type,
        policy_period: product.policy_period,
        temporary_cn_min_time: product.temporary_cn_min_time,
        temporary_cn_max_time: product.temporary_cn_max_time,
        customer_type: product.customer_type,
      };

      fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(insertData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create product");
          }
          return response.json();
        })
        .then((data) => {
          // Handle successful product creation
          console.log("Product created successfully:", data);
          const { productId } = data; // Assuming the response contains 'productId'
          setProductId(productId);
          setLoading(false); // Stop the loading state
        })
        .catch((error) => {
          // Handle errors
          setError(error.message);

          setLoading(false); // Stop the loading state
        });
    } else {
      const updatedData = {
        ...productData, // Spread all properties of productData
        product_name: product.product_name,
        package_name: product.package_name,
        product_abbreviation: product.product_abbreviation,
        policy_type: product.policy_type,
        policy_period: product.policy_period,
        temporary_cn_min_time: product.temporary_cn_min_time,
        temporary_cn_max_time: product.temporary_cn_max_time,
        customer_type: product.customer_type,
      };

      // Set the updated product data
      setProductData(updatedData);
    }
    navigate("/product-setup/peril-creation");
  };

  useEffect(() => {
    if (productData) {
      setProduct({
        product_name: productData.product_name || "",
        package_name: productData.package_name || "",
        product_abbreviation: productData.product_abbreviation || "",
        policy_type: productData.policy_type || "",
        policy_period: productData.policy_period || "",
        temporary_cn_min_time: productData.temporary_cn_min_time || "",
        temporary_cn_max_time: productData.temporary_cn_max_time || "",
        customer_type: productData.customer_type || "",
      });
    }
  }, [productData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  // this syntax is used to preserve rest of all values except the one thats changed.
  // In the handleInputChange function, you're using event delegation. When an input field changes, it triggers the onChange event handler, passing the event object. The event object contains details about the event, such as which element triggered it and the value of the input field.

  return (
    <div className="body">
      <Navbar />
      <ProductSidebar /> {/* Sidebar inside the body */}
      <div className="content-container">
        <h2 className="font-psemibold text-primary text-3xl text-left m-5">
          Product Information
        </h2>

        {/* Form structure with rows */}
        <form className="form-style">
          <div className="form-row font-pregular">
            <div className="input-group font-pregular">
              <label>Product Name</label>
              <input
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </div>
            <div className="input-group font-pregular">
              <label>Package</label>
              <select
                name="package"
                // value={product.package_name ? "yes" : "no"} // Set to 'yes' if package_name is not empty
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  Select Package
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="input-group font-pregular">
              <label>Package Name</label>
              <input
                type="text"
                name="package_name"
                value={product.package_name}
                onChange={handleInputChange}
                placeholder="Package Name"
                disabled={product.package !== "yes"}
              />
            </div>
          </div>

          <div className="form-row font-pregular">
            <div className="input-group font-pregular">
              <label>Product Abbreviation/Product Prefix</label>
              <input
                type="text"
                name="product_abbreviation"
                value={product.product_abbreviation}
                onChange={handleInputChange}
                placeholder="Enter product Abbreviation"
              />
            </div>
            <div className="input-group font-pregular">
              <label>Policy Type</label>
              <select
                name="policy_type"
                value={product.policy_type} // Set default value to product.policy_type
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  Select Policy Type
                </option>
                <option value="Open Policy">Open Policy</option>
                <option value="Fixed Policy">Fixed Policy</option>
              </select>
            </div>
            <div className="input-group font-pregular">
              <label>Policy Period</label>
              <select
                name="policy_period"
                value={product.policy_period} // Set default value to product.policy_type
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  Select Policy Period
                </option>
                <option value="1 year">1 Year</option>
                <option value="6 months">6 Months</option>
              </select>
            </div>
          </div>

          <div className="form-row font-pregular">
            <div className="input-group font-pregular">
              <label>Temporary CN Minimum Time</label>
              <input
                type="number"
                name="temporary_cn_min_time"
                value={product.temporary_cn_min_time}
                onChange={handleInputChange}
                placeholder="Temporary CN Min Time"
              />
            </div>
            <div className="input-group font-pregular">
              <label>Temporary CN Maximum Time</label>
              <input
                type="number"
                name="temporary_cn_max_time"
                value={product.temporary_cn_max_time}
                onChange={handleInputChange}
                placeholder="Temporary CN Max Time"
              />
            </div>
            <div className="input-group font-pregular">
              <label>Customer Type</label>
              <select
                name="customer_type"
                value={product.customer_type} // Set default value to product.policy_type
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  Select Customer Type
                </option>
                <option value="Corporate">Corporate</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-16">
            <button
              type="submit"
              className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductName;
