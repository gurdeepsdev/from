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
    console.log("df",eventCallback);

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
      channel: "PHONE",  // Set the channel to PHONE
      phone,
      countryCode,
    }).then(response => {
      if (response.status === "SUCCESS") {
        console.log("OTP sent successfully.");
      }
    }).catch(error => {
      console.error("Error initiating OTP:", error);
    });
  };
  

  // export const verifyOTP = (phone, otp, countryCode) => {
  //   if (!OTPlessSignin) return console.error("OTPless not initialized.");
  //   OTPlessSignin.verify({
  //     channel: "PHONE",  // Set the channel to PHONE
  //     phone:phone,
  //     otp:otp,
  //     countryCode:"+91",
  //   }).then(response => {
  //     console.log(response.success);
  //     if (response.success == "true") {
  //       console.log("OTP verified successfully.");
  //     }
  //   }).catch(error => {
  //     console.error("Error verifying OTP:", error);
  //   });
  // };
 
  export const verifyOTP = (phone, otp, countryCode, onSuccess, onFailure) => {
    if (!OTPlessSignin) {
      console.error("OTPless not initialized.");
      return;
    }
  
    OTPlessSignin.verify({
      channel: "PHONE",
      phone: phone,
      otp: otp,
      countryCode: countryCode,
    })
      .then(response => {
        console.log("Full verifyOTP response:", response);
        if (response.success === true) {
          console.log("OTP verified successfully.");
          if (onSuccess) onSuccess();
        } else {
          console.warn("OTP verification failed:", response);
          if (onFailure) onFailure(); // Call the onFailure callback
        }
      })
      .catch(error => {
        console.error("Error verifying OTP:", error);
        if (onFailure) onFailure(); // Call the onFailure callback
      });
  };
  
  