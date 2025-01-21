import React, { useState,useEffect } from "react";
import { initializeOTPless, phoneAuth, verifyOTP } from "./otpless";
import Swal from 'sweetalert2';


function LoanForm() {
  
  useEffect(() => {
    initializeOTPless();
  }, []);
// In your React component

const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);


  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false); // New state for Thank You section
  const [showThankYoufinal, setshowThankYoufinal] = useState(false);
  const [error, setError] = useState("");
  const [errorpin, setErrorpin] = useState("");

  
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Dynamically inject the Google Analytics script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXX');
    `;

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      // Cleanup scripts if necessary
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;

    // Allow only digits and enforce 10-digit maximum
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });

      if (value.length > 10) {
        setError("Phone number cannot exceed 10 digits.");
      } else {
        setError(""); // Clear error if input is valid
      }
    }
  };

  const handlePinChange = (e) => {
    const { value } = e.target;

    // Allow only digits and enforce 6-digit maximum
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, pin: value });

      if (value.length > 6) {
        setErrorpin("PIN code cannot exceed 6 digits.");
      } else {
        setError(""); // Clear error if input is valid
      }
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    employment:"",
    loan_type:"",
    loan_amount:"",
    pin:"",
    monthly_income:""

  });
  const [formData1, setFormData1] = useState({
    property_Identified: "",
    property_type: "",
    down_payment:"",
    business_vintage:"",
    nature_of_business:"",
    estimated_property_value:"",
  });

  const [otp, setOtp] = useState("");
  const isFormValid = () => {
    const { name, phone, employment, loan_type, loan_amount, pin, monthly_income } = formData;
  
    // Basic validations
    const isNameValid = name.trim() !== ""; // Name should not be empty
    const isPhoneValid = /^\d{10}$/.test(phone.trim()); // Phone should be exactly 10 digits
    const isEmploymentValid = employment.trim() !== ""; // Employment should not be empty
    const isLoanTypeValid = loan_type.trim() !== ""; // Loan type should not be empty
    const isLoanAmountValid = /^\d+$/.test(loan_amount.trim()) && parseInt(loan_amount, 10) > 0; // Loan amount should be a positive number
    const isPinValid = /^\d{6}$/.test(pin.trim()); // Pin should be exactly 6 digits
    const isMonthlyIncomeValid = /^\d+$/.test(monthly_income.trim()) && parseInt(monthly_income, 10) > 0; // Monthly income should be a positive number
  
    // Combine all validations
    return (
      isNameValid &&
      isPhoneValid &&
      isEmploymentValid &&
      isLoanTypeValid &&
      isLoanAmountValid &&
      isPinValid &&
      isMonthlyIncomeValid &&
      isCheckboxSelected // Ensure checkbox is selected

    );
  };

  const isFormValid1 = () => {
    const {
      property_Identified,
      property_type,
      down_payment,
      business_vintage,
      nature_of_business,
      estimated_property_value,
    } = formData1;
  
    // Dropdown validations (should not be empty)
    const isPropertyIdentifiedValid = property_Identified.trim() !== "";
    const isPropertyTypeValid = property_type.trim() !== "";
    const isDownPaymentValid = down_payment.trim() !== "";
    const isBusinessVintageValid = business_vintage.trim() !== "";
    const isNatureOfBusinessValid = nature_of_business.trim() !== "";
  
    // Input validation for estimated_property_value (should be a positive number)
    const isEstimatedPropertyValueValid =
      /^\d+$/.test(estimated_property_value.trim()) &&
      parseInt(estimated_property_value, 10) > 0;
  
    // Combine all validations
    return (
      isPropertyIdentifiedValid &&
      isPropertyTypeValid &&
      isDownPaymentValid &&
      isBusinessVintageValid &&
      isNatureOfBusinessValid &&
      isEstimatedPropertyValueValid
    );
  };
  
  const handlePhoneAuth = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      setShowOTPForm(true);
      setCurrentStep(2); // Move to OTP step
      phoneAuth(formData.phone, "+91"); // Dynamic values
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all required fields.',
      });
    }

  
  };

  const [loading, setLoading] = useState(false); // Loader state

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
  
    const onSuccess = () => {
      handleOTPVerificationSuccess(); // Call success handler
    };
  
    const onFailure = () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong OTP. Please try again.',
      });
    };
  
    try {
      // Call OTP verification logic
      await verifyOTP(formData.phone, otp, "+91", onSuccess, onFailure);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred during OTP verification. Please try again.',
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };
  
  const handleOTPVerificationSuccess = async () => {
    setLoading(true); // Show loader
    try {
      setCurrentStep(3); // Proceed to the next step
      setShowOTPForm(false); // Hide OTP form
      setShowThankYou(true); // Show Thank You message
    } catch (error) {
      console.error("Error handling OTP success:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };
  

const handleOTPSuccess = async (e) => {
  e.preventDefault();
  if (isFormValid1()) {
    setLoading(true); // Show loader
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwO4Xos-ZjyFUXnBFiWL4TDc8YqVuTS57FbtXRVIUuukIuXyV1xRRCLvLAUO3cmSmWHuA/exec"; // Replace with your script URL

    // Combine formData and formData1
    const combinedData = { ...formData, ...formData1 };
     
  
   
  
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
        mode: "no-cors", // Prevents CORS issues when sending data to Google Apps Script
      });

      setCurrentStep(3);
      setShowOTPForm(false);
      setShowThankYou(false);
      setshowThankYoufinal(true);

      // Optional: Handle server response if mode is not 'no-cors'
      // const result = await response.json();
      // if (result.status === 'success') {
      //   setStatus('Form submitted successfully!');
      // } else {
      //   setStatus('Error submitting form.');
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Error submitting form.");
    } finally {
      setLoading(false); // Hide loader
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill out all required fields.',
    });
  }
};





  const handleChangenumber = () => {
    setShowOTPForm(false);
    setCurrentStep(1); // Move to OTP step

  };
  const [countdown, setCountdown] = useState(51); // Initial countdown value
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend initially

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000); // Decrease every second
    } else {
      setIsResendDisabled(false); // Enable resend when countdown reaches 0
    }
    return () => clearInterval(timer); // Cleanup timer
  }, [countdown]);

  const handleResendClick = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true); // Disable resend after click
      setCountdown(51); // Reset countdown
      handlePhoneAuth(); // Call the resend OTP function
    }
  };
  // Validate form fields


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
        {loading && (
  <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}

        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4  flex justify-between items-center">
          <h1 className="text-base sm:text-lg font-semibold">Orbits work</h1>
        </div>
        <div class="flex justify-center items-center px-4 py-12 lg:py-16 md:py-14">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl ">

            
                <div className="lg:col-span-2 bg-white p-4 sm:p-8  rounded-lg text-center">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Thank You!</h2>
    <p className="text-sm sm:text-base text-gray-700 mb-6">
      Thank you for your interest. We will get back to you shortly.
    </p>
 
  </div>
           


        {/* Tracker Section */}
    
     
      </div>
    </div>
        {/* Tracker Section */}
        <footer className="bg-blue-900 text-white px-4 sm:px-6 py-4 mt-auto">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium">Orbits work</p>
        </div>
      
      </footer>
        </div>
    </>
  );
}

export default LoanForm;
