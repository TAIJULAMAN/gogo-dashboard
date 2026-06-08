import { useRouteError, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  IoAlertCircleOutline,
  IoRefreshOutline,
  IoHomeOutline,
  IoBugOutline,
  IoCopyOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Extract error message
  const errorMessage =
    error?.statusText ||
    error?.message ||
    (typeof error === "string" ? error : "An unknown error occurred");

  const errorStack = error?.stack || "";

  const handleCopy = async () => {
    try {
      const textToCopy = `Error: ${errorMessage}\n\nStack Trace:\n${errorStack}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy error details", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4 py-12 font-sans selection:bg-primary/30">
      <div className="max-w-2xl w-full bg-white border border-primary-light/60 rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
        
        {/* Subtle background decorative shapes with animation */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-light/40 rounded-full blur-2xl animate-pulse" />

        {/* Header Icon / Branding */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 border border-rose-100 shadow-inner group">
            <IoAlertCircleOutline className="w-12 h-12 text-rose-500 transition-transform duration-300 group-hover:scale-110" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D0D0D] tracking-tight mb-3">
            Something went wrong
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-md mb-8">
            The application encountered an unexpected error. Don't worry, your data is safe. Let's get you back on track.
          </p>

          {/* Error Message Box */}
          <div className="w-full bg-rose-50/50 border border-rose-100 rounded-xl p-5 mb-8 text-left flex items-start gap-4">
            <div className="bg-rose-100 p-2 rounded-lg mt-0.5 shrink-0">
              <IoBugOutline className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Error Details</span>
              <p className="text-rose-950 font-medium text-sm md:text-base mt-1 break-words">
                {errorMessage}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary-darker text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-primary-dark/20 hover:shadow-xl hover:shadow-primary-dark/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <IoRefreshOutline className="w-5 h-5 animate-spin-slow" />
              Refresh Page
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold py-3 px-6 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <IoHomeOutline className="w-5 h-5" />
              Go to Dashboard
            </button>
          </div>

          {/* Technical Details Accordion */}
          {errorStack && (
            <div className="w-full text-left border-t border-gray-100 pt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full text-gray-500 hover:text-gray-800 transition-colors py-2 font-medium text-sm focus:outline-none cursor-pointer"
              >
                <span>{showDetails ? "Hide Technical Details" : "Show Technical Details"}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-semibold">
                  {showDetails ? "▲" : "▼"}
                </span>
              </button>

              {showDetails && (
                <div className="mt-4 relative transition-all duration-300">
                  <div className="absolute right-3 top-3 z-20">
                    <button
                      onClick={handleCopy}
                      title="Copy stack trace to clipboard"
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors border border-gray-700 cursor-pointer"
                    >
                      {copied ? (
                        <IoCheckmarkOutline className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <IoCopyOutline className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-950 text-gray-200 p-5 rounded-xl overflow-x-auto text-xs md:text-sm font-mono leading-relaxed max-h-60 border border-gray-850 shadow-inner">
                    <code>{errorStack}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
