import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const ClaimIntimationScreen = () => {
  // States for search and policy details
  const [policyIdentifier, setPolicyIdentifier] = useState("");
  const [policyDetails, setPolicyDetails] = useState(null);
  const [claimHistory, setClaimHistory] = useState([]);

  const [claimForm, setClaimForm] = useState({
    incidentDate: "",
    incidentDescription: "",
    incidentLocation: "",
    repairCost: "",
    claimType: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [showInitiateClaim, setShowInitiateClaim] = useState(false);

  // Handle search
  const handleSearch = async () => {
    if (!policyIdentifier.trim()) return alert("Enter a policy number.");
    setLoading(true);
    const token = localStorage.getItem("jwt_token");
    fetch(
      `https://insurance-crm-backend-git-main-aahilashiqalis-projects.vercel.app/api/policies/${policyIdentifier}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch policy data");
        }
        return response.json();
      })
      .then((data) => {
        const policyData = data[0];

        // Convert the policy start date from `created_at` into a Date object
        const policyStartDate = new Date(policyData.created_at);

        // Clone `policyStartDate` and add 1 year to calculate the expiry date
        const policyExpiryDate = new Date(policyStartDate);
        policyExpiryDate.setFullYear(policyExpiryDate.getFullYear() + 1);

        // Set policy details
        setPolicyDetails({
          sumInsured: policyData.device_value,
          premiumAmount: policyData.quote_amount || 25000,
          policyId: policyIdentifier,
          policyNumber: policyData.policy_number,
          customerDetails: [
            policyData.cnic,
            policyData.email,
            policyData.phone_number,
            policyData.address,
          ],
          deviceDetails: [
            policyData.brand_name,
            policyData.device_model,
            policyData.device_serial_number,
            policyData.purchase_date,
            policyData.warranty_status,
          ],
          policyStartDate: policyStartDate.toISOString().split("T")[0], // Optional: Convert to a readable format
          policyExpiryDate: policyExpiryDate.toISOString().split("T")[0], // Optional: Convert to a readable format
        });

        console.log(policyData);
      })
      .catch((err) => {
        alert(err.message || "Policy Number doesnot exist");
      })
      .finally(() => {
        setLoading(false);
      });

    fetch(`http://localhost:3000/api/claims/${policyIdentifier}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch claims data");
        }
        return response.json();
      })
      .then((data) => {
        const claimsData = data.map((claim) => {
          const incidentDate = new Date(claim.incidentDate);
          return {
            id: claim.claim_id,
            date: incidentDate.toISOString().split("T")[0],
            type: claim.claimType,
            amount: claim.repairCost,
            status: claim.status,
          };
        });

        setClaimHistory(claimsData);
        console.log(claimsData);
      })
      .catch((err) => {
        alert(err.message || "Policy Number doesnot exist");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmitClaim = () => {
    const areAllFieldsFilled = Object.values(claimForm).every(
      (value) => value.trim() !== ""
    );
    if (areAllFieldsFilled) {
      setLoading(true);
      const token = localStorage.getItem("jwt_token");
      const claimsData = {
        policy_id: policyIdentifier,
        ...claimForm,
      };
      fetch(`http://localhost:3000/api/claims/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(claimsData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to post claims data");
          }
          return response.json();
        })
        .then((data) => {
          alert("Claim inserted successfully");
        })
        .catch((err) => {
          alert(err.message || "Failed to insert claims data");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Some fields are missing.");
    }

    // Submit claim logic here
  };

  const styles = {
    select: {
      width: "100%",
      border: "1px solid #d1d5db", // gray-300
      padding: "8px", // equivalent to p-2
      borderRadius: "0.375rem", // equivalent to rounded-md
      outline: "none",
      fontSize: "0.875rem", // small text size
      backgroundColor: "#ffffff", // white
      color: "#4a4a4a", // dark gray text
      appearance: "none", // to style the dropdown arrow, if needed
    },
    placeholderOption: {
      color: "#9e9e9e", // light gray text for placeholder
    },
    hoverOption: {
      backgroundColor: "#f0f0f0", // light gray on hover
    },
  };

  return (
    <div className="p-5 flex">
      {/* Sidebar and Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow mt-12 p-10">
        <h1 className="text-3xl font-semibold text-primary-100 mb-6">
          Claim Intimation
        </h1>

        {/* Search Section */}
        <div className="flex items-center space-x-4 mb-6 w-2/3">
          <input
            type="text"
            className="border rounded p-2 flex-grow"
            placeholder="Enter Policy Number"
            value={policyIdentifier}
            onChange={(e) => setPolicyIdentifier(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-primary-100 text-white py-3 px-10 rounded whitespace-nowrap font-psemibold"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Policy Details */}
        {policyDetails && (
          <div>
            <div className="mb-6 border p-4 rounded font-pregular">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-psemibold text-primary-100 mb-3">
                    Policy Details
                  </h2>
                  <p>Policy Number: {policyDetails.policyNumber}</p>
                  <p>Sum Insured: {policyDetails.sumInsured}</p>
                  <p>Premium Amount: {policyDetails.premiumAmount}</p>
                  <p>
                    Policy Start and Expiry Date:{" "}
                    {policyDetails.policyStartDate} to{" "}
                    {policyDetails.policyExpiryDate}
                  </p>
                  <p>
                    Device Details: {policyDetails.deviceDetails.join(", ")}
                  </p>
                  <p>
                    Customer Details: {policyDetails.customerDetails.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => setShowInitiateClaim(true)}
                  className="bg-primary-100 text-white py-5 px-10 rounded text-xl font-psemibold"
                >
                  Initiate Claim
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-psemibold text-primary-100 mb-5">
                Claim History
              </h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 font-psemibold">
                    <th className="py-2 px-4 border-b">Claim ID</th>
                    <th className="py-2 px-4 border-b">Incident Date</th>
                    <th className="py-2 px-4 border-b">Claim Type</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claimHistory.length > 0 ? (
                    claimHistory.map((claim, index) => (
                      <tr key={index} className="text-center font-pregular">
                        <td className="py-2 px-4 border-b">{claim.id}</td>
                        <td className="py-2 px-4 border-b">{claim.date}</td>
                        <td className="py-2 px-4 border-b">{claim.type}</td>
                        <td className="py-2 px-4 border-b">{claim.amount}</td>
                        <td className="py-2 px-4 border-b">{claim.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-2 px-4 border-b text-center"
                      >
                        No claim history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {showInitiateClaim && (
              <div className="mt-6 border p-4 rounded ">
                <h2 className="text-2xl font-psemibold text-primary-100 mb-5">
                  Initiate Claim
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-pregular mb-2">
                      Date of Incident:
                    </label>
                    <input
                      type="date"
                      className="w-72 border rounded p-2"
                      value={claimForm.incidentDate}
                      onChange={(e) =>
                        setClaimForm({
                          ...claimForm,
                          incidentDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-pregular mb-2">
                      Location of Incident:
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded p-2"
                      placeholder="Enter Location"
                      value={claimForm.incidentLocation}
                      onChange={(e) =>
                        setClaimForm({
                          ...claimForm,
                          incidentLocation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-pregular mb-2">
                      Repair Cost:
                    </label>
                    <input
                      type="number"
                      className="w-64 border rounded p-2"
                      placeholder="Enter repair cost"
                      value={claimForm.repairCost}
                      onChange={(e) =>
                        setClaimForm({
                          ...claimForm,
                          repairCost: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-pregular mb-2">
                      Claim Type
                    </label>
                    <select
                      name="claimType"
                      value={claimForm.claimType}
                      onChange={(e) =>
                        setClaimForm({
                          ...claimForm,
                          claimType: e.target.value,
                        })
                      }
                      className="w-64 border rounded p-2"
                      required
                    >
                      <option
                        value=""
                        disabled
                        selected
                        style={styles.placeholderOption}
                      >
                        Select Condition
                      </option>
                      <option value="Damage" style={styles.hoverOption}>
                        Theft
                      </option>
                      <option value="Theft" style={styles.hoverOption}>
                        Damage
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block font-pregular mb-2">
                    Description:
                  </label>
                  <textarea
                    className="w-full border rounded p-2"
                    rows="3"
                    placeholder="Describe the incident"
                    value={claimForm.incidentDescription}
                    onChange={(e) =>
                      setClaimForm({
                        ...claimForm,
                        incidentDescription: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="mt-4">
                  <label className="block font-pregular mb-2">
                    Upload Device Photos:
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      setUploadedPhotos([...uploadedPhotos, ...e.target.files])
                    }
                  />
                </div>
                <div className="flex justify-end mt-16">
                  <button
                    type="submit"
                    className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
                    onClick={handleSubmitClaim}
                  >
                    {loading ? "Submitting Claim..." : "Submit Claim"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimIntimationScreen;
