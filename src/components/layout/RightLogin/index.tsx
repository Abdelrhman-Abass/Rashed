import React from "react";

const AstronautSpaceLanding: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Nebulas */}
      <div
        className="absolute top-3/4 right-2/4 w-40 h-40 rounded-full opacity-30 animate-nebula-float"
        style={{
          background:
            "radial-gradient(circle, rgba(138, 43, 226, 0.6) 0%, rgba(75, 0, 130, 0.4) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute  top-1/5   right-1/10 w-40 h-40 rounded-full opacity-30 animate-nebula-float"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 20, 147, 0.6) 0%, rgba(199, 21, 133, 0.4) 50%, transparent 70%)",
          animationDelay: "-10s",
        }}
      />
      <div className="relative z-10 flex flex-col pt-12 items-center justify-center text-center px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight animate-slideUp">
          Welcome to the Future
        </h1>

        <p className="text-sm md:text-base text-white/80 mb-4 max-w-xs leading-relaxed animate-slideUp-delay">
          Experience the next generation of AI-powered conversations and unlock
          endless possibilities.
        </p>

        <div className="flex space-x-3">
          {["🚀", "💡", "🎯", "⚡"].map((emoji, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer animate-bounce-gentle"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-lg">{emoji}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Earth */}
      <div
        className="absolute left-1/4 bottom-1/5 w-24 h-24 rounded-full animate-earth-rotate"
        style={{
          background:
            "linear-gradient(45deg, #4a90e2 0%, #357abd 50%, #1e3a8a 100%)",
          boxShadow:
            "inset -8px -8px 15px rgba(0,0,0,0.5), 0 0 15px rgba(74, 144, 226, 0.3)",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(34, 139, 34, 0.8) 0%, transparent 30%),
              radial-gradient(circle at 70% 60%, rgba(34, 139, 34, 0.6) 0%, transparent 25%),
              radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.4) 0%, transparent 20%)
            `,
          }}
        />
      </div>

      {/* Astronaut */}
      <div className="absolute right-4 bottom-10  animate-astronaut-float">
        <div
          className="relative w-20 h-28 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 rounded-3xl"
          style={{
            boxShadow:
              "inset 3px 3px 8px rgba(255,255,255,0.3), inset -3px -3px 8px rgba(0,0,0,0.2), 0 0 15px rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="absolute -top-4 left-1.5 w-16 h-16 rounded-full border-2 border-gray-400"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(200,200,255,0.8) 100%)",
              boxShadow:
                "inset 0 0 8px rgba(135, 206, 250, 0.3), 0 0 15px rgba(255,255,255,0.2)",
            }}
          >
            <div className="absolute top-2.5 left-3 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300" />
            <div
              className="absolute top-1.5 left-1.5 w-13 h-10 rounded-t-3xl animate-pulse"
              style={{
                background:
                  "linear-gradient(145deg, rgba(0,100,200,0.5) 0%, rgba(0,50,150,0.3) 100%)",
              }}
            />
          </div>

          <div className="absolute top-14 left-5 w-8 h-5 bg-gradient-to-br from-gray-700 to-gray-900 rounded-md">
            <div className="flex justify-around items-center h-full px-1">
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
              <div
                className="w-1 h-1 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          <div className="absolute -left-5 top-5 w-6 h-12 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 rounded-full transform -rotate-12" />
          <div className="absolute -right-5 top-5 w-6 h-12 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 rounded-full transform rotate-12" />
          <div className="absolute -bottom-7 left-3 w-4 h-7 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 rounded-b-full" />
          <div className="absolute -bottom-7 right-3 w-4 h-7 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 rounded-b-full" />
        </div>
      </div>

      {/* Main Content */}
    </div>
  );
};

export default AstronautSpaceLanding;
