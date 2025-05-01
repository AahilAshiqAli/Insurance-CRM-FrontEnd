import React from "react";
import "./dashboard.css";

const dashboard = () => {
  return (
    <div class="dashboard-container">
      <h1 class="dashboard-title">Insurance Dashboard</h1>
      <div class="filters"></div>

      <div class="metrics">
        <div class="metric-card">
          <h2>Total Policies</h2>
          <p class="metric-value">1,204</p>
          <p class="metric-change positive">↑ 12%</p>
        </div>
        <div class="metric-card">
          <h2>Claims Processed</h2>
          <p class="metric-value">287</p>
          <p class="metric-change positive">↑ 8%</p>
        </div>
        <div class="metric-card">
          <h2>Average Premium</h2>
          <p class="metric-value">$3,205</p>
          <p class="metric-change positive">↑ 5.5%</p>
        </div>
        <div class="metric-card">
          <h2>Claim Approval Rate</h2>
          <p class="metric-value">92%</p>
          <p class="metric-change negative">↓ 2%</p>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
