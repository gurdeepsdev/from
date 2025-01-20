import React, { useState,useEffect } from "react";
import { initializeOTPless, phoneAuth, verifyOTP } from "./otpless";


function LoanForm() {
  useEffect(() => {
    initializeOTPless();
  }, []);
// In your React component

useEffect(() => {
  initializeOTPless();
}, []);


  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false); // New state for Thank You section

  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    employment:"",
    loan_type:"",
    loan_amount:"",
    pin:"",
    monthly_income:""

  });
  const [otp, setOtp] = useState("");
  const handlePhoneAuth = () => {
    setShowOTPForm(true);
    setCurrentStep(2); // Move to OTP step
    phoneAuth(formData.phone, "+91"); // Dynamic values
  };
  console.log(formData.phone)
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const isVerified = await verifyOTP(formData.phone, otp, "+91");
      if (isVerified) {
        setCurrentStep(3);
        setShowOTPForm(false);
        setShowThankYou(true);
        alert("OTP Verified Successfully!");
      } else {
        alert("Wrong OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred while verifying OTP. Please try again later.");
    }
  };
  
  
  console.log('new',otp)  
  // Validate form fields
  const isFormValid = () =>
    formData.name.trim() !== "" && formData.phone.trim().length === 10;

  // const handleGenerateOTP = (e) => {
  //   e.preventDefault();

  //   if (isFormValid()) {
  //     setShowOTPForm(true);

  //     setCurrentStep(2); // Move to OTP step
  //   } else {
  //     alert("Please fill out all required fields.");
  //   }
  // };

  // const handleVerifyOTP = (e) => {
  //   e.preventDefault();
  //   if (otp.trim().length === 4) {
  //     setCurrentStep(3); // Move to review step
  //   } else {
  //     alert("Please enter a valid OTP.");
  //   }
  // };
  // const handleGenerateOTP = (e) => {
  //   e.preventDefault();
  //   setShowOTPForm(true);
  // };


  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();

//     const scriptURL = 'https://script.google.com/macros/s/AKfycbwYdzq9FN_ZTniUoP9IeRw17XdLc7feO6s7FNd8wboB4qo8e-haRPGPGE-_p2cOd6NH/exec'; // Replace with your script URL

//     try {
//       const response = await fetch(scriptURL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//         mode: 'no-cors',

//       });
// console.log('hh',formData)      // Move to OTP step
// setCurrentStep(3);
// setShowOTPForm(false);
// setShowThankYou(true); 
//       const result = await response.json();
//       if (result.status === 'success') {
//         setStatus('Form submitted successfully!');
//         setFormData({ name: '', email: ''});
//       } else {
//         setStatus('Error submitting form.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setStatus('Error submitting form.');
//     }
//   }

  
  return (
    <>
        <div className="min-h-screen flex flex-col" >

        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4  flex justify-between items-center">
          <h1 className="text-base sm:text-lg font-semibold">Bajaj Finserv</h1>
        </div>
        <div class="bg-gray-100 flex justify-center items-center px-4 py-12 lg:py-16 md:py-14">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* Conditional Rendering */}
                  {showThankYou ? (
  <div className="lg:col-span-2 bg-white p-4 sm:p-8  rounded-lg text-center">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Thank You!</h2>
    <p className="text-sm sm:text-base text-gray-700 mb-6">
      Thank you for your interest. We will get back to you shortly.
    </p>
 
  </div>
) :    showOTPForm ? (

      <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Enter your One Time Password (OTP)
              </h2>
              <div className="text-center mb-6">
                <span className="text-4xl">🔒</span>
              </div>
              <form className="space-y-4" onSubmit={handleVerifyOTP}>
                <div className="flex justify-center space-x-2">
                  {Array(4)
                    .fill("")
                    .map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={otp[index] || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setOtp((prevOtp) =>
                            prevOtp.slice(0, index) + value + prevOtp.slice(index + 1)
                          );
                        }}
                        className="border border-gray-300 rounded-md w-12 h-12 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ))}
                </div>
                <p className="text-sm text-orange-500 text-center mt-4 cursor-pointer">
                  Change Mobile Number?
                </p>
                <p className="text-sm text-center mt-2">
                  Didn’t receive OTP?{" "}
                  <span className="text-blue-500 cursor-pointer">
                    Resend OTP
                  </span>
                  <br />
                  <span>in 51 Seconds</span>
                </p>
                <div className="mt-4">
                  <label className="flex items-start text-xs sm:text-sm">
                    <input type="checkbox" className="h-4 w-4 text-blue-500 mt-1" />
                    <span className="ml-2">
                      I authorise Bajaj Housing Finance Limited and its affiliates to contact me,
                      overriding my registration for DNC/NDNC, if any, and I have understood and
                      agree with the{" "}
                      <span className="text-orange-500 underline cursor-pointer">
                        Terms and Conditions
                      </span>
                      .
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-2 px-4 text-sm sm:text-base rounded-lg hover:bg-orange-600"
                >
                  Proceed
                </button>
              </form>
            </div>
             ) : (
        <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Please share your basic details
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm sm:text-base font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Please enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm sm:text-base font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Please enter your 10-digit phone number"
             

                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Employment Type */}
            <div className="col-span-2">
              <label className="block text-sm sm:text-base font-medium mb-1">
                Employment Type
              </label>
              <div className="flex flex-wrap gap-4">
  <label className="flex items-center">
    <input
      type="radio"
      name="employment"
      className="form-radio text-blue-500 h-4 w-4"
      value="Salaried"
      checked={formData.employment === "Salaried"}
      onChange={(e) =>
        setFormData({ ...formData, employment: e.target.value })
      }
    />
    <span className="ml-2 text-sm sm:text-base">Salaried</span>
  </label>
  <label className="flex items-center">
    <input
      type="radio"
      name="employment"
      className="form-radio text-blue-500 h-4 w-4"
      value="Self-Employed"
      checked={formData.employment === "Self-Employed"}
      onChange={(e) =>
        setFormData({ ...formData, employment: e.target.value })
      }
    />
    <span className="ml-2 text-sm sm:text-base">Self-Employed</span>
  </label>
  <label className="flex items-center">
    <input
      type="radio"
      name="employment"
      className="form-radio text-blue-500 h-4 w-4"
      value="Self-Employed Doctors/CAs"
      checked={formData.employment === "Self-Employed Doctors/CAs"}
      onChange={(e) =>
        setFormData({ ...formData, employment: e.target.value })
      }
    />
    <span className="ml-2 text-sm sm:text-base">Self-Employed Doctors/CAs</span>
  </label>
</div>

            </div>

            {/* Loan Type */}
            <div>
  <label className="block text-sm sm:text-base font-medium mb-1">
    Select Loan Type
  </label>
  <select
    value={formData.loan_type} // Ensure this binds to the correct state key
    onChange={(e) =>
      setFormData({ ...formData, loan_type: e.target.value })
    }
    className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Please select the type of loan</option>
    <option value="home">Home</option>
    <option value="business">Business</option>
  </select>
</div>


            {/* Net Monthly Income */}
            <div>
              <label className="block text-sm sm:text-base font-medium mb-1">
                Net Monthly Income
              </label>
              <input
                type="text"
                placeholder="Please enter your total net monthly income"
                value={formData.monthly_income}
                onChange={(e) =>
                  setFormData({ ...formData, monthly_income: e.target.value })
                }
                className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Loan Amount */}
            <div>
              <label className="block text-sm sm:text-base font-medium mb-1">
                Required Loan Amount
              </label>
              <input
                type="text"
                placeholder="Please enter the loan amount"
                value={formData.loan_amount}
                onChange={(e) =>
                  setFormData({ ...formData, loan_amount: e.target.value })
                }
                className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PIN Code */}
            <div>
              <label className="block text-sm sm:text-base font-medium mb-1">
                PIN Code
              </label>
              <input
                type="text"
                placeholder="Please enter PIN code"
                value={formData.pin}
                onChange={(e) =>
                  setFormData({ ...formData, pin: e.target.value })
                }
                className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Terms */}
            <div className="col-span-2 flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-500" />
              <label className="ml-2 text-xs sm:text-sm">
                I authorise Bajaj Housing Finance Limited and its affiliates to contact me,
                overriding my registration for DNC/NDNC, if any, and I have understood and agree
                with the{" "}
                <span className="text-orange-500 underline cursor-pointer">
                  Terms and Conditions
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-2 px-4 text-sm sm:text-base rounded-lg hover:bg-orange-600"
             onClick={handlePhoneAuth}
             >
                Generate OTP
              </button>
            </div>
          </form>
        </div>
 )}


        {/* Tracker Section */}
    
          {/* Tracker Section */}
          <div className="bg-blue-900 text-white p-6 rounded-lg lg:col-span-1 flex flex-col">
            <h3 className="text-lg font-semibold mb-6">My Tracker</h3>
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span
                    className={`h-6 w-6 ${
                      currentStep >= 1 ? "bg-green-500" : "bg-blue-900"
                    } rounded-full flex justify-center items-center text-white text-sm`}
                  >
                    {currentStep > 1 ? "✓" : "1"}
                  </span>
                </div>
                <p className="ml-4 text-sm">Submit Basic Details</p>
              </div>
              {/* Step 2 */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span
                    className={`h-6 w-6 ${
                      currentStep >= 2 ? "bg-green-500" : "border-2 border-white bg-blue-900"
                    } rounded-full flex justify-center items-center text-white text-sm`}
                  >
                    {currentStep > 2 ? "✓" : "2"}
                  </span>
                </div>
                <p className="ml-4 text-sm">Generate OTP</p>
              </div>
              {/* Step 3 */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span
                    className={`h-6 w-6 ${
                      currentStep >= 3 ? "bg-green-500" : "border-2 border-white bg-blue-900"
                    } rounded-full flex justify-center items-center text-white text-sm`}
                  >
                    3
                  </span>
                </div>
                <p className="ml-4 text-sm">Review Loan Details</p>
              </div>
            </div>
            </div>
      </div>
    </div>
        {/* Tracker Section */}
        <footer className="bg-blue-900 text-white px-4 sm:px-6 py-4 mt-auto">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium">My Tracker</p>
        </div>
        {/* Uncomment the line below if you want to show status messages */}
        {/* {status && <p className="mt-4 text-center">{status}</p>} */}
      </footer>
        </div>
    </>
  );
}

export default LoanForm;
