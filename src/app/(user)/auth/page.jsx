"use client";
import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authServices";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";
import SendOTPForm from "./SendOTPForm";
const RESEND_TIME = 90;

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [otp, setOtp] = React.useState("");
  const [time, setTime] = React.useState(RESEND_TIME);
  const router = useRouter();

  const {
    data: otpResponse,
    error,
    isPending,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { mutateAsync: mutateCheckOtp, isPending: isCechkingOtp } = useMutation(
    {
      mutationFn: checkOtp,
    }
  );

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateGetOtp({ phoneNumber });
      console.log(data);

      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp(""); //reset last otp
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message);
      setStep(2);
    }
  };

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
      // push -> /complete-profile
      // isActive -> / : /complete-profile
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  React.useEffect(() => {
    const timer =
      time > 0 && setInterval(() => setTime((time) => time - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);
  console.log("otpResponse", phoneNumber);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOtpHandler}
            isPending={isPending}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep((s) => s - 1)}
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOtpHandler}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
            isCechkingOtp={isCechkingOtp}
            phoneNumber={phoneNumber}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderSteps()}</div>
    </div>
  );
};

export default AuthPage;
//? TASK #1 : auth user using OTP :

//1. form -> getOTP -> input + button => phoneNumber => send OTP
// input => TextField
// 2. form -> checkOTP ->
// request => ?
//* 1. axios (useState + useEffect),
//* 2. useFetch (data, loading, error),
//* 3. react-query ->  redux alternative (state management) + fetch , mutate !
