import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";

const StarCard = ({ title, subtitle, small = false, className = "" }) => {
  const pad = small ? "p-3" : "p-4";
  const titleCls = small ? "text-sm leading-tight mt-3" : "text-lg";
  const subtitleCls = small ? "text-[12px] mt-5" : "text-sm";
  const iconCls = small ? "text-lg mt-4" : "text-2xl";
  return (
    <div className={`border border-[#CCFF00] rounded-2xl ${pad} bg-black/40 ${className}`}>
      <div className={`${iconCls} mb-1`}>🌟</div>
      <div className={`text-white font-semibold ${titleCls} leading-snug`}>{title}</div>
      <div className={`text-gray-300 ${subtitleCls} mt-1 whitespace-pre-line`}>{subtitle}</div>
    </div>
  );
};

const LoginDialog = ({ open, onClose, brandName = "Gledam", tagLine = "Fuel Your Beast" }) => {
  const { loginAs } = useAuth();
  const [phone, setPhone] = useState("");
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Login dialog"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div
          className="relative bg-black text-white rounded-2xl shadow-2xl overflow-hidden flex"
          style={{}}
        >
          {/* Explicit size in cm + safety max bounds */}
          <div className="w-[24.5cm] h-[13.5cm] max-w-[92vw] max-h-[90vh] flex overflow-auto">
            {/* Left 65% */}
            <div className="basis-[65%] bg-black h-full flex flex-col p-8">
              {/* Brand centered with margin from top */}
              <div className="mt-10 text-center">
                <div className="text-[#CCFF00] font-extrabold tracking-wide leading-none text-[64px]">
                  {brandName}
                </div>
              </div>

              {/* Center headline */}
              <div className="mt-12 text-center text-white text-2xl font-bold">Fuel Your Beast</div>

              {/* Bottom row of cards */}
              <div className="mt-auto text-center grid grid-cols-3 gap-4 pt-10">
                <StarCard
                  small
                  title="Made for beast"
                  subtitle={"To kick in their\nInner Potential"}
                />
                <StarCard
                  small
                  title="Built by beast"
                  subtitle={"Because a decade of\nexperience would power you up"}
                />
                <StarCard
                  small
                  title="Loved by Beasts"
                  subtitle={"Because the rawness kicks in and the performance\nspeaks"}
                />
              </div>
            </div>

            {/* Right 35% */}
            <div className="basis-[35%] bg-black px-6 flex flex-col">
              {/* Leave top/bottom margin (black bg visible) */}
              <div className="my-[1cm] h-[12cm] bg-white text-black rounded-xl shadow-lg p-6 flex flex-col gap-4 items-stretch overflow-auto">
                <h8 className="text-center mt-15 text-2xl font-bold">Login / Signup</h8>

                {/* Phone field */}
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-1 py-2">
                  <span className="text-lg">🇮🇳</span>
                  <span className="text-gray-700 font-semibold select-none">+91</span>
                  <span className="h-5 w-px bg-gray-300 mx-1" />
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter Mobile Number"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    className="flex-1 outline-none border-none text-base bg-transparent placeholder:text-gray-400"
                  />
                </div>

                {/* Notify checkbox */}
                <label className="flex items-start gap-2 text-xs text-gray-600">
                  <input type="checkbox" defaultChecked className="mt-1" />
                  <span>Notify me for any updates & offers</span>
                </label>

                {/* Continue/Login button */}
                <button
                  className="mt-1 w-full bg-black text-white font-semibold py-2 rounded-lg border border-black hover:opacity-90"
                  onClick={() => { loginAs('user', { phone }); onClose?.(); }}
                >
                  Continue
                </button>

                {/* Disclaimer */}
                <div className="mt-27 text-[11px] text-gray-600 leading-relaxed">
                  <p>
                    I accept that I have read & understood Privacy Policy and T&Cs.
                  </p>
                  <p className=" mt-2 underline cursor-pointer">Trouble logging in?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
