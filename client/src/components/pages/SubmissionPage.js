import React, { useState } from "react";
import "../styles/SubmissionPage.css";

const SubmissionPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  // State to manage the message displayed to the user after form submission
  const [message, setMessage] = useState("");

  // State to manage whether the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false); // <-- Define isSubmitted state here

  // Handler function to update the formData state when user inputs data
  const handleChange = e => {
    const { name, value } = e.target; // Destructure name and value from the event target (input field)

    // Update form the new value
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler function for form submission
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // POST request
      const response = await fetch("/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      console.log("Response Status:", response.status);

      if (response.status === 201) {
        console.log("201: Order submitted successfully.");
        setMessage("Thank you! Your order is successfully submitted! ✅"); // Set success message to display
        setIsSubmitted(true); // Setform as submitted
        setFormData({ fullName: "", email: "", phone: "", address: "" }); // Clear the form
      } else {
        console.log("Error submitting order:", response.status);
        setMessage("Error submitting order, please try again.");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error:", error);
      setMessage("An error occurred, please try again.");
    }
  };

  return (
    <div className="submission-container">
      <h1 className="title">Submission Form</h1>

      {isSubmitted
        ? // Render success message if form is submitted
          <p className="success-message">
            {message}
          </p>
        : // Render form if it hasn't been submitted yet
          <form className="submission-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>

            {/* Email */}
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            {/* Phone */}
            <label>
              Primary Phone:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>

            {/* Address */}
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>

            {/* Submit button */}
            <button type="submit" className="submit-button">
              Submit Order
            </button>
          </form>}
    </div>
  );
};

export default SubmissionPage;
