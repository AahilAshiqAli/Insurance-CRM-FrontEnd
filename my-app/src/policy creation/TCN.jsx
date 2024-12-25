import React from "react";
import emailjs from "emailjs-com"; // Import the EmailJS library
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";

const TemporaryCNWithQuote = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/policy-creation/issue-policy");
  };

  // Function to handle email sending
  const sendEmail = () => {
    const templateParams = {
      to_email: "naqeeb.nadir091@gmail.com",
      subject: "Temporary CN Issued",
      message: "Hello!",
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

  return (
    <div className="p-5 flex">
      <Navbar />
      <PolicySidebar />
      <div className="flex flex-col flex-grow mt-12 p-10">
        <h1 className="text-2xl font-psemibold text-primary-100 mb-4">
          Temporary CN with Quote
        </h1>
        <div className="flex flex-col w-2/3">
          <div className="flex items-center justify-around mb-4">
            <div className="mr-5 font-psemibold">Policy 3354</div>
            <div>
              <label className="mr-5">Start Date:</label>
              <input type="date" className="border rounded p-2" />
            </div>
            <div>
              <label className="mr-2">Expiry Date:</label>
              <input type="date" className="border rounded p-2" />
            </div>
          </div>

          <div className="flex items-center justify-start space-x-2 mb-4">
            <button
              className="bg-green-500 text-white py-2 flex-1 mx-1 rounded whitespace-nowrap"
            >
              View
            </button>
            <button
              className="bg-orange-500 text-white py-2 flex-1 mx-1 rounded whitespace-nowrap"
              onClick={sendEmail} // Attach the sendEmail function
            >
              Issue TCN
            </button>
          </div>
        </div>
        <div>
          <div className="text-2xl font-psemibold text-primary-100 my-8">
            Finance
          </div>
          <div>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 font-psemibold">
                  <th className="py-2 px-4 border-b">Payment Type</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Tax</th>
                  <th className="py-2 px-4 border-b">Authorized By</th>
                  <th className="py-2 px-4 border-b">Details</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="font-pregular text-center">
                  <td className="py-2 px-4 border-b">Cash</td>
                  <td className="py-2 px-4 border-b">21/09/2024</td>
                  <td className="py-2 px-4 border-b">250,000 PKR</td>
                  <td className="py-2 px-4 border-b">4,000 PKR</td>
                  <td className="py-2 px-4 border-b">Nadeem</td>
                  <td className="py-2 px-4 border-b">Nil</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
      </div>
    </div>
  );
};

export default TemporaryCNWithQuote;
