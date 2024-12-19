import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gmail: "",
    mobileNo: "",
    aadharNo: "",
    profilePhoto: null,
    dob: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
    about: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstName) {
      isValid = false;
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName) {
      isValid = false;
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.gmail || !/\S+@\S+\.\S+/.test(formData.gmail)) {
      isValid = false;
      newErrors.gmail = "Valid Gmail is required.";
    }

    if (!formData.mobileNo || !/^\d{10}$/.test(formData.mobileNo)) {
      isValid = false;
      newErrors.mobileNo = "Valid 10-digit mobile number is required.";
    }

    if (!formData.aadharNo || !/^\d{12}$/.test(formData.aadharNo)) {
      isValid = false;
      newErrors.aadharNo = "Valid 12-digit Aadhar number is required.";
    }

    if (!formData.dob) {
      isValid = false;
      newErrors.dob = "Date of birth is required.";
    }

    if (!formData.country) {
      isValid = false;
      newErrors.country = "Country is required.";
    }

    if (!formData.state) {
      isValid = false;
      newErrors.state = "State is required.";
    }

    if (!formData.district) {
      isValid = false;
      newErrors.district = "District is required.";
    }

    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
      isValid = false;
      newErrors.pincode = "Valid 6-digit pincode is required.";
    }

    if (!formData.about) {
      isValid = false;
      newErrors.about = "About field is required.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const registrationData = new FormData();
      Object.keys(formData).forEach((key) => {
        registrationData.append(key, formData[key]);
      });

      // Send data to the backend
      alert("Registration successful!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">User Registration</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Gmail</label>
              <input
                type="email"
                name="gmail"
                value={formData.gmail}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.gmail && <p className="text-red-500 text-sm">{errors.gmail}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Mobile No</label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.mobileNo && <p className="text-red-500 text-sm">{errors.mobileNo}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Aadhar No</label>
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.aadharNo && <p className="text-red-500 text-sm">{errors.aadharNo}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
          </div>
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
