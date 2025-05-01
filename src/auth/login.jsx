import React, { useState } from "react";
import image from "../constants/images";
import "./login.css"; // Import your custom CSS file for layout and positioning
import Dashboard from "../components/dashboard";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    setError(null);

    const requestBody = {
      email: email,
      password: password,
    };

    fetch(
      "https://insurance-crm-backend-git-main-aahilashiqalis-projects.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed! Please check your credentials.");
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log("Login successful:", data);
        const token = data.token;
        localStorage.setItem("jwt_token", token);
        navigate("/choose"); // Redirect on successful login
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-screen-container flex min-h-screen">
      {/* Left side: Login Form */}
      <div className="login-form-container bg-white flex flex-col items-center">
        <div className="logo-container w-28 mb-8"></div>
        <h2 className="text-3xl font-psemibold text-primary mb-2">Login</h2>
        <p className="text-center text-gray-600 mb-8">
          Enter Your Login Credentials Here
        </p>
        <form
          className="space-y-6 w-full max-w-md px-6"
          onSubmit={handleSubmit}
        >
          <div className="input-group flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="aahilashiqali@gmail.com"
              className="input-field p-3 border border-gray-300 rounded-md text-black-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="input-relative relative">
              <input
                type="password"
                id="password"
                placeholder="***************"
                className="input-field p-3 w-full border text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-secondary">
                <i className="icon-eye"></i>
              </span>
            </div>
          </div>
          <div className="login-options flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-secondary-100 border-primary rounded focus:ring-secondary"
              />
              <label htmlFor="rememberMe" className="ml-2 text-primary">
                Remember me?
              </label>
            </div>
            <a href="/" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="login-button w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-secondary-200 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>

      {/* Right side: Business Dashboard Promotion */}
      <div className="promo-panel hidden md:flex flex-col justify-center items-center bg-primary-100">
        <div className="promo-image w-70 flex justify-center items-center">
          <Dashboard />
        </div>
        <h3 className="promo-title text-2xl font-pbold text-white text-center mb-4 my-5">
          Easy-to-Use BPR for Managing Your Business.
        </h3>
        <p className="promo-text text-center text-gray-200 mb-8 px-6">
          Streamline Your Business Management with Our User-Friendly Dashboard.
          Simplify complex tasks, track key metrics, and make informed decisions
          effortlessly.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
