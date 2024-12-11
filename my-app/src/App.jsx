import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChooseModule from "./screens/chooseStage";
import CustomerInfo from "./policy creation/customerInfo";
import Login from "./auth/login";
import Dashboard from "./components/dashboard";
import DeviceInfo from "./policy creation/deviceInfo";
import InsuranceCategory from "./policy creation/InsuranceCategory";
import RiskQuestionnaire from "./policy creation/risk-questionaire";
import { Perils } from "./policy creation/perils";
import TemporaryCNWithQuote from "./policy creation/TCN";
import IssuePolicy from "./policy creation/issuePolicy";
import KYC from "./policy creation/KYC";
import Preinspection from "./policy creation/pre-inspection";
import { ApprovalMatrix } from "./policy creation/approval-matrix";
import DocumentsUpload from "./policy creation/documents-upload";
import CustomerProfileRules from "./product-setup/CustomerProfileRules.jsx";
import PerilCreation from "./product-setup/PerilCreation.jsx";
import ProductName from "./product-setup/Product_Name.jsx";
import RenewalRules from "./product-setup/RenewalRules.jsx";
import PremiumComputation from "./product-setup/PremiumComputation.jsx";
import InsurableInterest from "./product-setup/InsurableInterest.jsx";
import ProductSetupProvider from "./product-setup/ProductSetupProvider.js";
import EntryScreen from "./product-setup/EntryScreen.jsx";
import RenewalScreen from "./Renewal/Renewal.jsx";
import EndorsementScreen from "./Endorcement/Endorsement.jsx";
import Payment from "./Payment/payment.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

const ProductSetupWrapper = () => {
  console.log("kjkh");
  return (
    <ProductSetupProvider>
      {" "}
      {/* You can wrap the context here if needed */}
      <Routes>
        <Route path="/" element={<ProductName />} />
        <Route path="/choose" element={<EntryScreen />} />
        <Route path="/peril-creation" element={<PerilCreation />} />
        <Route
          path="/customer-profile-rules"
          element={<CustomerProfileRules />}
        />
        <Route path="/rules-for-renewal" element={<RenewalRules />} />
        <Route path="/insurable-interest" element={<InsurableInterest />} />
        <Route path="/premium-computation" element={<PremiumComputation />} />
      </Routes>
    </ProductSetupProvider>
  );
};

function App() {
  console.log("jbjhbkj");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseModule />} />
        <Route
          path="policy-creation/customer-info"
          element={<CustomerInfo />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/policy-creation/device-info" element={<DeviceInfo />} />
        <Route path="policy-creation/" element={<InsuranceCategory />} />
        <Route
          path="policy-creation/risk-questionaire"
          element={<RiskQuestionnaire />}
        />
        <Route path="policy-creation/perils" element={<Perils />} />
        <Route path="policy-creation/tcn" element={<TemporaryCNWithQuote />} />
        <Route path="policy-creation/issue-policy" element={<IssuePolicy />} />
        <Route
          path="policy-creation/approval-matrix"
          element={<ApprovalMatrix />}
        />
        <Route path="policy-creation/kyc" element={<KYC />} />
        <Route
          path="policy-creation/pre-inspection"
          element={<Preinspection />}
        />
        <Route
          path="policy-creation/documents-upload"
          element={<DocumentsUpload />}
        />
        <Route path="product-setup/*" element={<ProductSetupWrapper />} />
        <Route path="Renewal/" element={<RenewalScreen />} />
        <Route path="Endorsement/" element={<EndorsementScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
