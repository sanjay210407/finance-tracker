import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-shell">
      <div className="footer-content">
        <p className="footer-highlight">
          💡 This project demonstrates full-stack development using the MERN stack with JWT-based authentication,
          real-time data handling, and scalable backend design.
        </p>
        <p className="footer-highlight">
          📈 Includes financial analytics, dynamic charts, and optimized data aggregation for meaningful insights.
        </p>
      </div>

      <div className="footer-divider" />

      <div className="footer-contact">
        <h3 className="footer-contact-title">📫 CONTACT</h3>
        <div className="footer-contact-grid">
          <p className="footer-contact-item">
            <span className="footer-contact-label">Email:</span>
            <a href="mailto:sanjaypothulapally@gmail.com" className="footer-link">sanjaypothulapally@gmail.com</a>
          </p>
          <p className="footer-contact-item">
            <span className="footer-contact-label">Phone:</span>
            <a href="tel:+919630888123" className="footer-link">+91-9630888123</a>
          </p>
          <p className="footer-contact-item">
            <span className="footer-contact-label">GitHub:</span>
            <a href="https://github.com/sanjay210407" target="_blank" rel="noopener noreferrer" className="footer-link">https://github.com/sanjay210407</a>
          </p>
          <p className="footer-contact-item">
            <span className="footer-contact-label">LinkedIn:</span>
            <a href="https://www.linkedin.com/in/pothulapallysanjay/" target="_blank" rel="noopener noreferrer" className="footer-link">https://www.linkedin.com/in/pothulapallysanjay/</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
