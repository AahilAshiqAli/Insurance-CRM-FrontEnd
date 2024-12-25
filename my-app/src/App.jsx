import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import PolicyProvider from "./policy creation/PolicyContext";

// Product Setup Wrapper
const ProductSetupWrapper = () => {
  return (
    <ProductSetupProvider>
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

// Policy Creation Wrapper
const PolicyCreationWrapper = () => {
  return (
    <PolicyProvider>
      <Routes>
        <Route path="customer-info" element={<CustomerInfo />} />
        <Route path="device-info" element={<DeviceInfo />} />
        <Route path="/" element={<InsuranceCategory />} />
        <Route path="risk-questionaire" element={<RiskQuestionnaire />} />
        <Route path="perils" element={<Perils />} />
        <Route path="tcn" element={<TemporaryCNWithQuote />} />
        <Route path="issue-policy" element={<IssuePolicy />} />
        <Route path="approval-matrix" element={<ApprovalMatrix />} />
        <Route path="kyc" element={<KYC />} />
        <Route path="pre-inspection" element={<Preinspection />} />
        <Route path="documents-upload" element={<DocumentsUpload />} />
        <Route path="/endorsement" element={<EndorsementScreen />} />
        <Route path="/renewal" element={<RenewalScreen />} />
      </Routes>
    </PolicyProvider>
  );
};

// App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/choose" element={<ChooseModule />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/policy-creation/*" element={<PolicyCreationWrapper />} />
        <Route path="/product-setup/*" element={<ProductSetupWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
