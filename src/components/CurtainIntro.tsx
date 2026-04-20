import { useEffect, useState } from "react";

interface CurtainIntroProps {
  onComplete: () => void;
}

const CurtainIntro = ({ onComplete }: CurtainIntroProps) => {
  const [phase, setPhase] = useState<"closed" | "opening" | "fadeout" | "done">("closed");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 600);
    const t2 = setTimeout(() => setPhase("fadeout"), 3000);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isOpen = phase === "opening" || phase === "fadeout";

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
      style={{
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 0.8s ease-in-out",
      }}
    >
      {/* Backdrop behind curtains while closed */}
      <div
        className="absolute inset-0"
        style={{
          background: "hsl(0 5% 5%)",
          opacity: phase === "fadeout" ? 0 : 1,
          transition: "opacity 0.8s ease-in-out",
        }}
      />

      {/* Top valance / pelmet */}
      <div className="absolute top-0 left-0 right-0 z-30" style={{ height: "80px" }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(0 60% 18%) 0%, hsl(0 65% 28%) 60%, hsl(0 50% 20%) 100%)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
          }}
        />
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
        <div
          className="absolute -bottom-8 left-0 right-0 h-3 z-10"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, 
              hsl(var(--theater-gold)) 0px, hsl(var(--theater-gold)) 2px, 
              transparent 2px, transparent 5px)`,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--theater-gold) / 0.4), hsl(var(--theater-gold)), hsl(var(--theater-gold) / 0.4))",
          }}
        />
      </div>

      {/* Left Curtain */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{
          left: 0,
          width: isOpen ? "0%" : "52%",
          transition: "width 2.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
          perspective: "800px",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(0 55% 22%) 0%, hsl(0 65% 30%) 20%, hsl(0 60% 28%) 80%, hsl(0 45% 18%) 100%)",
            }}
          />
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsl(0 60% 40% / 0.15) 0%, transparent 30%, hsl(0 50% 35% / 0.1) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-2"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--theater-gold)) 0%, hsl(var(--theater-gold) / 0.5) 50%, hsl(var(--theater-gold)) 100%)",
              boxShadow: "0 0 12px hsl(var(--theater-gold) / 0.4)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-8"
            style={{
              backgroundImage: `repeating-linear-gradient(180deg, hsl(var(--theater-gold)) 0px, hsl(var(--theater-gold)) 4px, transparent 4px, transparent 6px)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                "inset -30px 0 50px -10px rgba(0,0,0,0.4), inset 0 20px 40px -10px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>

      {/* Right Curtain */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{
          right: 0,
          width: isOpen ? "0%" : "52%",
          transition: "width 2.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
          perspective: "800px",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(0 55% 22%) 0%, hsl(0 65% 30%) 20%, hsl(0 60% 28%) 80%, hsl(0 45% 18%) 100%)",
            }}
          />
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(-135deg, hsl(0 60% 40% / 0.15) 0%, transparent 30%, hsl(0 50% 35% / 0.1) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="absolute top-0 bottom-0 left-0 w-2"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--theater-gold)) 0%, hsl(var(--theater-gold) / 0.5) 50%, hsl(var(--theater-gold)) 100%)",
              boxShadow: "0 0 12px hsl(var(--theater-gold) / 0.4)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                "inset 30px 0 50px -10px rgba(0,0,0,0.4), inset 0 20px 40px -10px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CurtainIntro;
