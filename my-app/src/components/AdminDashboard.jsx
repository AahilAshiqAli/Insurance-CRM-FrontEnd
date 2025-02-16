import React, { useState, useEffect } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzI0MzYwOSwiZXhwIjoxNzM2ODQzNjA5fQ.P_jHI1g8jST9T5sHppb36gh0ZBV14M9lzbxx9ZkU88A";
    fetch(
      `https://insurance-crm-backend-git-main-aahilashiqalis-projects.vercel.app/api/dashboard/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return response.json();
      })
      .then((data) => {
        setMetrics(data); // Set the metrics data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Insurance Dashboard</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="metrics">
            <div className="metric-card">
              <h2>Total Policies</h2>
              <p className="metric-value">
                {metrics.totalPolicies?.total ?? "N/A"}
              </p>
              <p className="metric-change positive">↑ 12%</p>
            </div>
            <div className="metric-card">
              <h2>Claims Processed</h2>
              <p className="metric-value">
                {metrics.claimsProcessed?.processed ?? "N/A"}
              </p>
              <p className="metric-change positive">↑ 8%</p>
            </div>

            <div className="metric-card">
              <h2>Pending Claims</h2>
              <p className="metric-value">
                {metrics.claimsProcessed?.pending ?? 1}{" "}
              </p>
            </div>
            <div className="metric-card">
              <h2>Claim Approval Rate</h2>
              <p className="metric-value">
                {metrics.claimApprovalRate?.rate ?? "N/A"}%
              </p>
            </div>
            {/* Modified Metrics */}

            <div className="metric-card">
              <h2>Average Premium</h2>
              <p className="metric-value">
                $
                {metrics.avgPremium?.avg
                  ? parseFloat(metrics.avgPremium.avg).toFixed(2)
                  : "N/A"}
              </p>
            </div>
            <div className="metric-card">
              <h2>Premium Growth</h2>
              <p className="metric-value">15%</p>{" "}
              {/* Static value to show growth */}
            </div>
            <div className="metric-card">
              <h2>Top Performing Product</h2>
              <p className="metric-value">
                {metrics.bestProduct.product_name ?? "N/A"}
              </p>
            </div>
            <div className="metric-card">
              <h2>Low-Risk Policies</h2>
              <p className="metric-value">
                {metrics.totalPolicies?.total - 3 ?? "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
