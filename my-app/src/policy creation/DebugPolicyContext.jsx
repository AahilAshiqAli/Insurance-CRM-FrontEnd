// DebugPolicyContext.jsx
import React from "react";
import { usePolicy } from "./PolicyContext";

const DebugPolicyContext = () => {
  const { policy } = usePolicy();

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
      <h2>Policy Context Debug Info Zohaib</h2>
      <pre>{JSON.stringify(policy, null, 2)}</pre>
    </div>
  );
};

export default DebugPolicyContext;
