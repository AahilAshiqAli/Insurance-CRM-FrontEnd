import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { usePolicy } from "../policy creation/PolicyContext";

const RenewalScreen = () => {
  const navigate = useNavigate();
  const { setPolicyId, setRenewal } = usePolicy();
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt_token");
    fetch(`http://localhost:3000/api/policies/${selectedPolicy.policyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete policy");
        }
        return response.json();
      })
      .then((data) => {
        // Show success alert
        alert("Policy deleted successfully!");
      })
      .catch((err) => {
        // Show error alert
        alert(err.message || "Failed to delete policy.");
      });

    navigate("/choose");
  };

  // Handle row click
  const handleRowClick = (policy) => {
    setSelectedPolicy(policy);
    setShowRemarks(false);
    setRemarks("");
  };

  // Handle Continue button click
  const handleContinue = (e) => {
    e.preventDefault();
    setShowRemarks(false);
    console.log(selectedPolicy);
    setPolicyId(selectedPolicy.policyId);
    setRenewal(true);
    navigate("/policy-creation");
  };

  // Handle Discontinue button click
  const handleDiscontinue = () => {
    setShowRemarks(true);
  };

  // Fetch policies on component mount
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const currentDate = new Date();

    fetch("http://localhost:3000/api/policies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch policy data");
        }
        return response.json();
      })
      .then((data) => {
        const filteredPolicies = data
          .map((policy) => {
            const createdDate = new Date(policy.created_at);
            const endDate = new Date(createdDate);
            endDate.setDate(createdDate.getDate() + 365);
            const remainingDays = Math.ceil(
              (endDate - currentDate) / (1000 * 60 * 60 * 24)
            );

            return {
              policyId: policy.policy_id,
              policyNumber: policy.policy_number,
              duration: remainingDays,
            };
          })
          .filter((policy) => policy.duration < 40 && policy.duration > 0)
          .sort((a, b) => a.duration - b.duration);

        setPolicies(filteredPolicies);
      })
      .catch((err) => {
        setError(err.message || "Failed to load policies data");
      });
  }, []);

  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="content-container">
        <h2 className="font-psemibold text-primary text-3xl text-left m-5">
          Renewal
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Policy Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(policy)}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {policy.policyNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {policy.duration} days
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedPolicy && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Policy Details
            </h3>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col flex-grow">
                <label className="font-medium text-gray-700">
                  Policy Number
                </label>
                <div className="bg-gray-200 p-2 rounded-md">
                  {selectedPolicy.policyNumber}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                  onClick={handleContinue}
                >
                  Continue
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                  onClick={handleDiscontinue}
                >
                  Discontinue
                </button>
              </div>
            </div>

            {showRemarks && (
              <div className="mt-4">
                <label className="font-medium text-gray-700">Remarks</label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring focus:ring-blue-300"
                  placeholder="Enter your remarks here..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            )}
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

export default RenewalScreen;
