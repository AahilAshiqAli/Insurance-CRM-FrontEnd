import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RenewalScreen = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  // Dictionary of policy data
  const [policies, setPolicies] = useState([
    { policyNumber: "CL1234", duration: 29 },
    { policyNumber: "CL5678", duration: 27 },
  ]);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Handle row click
  const handleRowClick = (policy) => {
    setSelectedPolicy(policy);
    setShowRemarks(false); // Reset remarks visibility when selecting a new policy
    setSelectedDate("");
  };

  // Handle date input and update duration
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const daysDifference = Math.ceil(
      (selectedDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference > 0 && selectedPolicy) {
      // Update the policy duration
      const updatedPolicies = policies.map((policy) =>
        policy.policyNumber === selectedPolicy.policyNumber
          ? { ...policy, duration: policy.duration + daysDifference }
          : policy
      );

      // Sort policies by duration in ascending order
      updatedPolicies.sort((a, b) => a.duration - b.duration);

      setPolicies(updatedPolicies);
      setSelectedDate(e.target.value); // Update the selected date
    }
  };

  // Handle Continue click
  const handleContinue = (e) => {
    e.preventDefault();
    setShowRemarks(false); // Close the remarks box
    navigate("/policy-creation"); // Navigate to the next page
  };

  // Handle Discontinue click
  const handleDiscontinue = () => {
    setShowRemarks(true); // Show remarks box
  };

  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="content-container">
        <h2 className="font-psemibold text-primary text-3xl text-left m-5">
          Renewal
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Policy Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Duration
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Msg Response
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Call
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
                  <td className="border border-gray-300 px-4 py-2">
                    {policy.msgResponse}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button className="text-green-500 text-lg hover:scale-110 transition">
                      📞
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Policy Details Section */}
        {selectedPolicy && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Policy Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Policy Number */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">
                  Policy Number
                </label>
                <div className="bg-gray-200 p-2 rounded-md">
                  {selectedPolicy.policyNumber}
                </div>
              </div>

              {/* Date Input */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Input Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="border border-gray-300 rounded-md p-2 text-gray-800 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Continue Button */}
              <button
                className="col-span-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                onClick={handleContinue}
              >
                Continue
              </button>

              {/* Discontinue Button */}
              <button
                className="col-span-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                onClick={handleDiscontinue}
              >
                Discontinue
              </button>
            </div>

            {/* Remarks Section */}
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
