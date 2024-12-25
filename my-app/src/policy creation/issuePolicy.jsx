import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com"; // Import the EmailJS library
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";
import { usePolicy } from "./PolicyContext";

const IssuePolicy = () => {
  const [perilsData, setPerilsData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { policyData } = usePolicy();

  const startDate = new Date().toISOString().split("T")[0]; // Get today's date
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 365); // Add 7 days to today's date
  const endDateValue = endDate.toISOString().split("T")[0]; // Get date after 7 days

  useEffect(() => {
    // Clear previous errors and set loading to true when the component mounts
    setLoading(true);
    setError(null);

    // Get JWT token from localStorage
    const token = localStorage.getItem("jwt_token");

    // Fetch peril data from the backend API
    fetch("http://localhost:3000/api/perils", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authentication
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch peril data");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Map through the fetched data and transform it
        const transformedData = data.map((peril) => ({
          peril_id: peril.peril_id || "",
          peril_name: peril.peril_name || "",
          peril_description: peril.peril_description || "",
        }));

        setPerilsData(transformedData); // Set the transformed data into state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError("Failed to load peril data"); // Set error message if fetch fails
        setLoading(false); // Stop loading even if there's an error
      });
  }, []); // Dependency array to re-run the effect if `productData` changes

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Policy Creation is Completed");
    navigate("/choose");
  };

  // Function to handle email sending
  const sendEmail = () => {
    const templateParams = {
      to_email: "aahilashiqali@gmail.com",
      subject: "Temporary CN Issued",
      message: generateFormattedText(policyData),
    };

    emailjs
      .send(
        "service_lahlthq", // Replace with your EmailJS service ID
        "template_1n0hi4e", // Replace with your EmailJS template ID
        templateParams,
        "D6aEi7IvSwkRs1V2y" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          alert("Email sent successfully!");
          console.log("SUCCESS:", response);
        },
        (error) => {
          alert("Failed to send email.");
          console.error("FAILED:", error);
        }
      );
  };

  const handleView = () => {
    const fileContent = generateFormattedText(policyData);
    const blob = new Blob([fileContent], { type: "text/plain" });
    const fileURL = URL.createObjectURL(blob);

    // Open the pop-up with the file content
    window.open(fileURL, "_blank");
  };

  const generateFormattedText = (policyData) => {
    let documentContent = `
      Policy Document:
      ==========================
      Policy Number: ${policyData.policy_number || "N/A"}
      Quote Amount: ${policyData.quote_amount || "N/A"}
      Start Date: ${startDate || "N/A"}
      Expiry Date: ${endDate || "N/A"}
      
      Information:
      ==========================
      `;

    // Append additional policy data
    documentContent += `
      License Type:
      ${policyData.license_type || "N/A"}
    
      Device Information:
      - Device ID: ${policyData.device_id || "N/A"}
      - Device Type: ${policyData.device_type || "N/A"}
      - Device Model: ${policyData.device_model || "N/A"}
      - Device Serial Number: ${policyData.device_serial_number || "N/A"}
      - Purchase Date: ${policyData.purchase_date || "N/A"}
      - Device Value: ${policyData.device_value || "N/A"}
      - Device Condition: ${policyData.device_condition || "N/A"}
      - Warranty Status: ${policyData.warranty_status || "N/A"}
    
      Customer Information:
      - Customer ID: ${policyData.customer_id || "N/A"}
      - First Name: ${policyData.first_name || "N/A"}
      - Last Name: ${policyData.last_name || "N/A"}
      - Phone Number: ${policyData.phone_number || "N/A"}
      - Email: ${policyData.email || "N/A"}
      - CNIC: ${policyData.cnic || "N/A"}
    
      Point of Contact (POC):
      - POC Name: ${policyData.poc_name || "N/A"}
      - POC Number: ${policyData.poc_number || "N/A"}
      - POC CNIC: ${policyData.poc_cnic || "N/A"}
      - Relationship with Customer: ${
        policyData.relationship_with_customer || "N/A"
      }
    
      Brand Information:
      - Brand Name: ${policyData.brand_name || "N/A"}
    
      Quote Details:
      - Quote Amount: ${policyData.quote_amount || "N/A"}
    
      Inspector Details:
      - Inspector Name: ${policyData.inspector_name || "N/A"}
      - Inspector Location: ${policyData.inspector_location || "N/A"}
      - Inspector Phone: ${policyData.inspector_phone || "N/A"}
    
      Remarks:
      - CEO Remarks: ${policyData.remarks_ceo || "N/A"}
      - COO Remarks: ${policyData.remarks_coo || "N/A"}
    
      Product Perils:
      ==========================
      `;

    perilsData.forEach((peril) => {
      documentContent += `
        perilid: ${peril.peril_id || "N/A"}
        peril name: ${peril.peril_name || "N/A"}
        peril desc: ${peril.peril_description || "N/A"}
        `;
    });

    return documentContent;
  };

  return (
    <div className="p-5 flex">
      <Navbar />
      <PolicySidebar />
      <div className="flex flex-col flex-grow mt-12 p-10">
        <h1 className="text-2xl font-psemibold text-primary-100 mb-4">
          Issue Policy
        </h1>
        <div className="flex flex-col w-2/3">
          <div className="flex items-center justify-around mb-4">
            <div className="mr-5 font-psemibold">
              {" "}
              Policy {policyData.policy_number}
            </div>
            <div>
              <label className="mr-5">Start Date:</label>
              <input
                type="date"
                className="border rounded p-2"
                defaultValue={startDate}
              />
            </div>
            <div>
              <label className="mr-2">Expiry Date:</label>
              <input
                type="date"
                className="border rounded p-2"
                defaultValue={endDateValue}
              />
            </div>
          </div>

          <div className="flex items-center justify-start space-x-2 mb-4">
            <button
              className="bg-green-500 text-white py-2 flex-1 mx-1 rounded whitespace-nowrap"
              onClick={handleView}
            >
              View
            </button>
            <button
              className="bg-orange-500 text-white py-2 flex-1 mx-1 rounded whitespace-nowrap"
              onClick={sendEmail}
            >
              {" "}
              Issue Policy
            </button>
            {/* <button className="bg-blue-500 text-white py-2 flex-1 mx-1 rounded whitespace-nowrap">
              Send To Mob/Email
            </button> */}
          </div>
        </div>
        {/* <div>
          <div className="text-2xl font-psemibold text-primary-100 my-8">
            Delivery Status
          </div>
          <div>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 font-psemibold">
                  <th className="py-2 px-4 border-b">Contractor</th>
                  <th className="py-2 px-4 border-b">Person Assign</th>
                  <th className="py-2 px-4 border-b">Booking Time</th>
                  <th className="py-2 px-4 border-b">Dispatched Time</th>
                  <th className="py-2 px-4 border-b">Dispatched Date</th>
                  <th className="py-2 px-4 border-b">Recieved Ack</th>
                  <th className="py-2 px-4 border-b">Remarks</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="font-pregular text-center">
                  <td className="py-2 px-4 border-b">TCS</td>
                  <td className="py-2 px-4 border-b">Nadeem</td>
                  <td className="py-2 px-4 border-b">21/09/2024 10:54</td>
                  <td className="py-2 px-4 border-b">21/09/2024 10:54</td>
                  <td className="py-2 px-4 border-b">21/09/2024 </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:underline">
                      Recieved
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">OK</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
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

export default IssuePolicy;
