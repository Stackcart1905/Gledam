import React, { useState } from "react";
import Footer from "@/components/footer/Footer";

const allBlogs = [
  // --- Page 1 Blogs --- (Unchanged)
  [
    {
      title: "Magnesium Supplements: Boost Your Performance",
      description:
        "Magnesium plays a vital role in muscle performance, energy production, and recovery. Discover the benefits and the best supplements for athletes.",
    },
    {
      title: "Zinc Magnesium Tablets: The Ultimate Supplement Combo",
      description:
        "Zinc and magnesium together support better sleep, muscle growth, and testosterone regulation. Learn why this combo is a gym essential.",
    },
    {
      title: "What Food Is Highest in Magnesium? Top Magnesium-Rich Foods",
      description:
        "Here's a list of magnesium-rich foods that naturally boost your body's strength and vitality without needing supplements.",
    },
    {
      title: "Best Magnesium Supplements: How to Choose the Right One",
      description:
        "Find out which magnesium supplement form suits your needs — citrate, glycinate, or oxide — and how to use them effectively.",
    },
  ],
  // --- Page 2 Blogs --- (Unchanged)
  [
    {
      title: "Top 5 Natural Testosterone Boosters for Men",
      description:
        "Learn about science-backed ingredients that support hormonal balance and natural muscle growth without synthetic supplements.",
    },
    {
      title: "The Power of Recovery: Post-Workout Nutrition Essentials",
      description:
        "Your body builds strength after you leave the gym. Discover how to optimize recovery with proper nutrition and rest.",
    },
    {
      title: "Why Hydration Is Key to Peak Performance",
      description:
        "Dehydration can drastically affect strength and focus. Here’s how to keep hydration levels balanced for maximum output.",
    },
    {
      title: "Best Supplements for Energy and Focus",
      description:
        "Explore top supplements that enhance focus, alertness, and stamina — ideal for athletes and professionals alike.",
    },
  ],
  // --- Page 3 Blogs --- (NEWLY ADDED from the image)
  [
    {
      title: "10 Powerful Multivitamin Tablet Benefits for En...",
      description:
        "Multivitamins are the foundation of good health. Discover the ten essential benefits of incorporating them into your daily routine for enhanced immunity and vitality.",
    },
    {
      title: "When to Take Multivitamin Tablet for Maximum Be...",
      description:
        "Timing is everything. Learn the best time of day to take your multivitamin tablet to maximize absorption and ensure your body utilizes all the nutrients effectively.",
    },
    {
      title: "Fat Loss Diet Plan for Male: Your Complete Gym ...",
      description:
        "A comprehensive guide for men seeking effective fat loss. This plan includes macro breakdowns, meal timing, and supplement advice tailored for gym performance.",
    },
    {
      title: "10 Kg Weight Gain Diet Chart: The Ultimate Guid...",
      description:
        "Gain mass the right way with this detailed 10 kg weight gain diet chart. Focus on calorie-dense, nutrient-rich foods for sustainable muscle and weight gain.",
    },
    {
      title: "Diet for Gym Beginners: The Beastlife Guide to ...",
      description:
        "Starting your fitness journey? This guide simplifies nutrition for gym beginners, focusing on essential proteins, carbs, and fats to fuel your workouts.",
    },
    {
      title: "The Ultimate Gym Diet Plan for Maximum Gains",
      description:
        "A detailed meal-by-meal plan designed for serious athletes. Optimize your nutrient intake to achieve peak muscle growth, strength, and recovery.",
    },
  ],
];

const latestBlogs = [
  {
    id: 1,
    title: "How to Pick the Right Pre-Workout",
    desc: "Choosing the correct pre-workout formula boosts focus, energy, and endurance without crash effects.",
  },
  {
    id: 2,
    title: "Supplements You Should Avoid Mixing",
    desc: "Not all supplements pair well together — avoid these combinations to prevent side effects.",
  },
  {
    id: 3,
    title: "Why Protein Timing Matters",
    desc: "Protein consumption right after workouts enhances muscle recovery and growth significantly.",
  },
];

const TOTAL_PAGES = allBlogs.length;

const Blogs = () => {
  const [page, setPage] = useState(1);
  const [activeBlog, setActiveBlog] = useState(null);

  const handlePageChange = (newPage) => {
    // Ensure the new page number is within valid bounds
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="w-full bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Latest Blogs</h1>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: Main blog cards */}
          <div className="lg:w-2/3">
            {/* The blog list now correctly renders the current page's blogs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {allBlogs[page - 1].map((blog, index) => (
                <div
                  key={index}
                  className="bg-black text-white p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <h2 className="text-lg font-bold mb-3 underline hover:text-gray-300 transition">
                    {blog.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 space-x-3">
              {/* Previous */}
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className={`px-4 py-2 border border-black rounded-md text-sm font-medium transition ${
                  page === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                Previous
              </button>

              {/* Page Numbers: Dynamically renders buttons for all available pages */}
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`px-4 py-2 border border-black rounded-md text-sm font-medium transition ${
                    page === num
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {num}
                </button>
              ))}

              {/* Next */}
              <button
                disabled={page === TOTAL_PAGES}
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 border border-black rounded-md text-sm font-medium transition ${
                  page === TOTAL_PAGES
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>

          {/* RIGHT: Latest Blog sidebar */}
          <aside
            className="lg:w-1/3 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-24 h-fit"
          >
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              Latest Blog
            </h2>
            {latestBlogs.map((item) => (
              <div key={item.id} className="border-b last:border-0 py-3">
                <button
                  onClick={() =>
                    setActiveBlog((prev) => (prev === item.id ? null : item.id))
                  }
                  className="w-full text-left font-medium text-gray-800 hover:text-black transition-all"
                >
                  {item.title}
                </button>

                {activeBlog === item.id && (
                  <p className="text-gray-600 text-sm mt-2 transition-all duration-300 ease-in-out">
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
          </aside>
        </div>
      </div>

      {/* Divider + Back to Top + Footer */}
      <section className="w-full bg-white mt-12">
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

export default Blogs;