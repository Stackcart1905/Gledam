import React from "react";
import Footer from "@/components/footer/Footer";

const neon = "#CCFF00";

// Finalized Contact Details
const YOUR_EMAIL = "care@gledemlife.in";
const YOUR_CALL_NUMBER = "+919999999999";

const TrackOrder = () => {
  return (
    <main className="w-full bg-black text-white">
      {/* Custom Beast Header */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <h1
          className="text-[56px] leading-[1.05] font-extrabold tracking-tight mb-4 text-center"
          style={{ color: neon }}
        >
          Track Your Shipment
        </h1>
        {/* Updated Logo/Text to "Beast" */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold uppercase tracking-wider">
           <span style={{ color: "red" }}>G</span>

            <span>LEDEM</span>
            <span className="h-3 w-3 bg-red-500 rounded-full inline-block ml-2 align-top" />
          </h2>
        </div>

        {/* ================================================================= */}
        {/* REPLACED IFRAME WITH STATIC CONTENT MIMICKING SHIPROCKET TRACKER */}
        {/* ================================================================= */}
        <div className="w-full max-w-5xl rounded-2xl shadow-lg overflow-hidden border border-gray-200 bg-white">
          <div className="p-10 text-black">
            
            {/* Tracking Status Box */}
            <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg">
              <div className="flex items-center space-x-3 mb-8">
                {/* Truck/Box Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-gray-700"
                >
                  <path d="M12 22h-4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4v4z" />
                  <path d="M16 16v4" />
                  <path d="M22 16v-4" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">Track status of your shipment</h3>
              </div>

              <p className="text-sm font-medium text-gray-600 mb-4">Search By:</p>

              {/* Radio Buttons */}
              <div className="flex space-x-8 mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="track_by" value="order_id" defaultChecked className="form-radio text-blue-600" />
                  <span className="text-gray-700 font-medium">Order ID</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="track_by" value="awb" className="form-radio text-blue-600" />
                  <span className="text-gray-700 font-medium">AWB</span>
                </label>
              </div>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter Order ID to search"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 text-gray-900"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </div>
            
            {/* Custom Footer with YOUR details */}
            <div className="mt-8 pt-4 text-xs text-gray-500 flex flex-wrap justify-center items-center space-x-2 md:space-x-4">
              <p className="whitespace-nowrap">
                Email us at:{" "}
                <a 
                  href={`mailto:${YOUR_EMAIL}`} 
                  className="text-gray-700 hover:underline"
                >
                  {YOUR_EMAIL}
                </a>
              </p>
              <span className="text-gray-400">|</span>
              <p className="whitespace-nowrap">
                Call us at:{" "}
                <a 
                  href={`tel:${YOUR_CALL_NUMBER.replace(/\s/g, '')}`} 
                  className="text-gray-700 hover:underline"
                >
                  {YOUR_CALL_NUMBER}
                </a>
              </p>
              <span className="text-gray-400">|</span>
              <p className="whitespace-nowrap">
                <a href="#" className="text-gray-700 hover:underline">Privacy Policy</a>
              </p>
              <span className="text-gray-400">|</span>
              <p className="whitespace-nowrap">
                Powered by **Shiprocket**
              </p>
            </div>
          </div>
        </div>
        {/* ================================================================= */}
        {/* END OF STATIC CONTENT */}
        {/* ================================================================= */}
      </div>

      <section className="w-full bg-white mt-12 text-black">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <hr className="mt-8 border-t border-black w-full" />
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 font-semibold text-black hover:underline"
              aria-label="Back to top"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19V5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 11l6-6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Top
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TrackOrder;