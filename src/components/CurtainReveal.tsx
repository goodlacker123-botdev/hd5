import { useEffect, useState } from "react";

interface CurtainRevealProps {
  onComplete: () => void;
}

const CurtainReveal = ({ onComplete }: CurtainRevealProps) => {
  const [phase, setPhase] = useState<"curtain" | "opening" | "text" | "fadeout">("curtain");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 800);
    const t2 = setTimeout(() => setPhase("text"), 2800);
    const t3 = setTimeout(() => setPhase("fadeout"), 5300);
    const t4 = setTimeout(() => onComplete(), 6300);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const isOpen = phase !== "curtain";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "hsl(0 5% 5%)",
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 1s ease-in-out",
      }}
    >
      {/* Stage floor glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40" style={{
        background: "radial-gradient(ellipse 80% 100% at 50% 100%, hsl(var(--theater-gold) / 0.15) 0%, transparent 70%)",
      }} />

      {/* Spotlight from above */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[900px] opacity-25" style={{
          background: "radial-gradient(ellipse 40% 60% at 50% 30%, hsl(45 100% 85% / 0.6) 0%, hsl(45 80% 60% / 0.1) 40%, transparent 70%)",
        }} />
      </div>

      {/* Top valance / pelmet */}
      <div className="absolute top-0 left-0 right-0 z-30" style={{ height: "80px" }}>
        {/* Main pelmet body */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(0 60% 18%) 0%, hsl(0 65% 28%) 60%, hsl(0 50% 20%) 100%)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
        }} />
        {/* Swag scallops */}
        <div className="absolute -bottom-6 left-0 right-0 h-12 flex justify-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="relative" style={{ width: "calc(100% / 7)", flexShrink: 0 }}>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M0,0 Q25,35 50,30 Q75,25 100,0"
                  fill="none"
                  stroke="hsl(0 60% 25%)"
                  strokeWidth="40"
                />
                <path
                  d="M0,0 Q25,35 50,30 Q75,25 100,0"
                  fill="none"
                  stroke="hsl(0 50% 18%)"
                  strokeWidth="35"
                />
              </svg>
            </div>
          ))}
        </div>
        {/* Gold fringe */}
        <div className="absolute -bottom-8 left-0 right-0 h-3 z-10" style={{
          backgroundImage: `repeating-linear-gradient(90deg, 
            hsl(var(--theater-gold)) 0px, hsl(var(--theater-gold)) 2px, 
            transparent 2px, transparent 5px)`,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
        }} />
        {/* Gold rope trim */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{
          background: "linear-gradient(90deg, hsl(var(--theater-gold) / 0.4), hsl(var(--theater-gold)), hsl(var(--theater-gold) / 0.4))",
        }} />
      </div>

      {/* Left Curtain */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{
          left: 0,
          width: isOpen ? "0%" : "52%",
          transition: "width 2.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
          perspective: "800px",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Base fabric */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, hsl(0 55% 22%) 0%, hsl(0 65% 30%) 20%, hsl(0 60% 28%) 80%, hsl(0 45% 18%) 100%)",
          }} />
          {/* Vertical drape folds */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${i * 13}%`,
                width: "13%",
                background: `linear-gradient(90deg, 
                  hsl(0 45% ${14 + (i % 2) * 6}% / 0.7) 0%, 
                  hsl(0 65% ${30 + (i % 3) * 4}% / 0.3) 30%, 
                  hsl(0 60% ${26 + (i % 2) * 5}% / 0.1) 50%, 
                  hsl(0 50% ${18 + (i % 3) * 3}% / 0.5) 70%, 
                  hsl(0 40% ${12 + (i % 2) * 4}% / 0.8) 100%)`,
              }}
            />
          ))}
          {/* Highlight sheen */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, hsl(0 60% 40% / 0.15) 0%, transparent 30%, hsl(0 50% 35% / 0.1) 50%, transparent 70%)",
          }} />
          {/* Velvet texture overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          }} />
          {/* Gold trim on edge */}
          <div className="absolute top-0 bottom-0 right-0 w-2" style={{
            background: "linear-gradient(180deg, hsl(var(--theater-gold)) 0%, hsl(var(--theater-gold) / 0.5) 50%, hsl(var(--theater-gold)) 100%)",
            boxShadow: "0 0 12px hsl(var(--theater-gold) / 0.4)",
          }} />
          {/* Gold tassel fringe at bottom edge */}
          <div className="absolute bottom-0 right-0 w-2 h-8" style={{
            backgroundImage: `repeating-linear-gradient(180deg, hsl(var(--theater-gold)) 0px, hsl(var(--theater-gold)) 4px, transparent 4px, transparent 6px)`,
          }} />
          {/* Inner shadow for depth */}
          <div className="absolute inset-0" style={{
            boxShadow: "inset -30px 0 50px -10px rgba(0,0,0,0.4), inset 0 20px 40px -10px rgba(0,0,0,0.3)",
          }} />
        </div>
      </div>

      {/* Right Curtain */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{
          right: 0,
          width: isOpen ? "0%" : "52%",
          transition: "width 2.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
          perspective: "800px",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Base fabric */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, hsl(0 55% 22%) 0%, hsl(0 65% 30%) 20%, hsl(0 60% 28%) 80%, hsl(0 45% 18%) 100%)",
          }} />
          {/* Vertical drape folds */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${i * 13}%`,
                width: "13%",
                background: `linear-gradient(90deg, 
                  hsl(0 40% ${12 + (i % 2) * 4}% / 0.8) 0%, 
                  hsl(0 50% ${18 + (i % 3) * 3}% / 0.5) 30%, 
                  hsl(0 60% ${26 + (i % 2) * 5}% / 0.1) 50%, 
                  hsl(0 65% ${30 + (i % 3) * 4}% / 0.3) 70%, 
                  hsl(0 45% ${14 + (i % 2) * 6}% / 0.7) 100%)`,
              }}
            />
          ))}
          {/* Highlight sheen */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(-135deg, hsl(0 60% 40% / 0.15) 0%, transparent 30%, hsl(0 50% 35% / 0.1) 50%, transparent 70%)",
          }} />
          {/* Velvet texture */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          }} />
          {/* Gold trim on edge */}
          <div className="absolute top-0 bottom-0 left-0 w-2" style={{
            background: "linear-gradient(180deg, hsl(var(--theater-gold)) 0%, hsl(var(--theater-gold) / 0.5) 50%, hsl(var(--theater-gold)) 100%)",
            boxShadow: "0 0 12px hsl(var(--theater-gold) / 0.4)",
          }} />
          {/* Inner shadow for depth */}
          <div className="absolute inset-0" style={{
            boxShadow: "inset 30px 0 50px -10px rgba(0,0,0,0.4), inset 0 20px 40px -10px rgba(0,0,0,0.3)",
          }} />
        </div>
      </div>

      {/* Revealed text */}
      <div
        className="relative z-5 text-center px-4"
        style={{
          opacity: phase === "text" || phase === "fadeout" ? 1 : 0,
          transform: phase === "text" || phase === "fadeout" ? "scale(1)" : "scale(0.8)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-wider"
          style={{
            background: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary-foreground)) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Let the show begin...
        </h2>
        <div className="mt-6 flex justify-center">
          <div
            className="h-0.5 rounded-full"
            style={{
              width: phase === "text" || phase === "fadeout" ? "200px" : "0px",
              background: "linear-gradient(90deg, transparent, hsl(var(--theater-gold)), transparent)",
              transition: "width 1.5s ease-out 0.5s",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CurtainReveal;
