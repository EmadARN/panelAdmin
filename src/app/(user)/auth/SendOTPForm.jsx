import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import React from "react";

const SendOTPForm = ({ phoneNumber, onChange, onSubmit, isPending }) => {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SendOTPForm;
