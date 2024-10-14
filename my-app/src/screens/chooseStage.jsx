import "./chooseStage.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar"; // Import Link from react-router-dom

const Dashboard = () => {
  const options = [
    { title: "Product Setup", icon: "📦", path: "/" },
    {
      title: "Policy Process",
      icon: "🛡️",
      path: "/policy-creation/customer-info",
    },
    { title: "Claims Module", icon: "📄", path: "/" },
    { title: "Endorsement", icon: "🔖", path: "/" },
    { title: "Renewal", icon: "🔁", path: "/" },
  ];

  return (
    <div>
      <Navbar></Navbar>
      <div className="dashboard-container">
        <h1 className="title py-5">What would you like to use CRM for?</h1>
        <div className="grid-container">
          {options.map((option, index) => (
            <Link to={option.path} className="grid-item" key={index}>
              <span className="icon">{option.icon}</span>
              <h3>{option.title}</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
