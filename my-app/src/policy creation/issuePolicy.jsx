import React from "react";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";

const IssuePolicy = () => {
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
            <button className="bg-green-500 text-white py-2 flex-1 mx-1 rounded whitespace-nowrap">
              View
            </button>
            <button className="bg-orange-500 text-white py-2 flex-1 mx-1 rounded whitespace-nowrap">
              Issue Policy
            </button>
            {/* <button className="bg-blue-500 text-white py-2 flex-1 mx-1 rounded whitespace-nowrap">
              Send To Mob/Email
            </button> */}
          </div>
        </div>
        <div>
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
        </div>
        <div className="flex justify-end mt-16">
          <button
            type="submit"
            className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
            onClick={() => {}}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssuePolicy;
