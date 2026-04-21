import "./Navbar.css";

function Navbar({ title, subtitle, onDownload, onLogout }) {
  return (
    <header className="navbar-shell">
      <div className="navbar-heading-wrap">
        <h1 className="navbar-title">{title}</h1>
        <p className="navbar-subtitle">{subtitle}</p>
      </div>

      <div className="navbar-actions">
        <button onClick={onDownload} className="navbar-btn navbar-btn-download">
          Download PDF
        </button>

        <button onClick={onLogout} className="navbar-btn navbar-btn-logout">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
