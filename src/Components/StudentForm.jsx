import React, { useState } from 'react';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    status: 'active',
    createdBy: '',
    classId: '',
    parentId: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    createdBy: '',
    classId: '',
    parentId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessages = {};

    // Name Validation
    if (!formData.name) {
      isValid = false;
      errorMessages.name = 'Name is required';
    }

    // Email Validation (simple format check)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email) {
      isValid = false;
      errorMessages.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      isValid = false;
      errorMessages.email = 'Please enter a valid email address';
    }

    // Phone Number Validation (simple length check)
    if (!formData.phoneNumber) {
      isValid = false;
      errorMessages.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.length < 10) {
      isValid = false;
      errorMessages.phoneNumber = 'Phone number must be at least 10 digits';
    }

    // Created By Validation
    if (!formData.createdBy) {
      isValid = false;
      errorMessages.createdBy = 'Created By is required';
    }

    // Class ID Validation
    if (!formData.classId) {
      isValid = false;
      errorMessages.classId = 'Class ID is required';
    }

    // Parent ID Validation
    if (!formData.parentId) {
      isValid = false;
      errorMessages.parentId = 'Parent ID is required';
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (validateForm()) {
      // If valid, send data to the backend
      fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Form submitted successfully:', data);
          // Reset form
          setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            status: 'active',
            createdBy: '',
            classId: '',
            parentId: ''
          });
          setErrors({}); // Clear error messages after successful submission
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Student Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Created By Input */}
        <div className="mb-4">
          <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">Created By</label>
          <input
            type="text"
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.createdBy ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          />
          {errors.createdBy && <p className="text-red-500 text-sm">{errors.createdBy}</p>}
        </div>

        {/* ClassId Dropdown */}
        <div className="mb-4">
          <label htmlFor="classId" className="block text-sm font-medium text-gray-700">Class ID</label>
          <select
            id="classId"
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.classId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          >
            <option value="">Select Class</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
            <option value="class4">Class 4</option>
          </select>
          {errors.classId && <p className="text-red-500 text-sm">{errors.classId}</p>}
        </div>

        {/* ParentId Dropdown */}
        <div className="mb-4">
          <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">Parent ID</label>
          <select
            id="parentId"
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.parentId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            required
          >
            <option value="">Select Parent</option>
            <option value="parent1">Parent 1</option>
            <option value="parent2">Parent 2</option>
            <option value="parent3">Parent 3</option>
            <option value="parent4">Parent 4</option>
          </select>
          {errors.parentId && <p className="text-red-500 text-sm">{errors.parentId}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
