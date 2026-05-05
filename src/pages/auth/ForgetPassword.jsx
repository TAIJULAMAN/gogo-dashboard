import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../../Redux/features/auth/authApi";
import { message } from "antd";

function ForgetPassword() {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    try {
      const res = await forgotPassword({ email }).unwrap();
      if (res.success) {
        message.success(res.message || "Password reset OTP sent to email");
        // Store email locally to use in the verification code step if needed
        localStorage.setItem("resetEmail", email);
        navigate("/verification-code");
      }
    } catch (err) {
      message.error(
        err?.data?.message || "Failed to send reset code. Please try again."
      );
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="container mx-auto">
        <div className="flex  justify-center items-center ">
          <div className="w-full md:w-1/2 lg:w-1/2 p-5 md:px-[100px] md:py-[200px] bg-white  shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded-2xl">
            <div className="flex justify-center items-center mb-10">
              <img src="/logo.png" alt="" />
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="nahidhossain@gmail.com"
                  className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                  required
                />
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-1/3 bg-[#2D8C3C] hover:bg-[#1E6B2B] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Code"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
