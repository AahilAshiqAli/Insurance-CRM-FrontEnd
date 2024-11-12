import React, { useState } from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import "./PerilCreation.css";
import { useNavigate } from "react-router-dom";

const initialPerilsData = [
  {
    code: "PC-0101",
    name: "Earthquake",
    description:
      "Events causing loss that the reinsurer will cover under the agreement.",
    isSelected: true,
  },
  {
    code: "PC-0102",
    name: "Fire",
    description:
      "Events causing loss that the reinsurer will cover under the agreement.",
    isSelected: true,
  },
  {
    code: "PC-0103",
    name: "Sinking",
    description:
      "Events causing loss that the reinsurer will cover under the agreement.",
    isSelected: false,
  },
  {
    code: "PC-0104",
    name: "Flood",
    description:
      "Events causing loss that the reinsurer will cover under the agreement.",
    isSelected: false,
  },
];
const PerilCreation = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/product-setup/customer-profile-rules");
  };
  const [showModal, setShowModal] = useState(false);
  const [perilsData, setPerilsData] = useState(initialPerilsData);
  const [newPeril, setNewPeril] = useState({
    code: "",
    name: "",
    type: "",
    value: "",
    factor: "",
    description: "",
  });

  // Filter to show only selected perils on the main screen
  const selectedPerils = perilsData.filter((peril) => peril.isSelected);

  const handleViewMore = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddPeril = () => {
    if (newPeril.code && newPeril.name) {
      setPerilsData([...perilsData, { ...newPeril, isSelected: false }]);
      setNewPeril({
        code: "",
        name: "",
        type: "",
        value: "",
        factor: "",
        description: "",
      }); // Reset form
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPeril((prev) => ({ ...prev, [name]: value }));
  };

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
      <PolicySidebar />
      <div className="content-container">
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
            {selectedPerils.map((peril) => (
              <tr key={peril.code}>
                <td>{peril.code}</td>
                <td>{peril.name}</td>
                <td>{peril.description}</td>
              </tr>
            ))}
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
                    <tr key={peril.code}>
                      <td>
                        <input
                          type="checkbox"
                          checked={peril.isSelected || false}
                          onChange={() => toggleSelection(index)}
                        />
                      </td>
                      <td>{peril.code}</td>
                      <td>{peril.name}</td>
                      <td>{peril.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="add-peril-heading">Add New Peril</h3>
              <div className="add-peril-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Peril Name"
                  value={newPeril.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="code"
                  placeholder="Peril Code"
                  value={newPeril.code}
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
                  name="description"
                  placeholder="Peril Description"
                  value={newPeril.description}
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
      </div>
    </div>
  );
};
export default PerilCreation;
