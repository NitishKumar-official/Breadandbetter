import User from "../models/userModel.js";
import UserDetails from "../models/UserDetails.js"
import axios from "axios";

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP to Mobile
const sendOtpMobileNumber = async (mobile_number, otp) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        variables_values: otp,
        route: "otp",
        numbers: mobile_number,
      },
      {
        headers: {
          authorization: process.env.OTP_SENDER_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    throw new Error("Failed to send OTP");
  }
};

// Login or Register and Send OTP
export const loginOrRegister = async (req, res) => {
  const { phone } = req.body;

  try {
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({ phone });
      await user.save();
    }

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendOtpMobileNumber(phone, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isRegistered) {
      if (user.otp !== otp || new Date() > user.otpExpiresAt) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      user.otp = undefined;
      user.otpExpiresAt = undefined;
      user.isRegistered = true;
      await user.save();

      return res.status(200).json({ message: "OTP verified, proceed to register", isRegistered: false });
    } else {
      return res.status(200).json({ message: "User already registered, proceed to home", isRegistered: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const register = async (req, res) => {
  try {
      const { phone, firstName, lastName, email, dob, address, profilePicture, gender } = req.body;
  
      // Check if the user is verified
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
  
      if (!user.isRegistered) {
        return res.status(400).json({ message: "User is not verified." });
      }
  
      // Save user details
      const userDetails = new UserDetails({
        userId: user._id,
        firstName,
        lastName,
        email,
        phone,
        dob,
        address,
        profilePicture,
        gender,
      });
  
      await userDetails.save();
  
      res.status(201).json({ message: "Registration successful!", redirect: "/home" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
}




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
    profilePicture: null,
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:5000/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/home"); // Redirect to home page
      }
    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-r from-pink-500 to-orange-500 text-white">
      {/* Welcome Section */}
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-md lg:text-lg mb-6">
          You are 30 seconds away from earning your own money!
        </p>
        <button
          className="px-6 py-2 bg-white text-orange-500 font-semibold rounded-md hover:bg-gray-200"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-2/3 bg-white text-black rounded-t-2xl lg:rounded-l-2xl p-6 lg:p-10">
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <input name="firstName" onChange={handleChange} required />
          <input type="file" name="profilePicture" onChange={handleFileChange} required />
          {/* Other inputs */}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
