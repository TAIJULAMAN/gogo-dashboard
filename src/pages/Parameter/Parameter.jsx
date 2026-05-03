import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, InputNumber, message } from "antd";

const Parameter = () => {
  const navigate = useNavigate();
  const [baseCharge, setBaseCharge] = useState(5.0);
  const [chargePerMile, setChargePerMile] = useState(1.5);
  const [minDistance, setMinDistance] = useState(2);

  const handleSave = () => {
    message.success("Parameters updated successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-[#2D8C3C] px-5 py-4 rounded-xl flex items-center gap-3 shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Parameter Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Delivery Charge Settings Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-[#2D8C3C] rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800">
              Delivery Charge Settings
            </h2>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Base Delivery Charge
              </label>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#2D8C3C",
                    borderRadius: 12,
                    controlHeight: 52,
                  },
                }}
              >
                <InputNumber
                  min={0}
                  value={baseCharge}
                  onChange={setBaseCharge}
                  className="w-full font-semibold text-lg"
                  prefix={<span className="text-gray-400 mr-1">$</span>}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </ConfigProvider>
              <p className="text-xs text-gray-400 italic">
                The minimum fee charged for any delivery.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Charge Per Mile
              </label>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#2D8C3C",
                    borderRadius: 12,
                    controlHeight: 52,
                  },
                }}
              >
                <InputNumber
                  min={0}
                  value={chargePerMile}
                  onChange={setChargePerMile}
                  className="w-full font-semibold text-lg"
                  prefix={<span className="text-gray-400 mr-1">$</span>}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </ConfigProvider>
              <p className="text-xs text-gray-400 italic">
                Additional fee applied for every mile beyond the minimum
                distance.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Minimum Distance (Miles)
              </label>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#2D8C3C",
                    borderRadius: 12,
                    controlHeight: 52,
                  },
                }}
              >
                <InputNumber
                  min={0}
                  value={minDistance}
                  onChange={setMinDistance}
                  className="w-full font-semibold text-lg"
                  suffix={<span className="text-gray-400 ml-1">mi</span>}
                />
              </ConfigProvider>
              <p className="text-xs text-gray-400 italic">
                The base charge covers up to this distance.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-[#2D8C3C] text-white font-bold py-4 rounded-xl hover:bg-[#256a2f] shadow-lg shadow-green-200 transition-all active:scale-[0.98] mt-4"
            >
              Update Parameters
            </button>
          </div>
        </div>

        {/* Info Card / Preview */}
        <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#2D8C3C] mb-4">
              Pricing Logic Preview
            </h3>
            <div className="bg-white p-6 rounded-xl border border-green-100 space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Price (up to {minDistance} mi)</span>
                <span className="font-bold text-gray-800">
                  ${baseCharge.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600">Price per extra mile</span>
                <span className="font-bold text-gray-800">
                  ${chargePerMile.toFixed(2)}
                </span>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-500 mb-3">Example calculation for 5 miles:</p>
                <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                  <span className="font-semibold text-green-800">Total Delivery Fee</span>
                  <span className="text-xl font-black text-[#2D8C3C]">
                    ${(baseCharge + (5 - minDistance) * chargePerMile).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-white/60 rounded-xl border border-white">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-[#2D8C3C]">Note:</span> These parameters directly affect the checkout price for all customers. Changes are applied in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parameter;
