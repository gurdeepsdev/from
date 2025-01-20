// src/utils/otpless.js
let OTPlessSignin;

const callback = (eventCallback) => {
  const EVENTS_MAP = {
    ONETAP: () => {
      const { response } = eventCallback;
      console.log("OneTap Response:", response);
    },
    OTP_AUTO_READ: () => {
      const { response: { otp } } = eventCallback;
      console.log("Auto-read OTP:", otp);
    },
    FAILED: () => {
      const { response } = eventCallback;
      console.error("Failed Response:", response);
    },
    FALLBACK_TRIGGERED: () => {
      const { response } = eventCallback;
      console.log("Fallback Triggered:", response);
    },
  };

  if ("responseType" in eventCallback) EVENTS_MAP[eventCallback.responseType]?.();
};

export const initializeOTPless = () => {
  if (window.OTPless) {
    OTPlessSignin = new window.OTPless(callback);
  } else {
    console.error("OTPless SDK not loaded.");
  }
};

export const phoneAuth = (phone, countryCode) => {
  if (!OTPlessSignin) return console.error("OTPless not initialized.");
  OTPlessSignin.initiate({
    channel: "PHONE", // Set the channel to PHONE
    phone,
    countryCode,
  }).then(response => {
    if (response.status === "SUCCESS") {
      console.log("OTP sent successfully.");
      // Save the OTP and phone in local storage
      localStorage.setItem("otp", response.otp);
      localStorage.setItem("phone", phone);
    }
  }).catch(error => {
    console.error("Error initiating OTP:", error);
  });
};

export const verifyOTP = (phone, otp, countryCode) => {
  const savedOTP = localStorage.getItem("otp");
  const savedPhone = localStorage.getItem("phone");

  if (phone === savedPhone && otp === savedOTP) {
    console.log("OTP verified successfully (locally).");
    return true; // Return true for successful verification
  } else {
    console.error("OTP verification failed (locally).");
    return false; // Return false for failed verification
  }
};
