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
  

  export const verifyOTP = (phone, otp, countryCode) => {
    return new Promise((resolve, reject) => {
      if (!OTPlessSignin) {
        console.error("OTPless not initialized.");
        reject("OTPless not initialized.");
        return;
      }
  
      OTPlessSignin.verify({
        channel: "PHONE", // Set the channel to PHONE
        phone,
        otp : otp,
        countryCode,
      })
      console.log("otp",otp)

        .then(response => {
          if (response.status === "SUCCESS") {
            console.log("OTP verified successfully.");
            resolve(true); // Return success
          } else {
            console.error("OTP verification failed.");
            resolve(false); // Return failure
          }
        })
        .catch(error => {
          console.error("Error verifying OTP:", error);
          reject(error);
        });
    });
  };
  