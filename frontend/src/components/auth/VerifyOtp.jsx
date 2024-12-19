

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = ({ phone }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/users/verify", {
        phone,
        otp,
      });

      const { isRegistered } = response.data;

      if (isRegistered) {
        alert("Login successful! Redirecting to home page.");
        navigate("/home");
      } else {
        alert("OTP verified! Redirecting to registration page.");
        navigate("/register");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Sign Up
        </h2>

        <>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter the OTP sent to your phone"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            onClick={verifyOtp}
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      </div>
    </div>
  );
};

export default VerifyOtp;
