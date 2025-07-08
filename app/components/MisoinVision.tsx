import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-gradient-to-br from-lime-50 via-white to-lime-100 py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-lime-800 mb-4 bg-clip-text bg-gradient-to-r from-lime-700 to-lime-600 text-transparent">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Dedicated to raising awareness and advancing kidney and blood
            pressure care across Ethiopia.
          </p>
        </div>

        {/* English Version */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-lime-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-lime-100 opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-lime-100 text-lime-700 mr-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Prevent kidney disease and hypertension in Ethiopia by creating
                public awareness through educational seminars.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-lime-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-lime-100 opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-lime-100 text-lime-700 mr-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Promote kidney and high blood pressure care in Ethiopia in
                collaboration with concerned institutions.
              </p>
            </div>
          </div>
        </div>

        {/* Amharic Version */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-lime-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-lime-100 opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-lime-100 text-lime-700 mr-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">ተልዕኮ</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                በትምህርታዊ ሴሚናሮች የህብረተሰቡን ግንዛቤ በመፍጠር በኢትዮጵያ የኩላሊት ህመም ና የደም ግፊትን
                መከላከል።
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-lime-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-lime-100 opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-lime-100 text-lime-700 mr-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">ራዕይ</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                ከሚመለከታቸው ተቋማት ጋር በመተባበር በሀገሪቱ የኩላሊት ወይም ከፍተኛ የደም ግፊት ህክምናን ማሳደግ።
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
