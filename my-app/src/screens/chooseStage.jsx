import "./chooseStage.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar"; // Import Link from react-router-dom

const Dashboard = () => {
  const options = [
    { title: "Product Setup", icon: "📦", path: "/product-setup/choose" },
    {
      title: "Policy Process",
      icon: "🛡️",
      path: "/policy-creation/",
    },
    { title: "Claims Module", icon: "📄", path: "/" },
    { title: "Endorsement", icon: "🔖", path: "/" },
    { title: "Renewal", icon: "🔁", path: "/Renewal/" },
  ];

  return (
    <div className="py-10">
      <Navbar />
      <section className="dashboard-container w-full">
        <h1 className="pt-10 text-primary font-psemibold text-3xl">
          What would you like to use CRM for?
        </h1>
        <div className="grid-container mt-20">
          {options.map((option, index) => (
            <Link to={option.path} className="grid-item" key={index}>
              <span className="icon">{option.icon}</span>
              <h3 className="text-primary font-psemibold">{option.title}</h3>
              <p className="font-pregular">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
