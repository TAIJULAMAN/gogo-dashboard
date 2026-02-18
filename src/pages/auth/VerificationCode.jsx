import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerificationCode() {
  const [code, setCode] = useState(new Array(5).fill(""));

  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    navigate(`/new-password`);
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
                    className="shadow-xs w-12 h-12 text-2xl text-center border border-[#6A6D76] text-[#0d0d0d] rounded-lg focus:outline-none"
                  />
                ))}
              </div>
            </form>
            <div className="flex justify-center items-center my-5">
              <button
                onClick={handleVerifyCode}
                type="button"
                className="w-1/3 bg-[#2D8C3C] hover:bg-[#1E6B2B] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5 transition-colors"
              >
                Verify Code
              </button>
            </div>
            <p className="text-[#6A6D76] text-center mb-10">
              You have not received the email?{" "}
              <span className="text-[#2D8C3C] font-semibold cursor-pointer hover:text-[#1E6B2B] transition-colors"> Resend</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
