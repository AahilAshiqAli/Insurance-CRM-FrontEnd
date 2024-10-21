import React from "react";
import { useNavigate } from "react-router-dom";

export const ApprovalMatrix = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/policy-creation/tcn");
  };

  return (
    <div>
      approval matrix
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
  );
};
