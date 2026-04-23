import { useState } from "react";
import API, { warmUpAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await warmUpAPI().catch(() => null);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          ([502, 503].includes(err?.response?.status)
            ? "Backend is unavailable on Render. Please check the latest backend deploy logs."
            : null) ||
          (err?.code === "ERR_NETWORK"
            ? "Backend is waking up. Please try again in a few seconds."
            : null) ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to view your finance dashboard.</p>

        <div className="auth-form">
          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>

        <p className="auth-footer">
          New here?
          <span className="auth-link" onClick={() => navigate("/register")}>Create account</span>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
