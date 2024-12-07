import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";

const EndorsementScreen = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const handlebutton = (e) => {
        e.preventDefault();
        navigate("/policy-creation"); // Navigate to the next page
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
        className="border border-gray-300 rounded-md p-2 text-gray-800 focus:ring focus:ring-blue-300 w-full"
      />
    </div>

    {/* Submit Button */}
    <div className="flex justify-center">
      <button
        className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
        onClick={handlebutton}
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
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
</div>
</div>
);

}

export default EndorsementScreen
  