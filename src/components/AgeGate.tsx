import React from "react";

interface AgeGateProps {
  onConfirm: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred + darkened background */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/40"></div>

      {/* Popup card */}
      <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Age Verification
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You must be 21 or older to enter this site.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => alert("You must be 21+ to continue.")}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition font-semibold shadow"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
