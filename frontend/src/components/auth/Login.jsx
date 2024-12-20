// import React, { useState } from "react";
// import axios from "axios";

// const Login = ({ setPhone, setIsOtpSent }) => {
//   const [phone, setLocalPhone] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const sendOtp = async () => {
//     setIsLoading(true);
//     try {
//       await axios.post("http://localhost:8000/api/users/login", { phone });
//       setPhone(phone);
//       setIsOtpSent(true);
//     } catch (error) {
//       alert(error.response?.data?.message || "Error sending OTP");
//     }
//     finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="loginPage flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//           Sign Up
//         </h2>
//         <>
//           <div className="mb-4">
//             <label
//               htmlFor="phoneNumber"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Phone Number
//             </label>
//             <input
//               type="text"
//               id="phoneNumber"
//               placeholder="Enter your 10-digit phone number"
//               value={phone}
//               onChange={(e) => setLocalPhone(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//           <button
//             onClick={sendOtp}
//             disabled={isLoading}
//             className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
//           >
//             {isLoading ? 'Sending OTP...' : 'Send OTP'}
//           </button>
//         </>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";

const Login = ({ setPhone, setIsOtpSent }) => {
  const [phone, setLocalPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8000/api/users/login", { phone });
      setPhone(phone);
      setIsOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-orange-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Welcome Section */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Please enter your phone number to receive an OTP
        </p>

        {/* Input Section */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Enter your 10-digit phone number"
            value={phone}
            onChange={(e) => setLocalPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-800"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={sendOtp}
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-4 py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>

        {/* Terms and Conditions */}
        <p className="text-xs text-center text-gray-500 mt-6">
          By pressing "Send OTP" you agree to our{" "}
          <span className="text-orange-500 underline">terms & conditions</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
