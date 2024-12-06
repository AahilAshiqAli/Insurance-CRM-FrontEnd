import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import { useNavigate } from "react-router-dom";
import { useProductSetup } from "./ProductSetupProvider";
import "./PerilCreation.css";

const PerilCreation = () => {
  const navigate = useNavigate();
  const { productData } = useProductSetup();

  // Initialize perilsData state to store an array of perils
  const [perilsData, setPerilsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Initialize newPeril state as an object with default values
  const [newPeril, setNewPeril] = useState({
    peril_id: "",
    peril_name: "",
    peril_description: "",
    type: "",
    value: "",
    factor: "",
    isSelected: false,
  });

  const [showModal, setShowModal] = useState(false);

  // Effect to initialize perilsData from productData
  useEffect(() => {
    if (productData) {
      setLoading(true);
      setError(null); // Clear previous errors

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzQxODM5MCwiZXhwIjoxNzM3MDE4MzkwfQ.HlLwvXxKTTZle6sk9fbzxsxzG-yqFT_R2jkGD5NsPJQ"; // Replace with actual token

      // Fetch data from the backend API for perils
      fetch("http://localhost:3000/api/perils", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch peril data"); // Handle failed fetch request
          }
          return response.json(); // Parse JSON response
        })
        .then((data) => {
          const transformedData = data.map((peril, index) => ({
            peril_id: peril.peril_id || "", // Set peril_id from API response or default to ""
            peril_name: peril.peril_name || "", // Set peril_name from API response or default to ""
            peril_description: peril.peril_description || "", // Set peril_description from API response or default to ""
            type: "", // Default value for type
            value: "", // Default value for value
            factor: "", // Default value for factor
            isSelected: productData.peril_ids.includes(peril.peril_id),
          }));

          setPerilsData(transformedData); // Update the perilsData state with transformed data
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((err) => {
          setError("Failed to load peril data"); // Set error message in case of failure
          setLoading(false); // Set loading to false even if there is an error
        });
    }
  }, [productData]); // Dependency on productData, so it fetches when productData is available

  // Filter to show only selected perils on the main screen
  const selectedPerils = perilsData.filter((peril) => peril.isSelected);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //update ki query

    navigate("/product-setup/insurable-interest");
  };

  // Handle view more modal
  const handleViewMore = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle adding a new peril
  const handleAddPeril = () => {
    if (newPeril.peril_description && newPeril.peril_name) {
      setLoading(true);
      setError(null); // Clear previous errors

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzQxODM5MCwiZXhwIjoxNzM3MDE4MzkwfQ.HlLwvXxKTTZle6sk9fbzxsxzG-yqFT_R2jkGD5NsPJQ"; // Replace with actual token

      // Fetch data from the backend API for perils
      fetch("http://localhost:3000/api/perils", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          peril_name: newPeril.peril_name,
          peril_description: newPeril.peril_description,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.error || "Failed to fetch data"); // Use the error message from the response or fallback
            });
          }
          return response.json(); // Parse JSON response
        })
        .then((data) => {
          const newPerilId = data.perilId; // Make sure to match the response key (perilId)
          setNewPeril((prev) => ({
            ...prev,
            peril_id: newPerilId,
          }));
          // After updating the state, you can update perilsData
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message); // Set error message in case of failure
          setLoading(false); // Set loading to false even if there is an error
        });
    }
  };

  useEffect(() => {
    // Only run the effect if peril_id is a valid non-empty string
    if (newPeril.peril_id && newPeril.peril_id !== "") {
      setPerilsData((prevData) => [
        ...prevData,
        { ...newPeril, isSelected: false },
      ]);
    }
  }, [newPeril.peril_id]);

  // Handle input changes for the new peril form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPeril((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle the selection of a peril
  const toggleSelection = (index) => {
    setPerilsData(
      perilsData.map((peril, i) =>
        i === index ? { ...peril, isSelected: !peril.isSelected } : peril
      )
    );
  };

  return (
    <div className="body">
      <Navbar />
      <ProductSidebar />
      <div className="content-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <h2 className="font-psemibold text-primary text-3xl text-left m-5">
              Perils
            </h2>
            <table className="perils-table">
              <thead>
                <tr>
                  <th>Perils Code</th>
                  <th>Peril Name</th>
                  <th>Peril Description</th>
                </tr>
              </thead>
              <tbody>
                {selectedPerils.length > 0 ? (
                  selectedPerils.map((peril) => (
                    <tr key={peril.peril_id}>
                      <td>{peril.peril_id}</td>
                      <td>{peril.peril_name}</td>
                      <td>{peril.peril_description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No perils selected</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="view-more-btn" onClick={handleViewMore}>
              Add More
            </button>

            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h2 className="modal-heading">Perils Details</h2>

                  <table className="modal-table">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Perils Code</th>
                        <th>Peril Name</th>
                        <th>Peril Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {perilsData.map((peril, index) => (
                        <tr key={peril.peril_id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={peril.isSelected || false}
                              onChange={() => toggleSelection(index)}
                            />
                          </td>
                          <td>{peril.peril_id}</td>
                          <td>{peril.peril_name}</td>
                          <td>{peril.peril_description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 className="add-peril-heading">Add New Peril</h3>
                  <div className="add-peril-form">
                    <input
                      type="text"
                      name="peril_name"
                      placeholder="Peril Name"
                      value={newPeril.peril_name}
                      onChange={handleInputChange}
                    />

                    <input
                      type="text"
                      name="type"
                      placeholder="Peril Type (e.g., motor)"
                      value={newPeril.type}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="value"
                      placeholder="Peril Value"
                      value={newPeril.value}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="factor"
                      placeholder="Peril Factor"
                      value={newPeril.factor}
                      onChange={handleInputChange}
                    />
                    <textarea
                      name="peril_description"
                      placeholder="Peril Description"
                      value={newPeril.peril_description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="modal-actions">
                    <button className="add-button" onClick={handleAddPeril}>
                      Add
                    </button>
                    <button className="close-button" onClick={handleCloseModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-16">
              <button
                type="submit"
                className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PerilCreation;

// const perilArrayLength = productData.peril_ids.length;

// const fetchedPerils = Array.from(
//   { length: perilArrayLength },
//   (_, index) => ({
//     peril_id: productData.peril_ids[index] || "",
//     peril_name: productData.peril_names[index] || "",
//     peril_description: productData.peril_descriptions[index] || "",
//     type: "", // Default value for type
//     value: "", // Default value for value
//     factor: "", // Default value for factor
//     isSelected: true, // Default value for isSelected
//   })
// );
// _ indicates actual value in place of that index.
// setPerilsData(fetchedPerils);
// logi to fetch perils from ProductSetupProvider
