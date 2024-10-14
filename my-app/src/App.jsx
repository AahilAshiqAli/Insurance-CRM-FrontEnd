import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChooseModule from "./screens/chooseStage";
import CustomerInfo from "./policy creation/customerInfo";
import Navbar from "./components/navbar";
import Login from "./auth/login";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseModule />} />
        <Route
          path="policy-creation/customer-info"
          element={<CustomerInfo />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
