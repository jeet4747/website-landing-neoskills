import React from "react";

const VideoShowcase = () => {
  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold uppercase tracking-[0.2em] text-sm">
            Student Success Stories
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
            Real Results, Real Careers
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-4">
            Real stories from learners who upgraded their skills, gained confidence,
            and moved closer to better career opportunities with NeoSkills.
          </p>
        </div>

        <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-8 md:p-12 lg:p-14">
              <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-4 py-2 text-sm font-semibold mb-6">
                Learner Spotlight
              </span>

              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Practical learning that builds real confidence
              </h3>

              <p className="text-gray-600 text-base md:text-lg leading-8 mb-8">
                Our programs are designed to help learners gain hands-on knowledge,
                industry exposure, and the confidence to move forward in their
                professional journey. Watch a glimpse of how NeoSkills supports
                meaningful growth.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                  Hands-on Learning
                </span>
                <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                  Career Support
                </span>
                <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                  Industry Relevant Skills
                </span>
              </div>

              <button 
                onClick={() => {
                  const coursesSection = document.getElementById('courses');
                  if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
              >
                Explore Our Programs
              </button>
            </div>

            <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-blue-50 via-white to-gray-50">
              <div className="relative rounded-[24px] overflow-hidden shadow-[0_18px_40px_rgba(37,99,235,0.15)] border border-blue-100 bg-black aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/g0OyjNmA6qg?rel=0"
                  title="NeoSkills Showcase Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;