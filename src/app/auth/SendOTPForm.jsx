import TextField from "@/common/TextField";
import React from "react";

const SendOTPForm = ({ phoneNumber, onChange }) => {
  return (
    <div>
      <form action="">
        <div>
          <TextField
            label="شماره موبایل"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn--primary w-full mt-8">
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
};

export default SendOTPForm;
