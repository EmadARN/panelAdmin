"use client";

import React from "react";
import SendOTPForm from "./SendOtpForm";

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };
  const sendOtpHandler = async (e) => {};
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm ">
        <SendOTPForm
          phoneNumber={phoneNumber}
          onChange={phoneNumberHandler}
          onSubmit={sendOtpHandler}
        />
      </div>
    </div>
  );
};

export default AuthPage;
