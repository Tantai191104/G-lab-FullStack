export default function HoverBackground() {
  return (
    <div className="group relative w-full max-w-7xl mx-auto overflow-hidden h-[180px] flex flex-col justify-center">
      {/* Dark subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gray-900/80 blur-2xl" />

      {/* Line top - dark subtle line */}
      <div className="w-full h-0.5 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-0 bg-gray-700 transition-all duration-500 ease-in-out group-hover:w-full"></div>
      </div>

      {/* 2 dòng chữ */}
      <div className="my-6 relative h-[120px] overflow-hidden flex flex-col justify-start">
        <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
          <h1
            style={{
              fontFamily: "Amuro, sans-serif",
              fontWeight: 400,
              fontSize: "5rem",
              background: "linear-gradient(to right, red, white, blue)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 10px rgba(0,0,0,0.8)",
              transition: "text-shadow 0.3s",
            }}
            className="whitespace-nowrap text-center tracking-wider"
          >
            LAB FOR KEY
          </h1>
          <h1
            style={{
              fontFamily: "Amuro, sans-serif",
              fontWeight: 400,
              fontSize: "5rem",
              background: "linear-gradient(to right, red, white, blue)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 10px rgba(0,0,0,0.8)",
              transition: "text-shadow 0.3s",
            }}
            className="whitespace-nowrap text-center tracking-wider"
          >
            LAB FOR KEY
          </h1>
        </div>
      </div>

      {/* Line bottom */}
      <div className="w-full h-0.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-0 bg-gray-700 transition-all duration-500 ease-in-out group-hover:w-full"></div>
      </div>
    </div>
  );
}
