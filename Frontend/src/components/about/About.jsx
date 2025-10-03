import React from "react";
import Footer from '../footer/Footer';

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black overflow-hidden hero-height">
        {/* Watermark background */}
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-[5rem] md:text-[6rem] lg:text-[8rem] font-black text-white opacity-5 whitespace-nowrap">
            GELEDEM GELEDEM GELEDEM GELEDEM
          </p>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 h-full px-6 md:px-12">
          {/* Left text */}
          <div className="col-span-full md:col-span-6 flex flex-col justify-center items-start h-full py-16">
            <h1 className="text-7xl md:text-8xl font-black text-beast-lime tracking-tighter uppercase mb-6">
              ABOUT US
            </h1>
            <p className="text-2xl md:text-3xl font-light text-white max-w-lg">
              Welcome to{" "}
              <span className="text-beast-lime">GELEDEM</span>, where the hustle
              never stops and the grind never ends!
            </p>
          </div>

          {/* Right athlete image */}
          <div className="col-span-full md:col-span-6 flex items-center justify-center relative">
            <img
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2670&auto=format&fit=crop"
              alt="Athlete Image"
              className="w-full h-[400px] md:h-[550px] object-cover rounded-lg shadow-xl border-4 border-white"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x500/0d111c/FFFFFF?text=ATHLETE+IMAGE";
              }}
            />
          </div>
        </div>
      </section>

      {/* Green Box */}
      <div className="flex justify-center relative z-20 -mt-16 px-6">
        <section className="bg-beast-lime py-10 px-6 md:py-14 md:px-20 shadow-xl border-4 border-black w-full max-w-6xl rounded-lg">
          <div className="text-black text-base md:text-lg font-medium leading-relaxed">
            <p className="mb-6">
              We're not just another fitness brand. We're hustlers, dreamers,
              and go-getters. We refuse to settle for anything less than
              greatness.
            </p>
            <p className="mb-6">
              We are a proud D2C brand driven by an{" "}
              <b>unbreakable will of steel</b>. We are inspired by a vision of
              relentless effort, passion, and authenticity in everything we do.
            </p>
            <p>
              Like our community, we live for the chase. We thrive on the rush
              of pushing our limits, the satisfaction of knocking down barriers,
              and the pure joy of achieving what once felt impossible.
            </p>
          </div>
        </section>
      </div>

      {/* Section with icon + heading */}
      <section className="bg-black py-20 md:py-28">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex justify-start w-full md:w-1/3 -ml-6">
            <img
              src="https://cdn.shopify.com/s/files/1/0690/7723/7977/files/beastlifeicon.svg?v=1715175835"
              alt="GELEDEM Icon"
              className="w-[400px] md:w-[400px] h-auto -ml-10 md:-ml-20"
            />
          </div>

          <div className="w-full md:w-2/3 pl-6">
            <h3 className="text-7xl md:text-8xl lg:text-7xl font-bold leading-tight text-white">
              We’re here to rewrite the meaning of being a <br />
              <span className="font-bold text-[#76FF03]">Geledem – break</span>
              <br />
              <span className="font-bold text-[#76FF03]">
                boundaries,
              </span>{" "}
              do the <br /> unexpected and <br />
              unleash our inner wild.
            </h3>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="geledem-final-bg py-10 md:py-20 relative overflow-hidden">
        <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-4">
          <div className="col-span-full md:col-span-6 flex flex-col justify-center text-left pt-7 md:pt-0">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
              At GELEDEM, we are on a simple mission -
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-200 leading-relaxed max-w-lg">
              to empower you to be the best version of yourself, inside out.
              Whether you are a dedicated athlete or just a beginner, we’ve got
              your back every step of the way with products built for the
              relentless.
            </p>
          </div>

          <div className="col-span-full md:col-start-7 md:col-span-6 flex justify-end mt-8 md:mt-0">
            <div className="w-full md:w-11/12 h-[350px] md:h-[500px] border-3 border-white rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://plus.unsplash.com/premium_photo-1664910157921-9afe48d38b8b?fm=jpg&q=60&w=3000"
                className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.1]"
                alt="Man lifting weights in a gym"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x500/0d111c/FFFFFF?text=MISSION+IMAGE";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ragged Section */}
      <section className="textured-section py-20 md:py-32 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-x-12 h-full z-10 px-4 md:px-8">
          <div className="col-span-full md:col-span-6 flex justify-start items-end h-full order-2 md:order-1">
            <div className="ragged-clip w-full md:w-auto h-[400px] md:h-[550px] overflow-hidden bg-black flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=2670&auto=format&fit=crop"
                alt="Intense Muscular Athlete"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    "<div class='w-full h-full flex items-center justify-center text-4xl text-white font-black'>LOAD FAILED</div>";
                }}
              />
            </div>
          </div>

          <div className="col-span-full md:col-span-6 flex flex-col text-left pt-8 md:pt-20 order-1 md:order-2">
            <p className="text-2xl md:text-3xl font-bold text-beast-lime mb-4 max-w-xl tracking-wide">
              So get ready to join the tribe, break some records
              <br /> and rewrite some rules.
            </p>
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Let's make an epic happen!
            </h2>
          </div>

          {/* Watermark text */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center py-4 opacity-5 pointer-events-none">
            <p className="text-5xl font-black text-white whitespace-nowrap">
              GELEDEM GELEDEM GELEDEM GELEDEM GELEDEM
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;