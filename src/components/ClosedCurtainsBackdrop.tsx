/**
 * Static closed-theater-curtain backdrop. Non-animated visual layer that mirrors
 * the closed-state of CurtainIntro: velvet panels, valance, gold trim, warm spotlight.
 */
const PANELS = 14;

const renderPanels = () =>
  Array.from({ length: PANELS }).map((_, i) => {
    const isDeep = i % 2 === 0;
    return (
      <div
        key={i}
        className="absolute top-0 bottom-0"
        style={{
          left: `${(i / PANELS) * 100}%`,
          width: `${100 / PANELS}%`,
          background: `linear-gradient(90deg,
            hsl(0 35% ${isDeep ? 8 : 12}%) 0%,
            hsl(0 55% ${isDeep ? 18 : 24}%) 25%,
            hsl(0 65% ${isDeep ? 32 : 38}%) 50%,
            hsl(0 55% ${isDeep ? 18 : 24}%) 75%,
            hsl(0 35% ${isDeep ? 8 : 12}%) 100%)`,
          boxShadow: isDeep
            ? "inset 0 0 8px rgba(0,0,0,0.35)"
            : "inset 0 0 6px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "1.5px",
            background:
              "linear-gradient(180deg, transparent 0%, hsl(0 70% 55% / 0.25) 30%, hsl(0 70% 55% / 0.25) 70%, transparent 100%)",
            opacity: isDeep ? 0 : 0.7,
          }}
        />
      </div>
    );
  });

const renderCurtain = (side: "left" | "right") => (
  <div
    className="absolute top-0 bottom-0"
    style={{
      [side]: 0,
      width: "50%",
      filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.6))",
    }}
  >
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 50% 20%) 0%, hsl(0 60% 28%) 25%, hsl(0 55% 24%) 75%, hsl(0 40% 16%) 100%)",
        }}
      />
      {renderPanels()}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Cpath d='M0 0h1v1H0zm3 3h1v1H3zM2 5h1v1H2zM5 1h1v1H5z' fill='%23000' fill-opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            side === "left"
              ? "radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)"
              : "radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-0 bottom-0"
        style={{
          [side === "left" ? "right" : "left"]: 0,
          width: "3px",
          background:
            "linear-gradient(180deg, hsl(var(--theater-gold)) 0%, hsl(var(--theater-gold) / 0.6) 50%, hsl(var(--theater-gold)) 100%)",
          boxShadow: "0 0 14px hsl(var(--theater-gold) / 0.5)",
        }}
      />
    </div>
  </div>
);

const ClosedCurtainsBackdrop = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Stage backdrop */}
    <div className="absolute inset-0" style={{ background: "hsl(0 8% 4%)" }} />

    {/* Warm spotlight bleed at center seam */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-[700px] h-full"
        style={{
          background:
            "radial-gradient(ellipse 30% 70% at 50% 40%, hsl(45 90% 70% / 0.18) 0%, transparent 70%)",
        }}
      />
    </div>

    {/* Top valance / pelmet */}
    <div className="absolute top-0 left-0 right-0 z-30" style={{ height: "90px" }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 55% 16%) 0%, hsl(0 65% 26%) 50%, hsl(0 50% 18%) 100%)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
        }}
      />
      <svg
        className="absolute -bottom-5 left-0 right-0 w-full"
        height="40"
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 10 }).map((_, i) => {
          const x = i * 100;
          return (
            <path
              key={i}
              d={`M${x},0 Q${x + 50},38 ${x + 100},0 L${x + 100},0 L${x},0 Z`}
              fill="hsl(0 55% 20%)"
              stroke="hsl(0 40% 12%)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div
        className="absolute -bottom-1 left-0 right-0 h-1.5 z-10"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--theater-gold) / 0.5), hsl(var(--theater-gold)), hsl(var(--theater-gold) / 0.5))",
          boxShadow: "0 0 8px hsl(var(--theater-gold) / 0.6)",
        }}
      />
    </div>

    {renderCurtain("left")}
    {renderCurtain("right")}
  </div>
);

export default ClosedCurtainsBackdrop;
