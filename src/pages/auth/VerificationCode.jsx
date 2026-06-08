import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useVerifyEmailMutation,
  useForgotPasswordMutation,
} from "../../../Redux/features/auth/authApi";
import { message } from "antd";

function VerificationCode() {
  const [code, setCode] = useState(new Array(4).fill(""));
  const navigate = useNavigate();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [forgotPassword, { isLoading: isResending }] =
    useForgotPasswordMutation();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyCode = async () => {
    const otp = code.join("");
    const email = localStorage.getItem("resetEmail");

    if (otp.length < 4) {
      return message.error("Please enter the complete verification code.");
    }
    if (!email) {
      return message.error(
        "Email not found. Please go back and enter your email.",
      );
    }

    try {
      const res = await verifyEmail({ email, otp }).unwrap();
      if (res.success) {
        message.success(res.message || "OTP verified successfully");
        localStorage.setItem("resetOtp", otp);
        navigate(`/new-password`);
      }
    } catch (err) {
      message.error(
        err?.data?.message || "Failed to verify code. Please try again.",
      );
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      return message.error(
        "Email not found. Please go back and enter your email.",
      );
    }

    try {
      const res = await forgotPassword({ email }).unwrap();
      if (res.success) {
        message.success(res.message || "OTP resent successfully");
      }
    } catch (err) {
      message.error(err?.data?.message || "Failed to resend code.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="container mx-auto">
        <div className="flex  justify-center items-center">
          <div className="w-full lg:w-1/2 bg-white p-5 md:px-18 md:py-28 shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded-2xl">
            <div className="flex justify-center items-center mb-10">
              <img src="/logo.png" alt="" />
            </div>

            <form className="space-y-5">
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="shadow-xs w-12 h-12 text-2xl text-center border border-[#6A6D76] text-[#0d0d0d] rounded-lg focus:outline-none"
                  />
                ))}
              </div>
            </form>
            <div className="flex justify-center items-center my-5">
              <button
                onClick={handleVerifyCode}
                disabled={isLoading}
                type="button"
                className="w-1/3 bg-[#2D8C3C] hover:bg-[#1E6B2B] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>
            </div>
            <p className="text-[#6A6D76] text-center mb-10">
              You have not received the email?{" "}
              <span
                onClick={handleResend}
                className="text-[#2D8C3C] font-semibold cursor-pointer hover:text-[#1E6B2B] transition-colors"
                style={{
                  pointerEvents: isResending ? "none" : "auto",
                  opacity: isResending ? 0.5 : 1,
                }}
              >
                {isResending ? " Resending..." : " Resend"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
