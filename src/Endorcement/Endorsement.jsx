import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { usePolicy } from "../policy creation/PolicyContext"; // Assuming this is where usePolicy is defined

const EndorsementScreen = () => {
  const navigate = useNavigate();

  // Local state to manage the input value for product ID
  const [productId, setProductIdLocal] = useState("");

  // Access the context to get setProductId
  const { setPolicyId, setEndorsement } = usePolicy();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPolicyId(productId); // Update the product ID in context when form is submitted
    setEndorsement(true);
    navigate("/policy-creation"); // Navigate to the home page
  };

  const handleInputChange = (e) => {
    setProductIdLocal(e.target.value); // Update local product ID state
  };

  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="content-container">
        <h2 className="font-psemibold text-primary text-3xl text-left m-5">
          Endorsement
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center gap-6">
            {/* Product ID Input Field */}
            <div className="flex flex-col w-full max-w-md">
              <input
                type="text"
                placeholder="Enter Product ID"
                value={productId} // Bind to local state
                onChange={handleInputChange} // Update local state on input change
                className="border border-gray-300 rounded-md p-2 text-gray-800 focus:ring focus:ring-blue-300 w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-16">
          <button
            type="submit"
            className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
            onClick={handleSubmit} // Trigger setProductId when submitting
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndorsementScreen;
