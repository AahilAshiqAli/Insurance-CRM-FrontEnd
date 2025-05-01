import "./navbar.css";

const Navbar = () => {
  return (
    <div className="main-content">
    <nav className="navbar bg-primary-100">
      <div className="navbar-logo">
        <h2>Insurance CRM Project</h2>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="navbar-icons">
        <span className="icon">⚙️</span>
        <span className="icon">⛶</span>
        <span className="icon">📬</span>
        <span className="icon">🔔</span>
      </div>
      <div className="navbar-profile">
        <span className="profile-role">Admin</span>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
