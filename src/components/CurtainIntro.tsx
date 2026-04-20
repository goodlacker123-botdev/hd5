import { useEffect, useState } from "react";

interface CurtainIntroProps {
  onComplete: () => void;
}

/**
 * Realistic theatre curtain intro.
 *
 * Each curtain is a stack of vertical "panels" (drape folds). As the curtain
 * opens, each panel scales horizontally toward the wing (left curtain to the
 * left, right curtain to the right) with a slight stagger, so the fabric
 * appears to gather and bunch up against the proscenium instead of just
 * shrinking. A subtle skew + per-panel shadow gradient mimics fabric depth.
 */
const CurtainIntro = ({ onComplete }: CurtainIntroProps) => {
  const [phase, setPhase] = useState<"closed" | "opening" | "fadeout" | "done">("closed");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 700);
    const t2 = setTimeout(() => setPhase("fadeout"), 4200);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isOpen = phase === "opening" || phase === "fadeout";
  const PANELS = 14;

  const renderPanels = (side: "left" | "right") =>
    Array.from({ length: PANELS }).map((_, i) => {
      // Stagger so panels closer to the wing move first (most realistic gather)
      const fromWing = side === "left" ? PANELS - 1 - i : i;
      const delay = fromWing * 0.04;
      // Each panel is a tall vertical strip with its own shading
      const isDeep = i % 2 === 0;
      return (
        <div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${(i / PANELS) * 100}%`,
            width: `${100 / PANELS}%`,
            transformOrigin: side === "left" ? "left center" : "right center",
            transform: isOpen ? "scaleX(0.05)" : "scaleX(1)",
            transition: `transform 3.2s cubic-bezier(0.65, 0.02, 0.35, 1) ${delay}s`,
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
          {/* Subtle vertical highlight stripe to fake light catching the fold */}
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
      className="absolute top-0 bottom-0 z-20"
      style={{
        [side]: 0,
        // Curtain panel container stays full width — the inner panels handle the open animation
        width: "55%",
        // Slight bulge using a clip-path so the bottom hem looks weighted/draped
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.6))",
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          // Soft scalloped bottom hem
          clipPath:
            "path('M0,0 L100%,0 L100%,calc(100% - 24px) Q75%,100% 50%,calc(100% - 16px) Q25%,calc(100% - 32px) 0,calc(100% - 24px) Z')",
        }}
      >
        {/* Base velvet color */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(0 50% 20%) 0%, hsl(0 60% 28%) 25%, hsl(0 55% 24%) 75%, hsl(0 40% 16%) 100%)",
          }}
        />

        {/* Vertical drape panels (the realistic folds) */}
        {renderPanels(side)}

        {/* Velvet micro-texture */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Cpath d='M0 0h1v1H0zm3 3h1v1H3zM2 5h1v1H2zM5 1h1v1H5z' fill='%23000' fill-opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gentle vignette to give the fabric volume */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              side === "left"
                ? "radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)"
                : "radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Top-of-rod shadow */}
        <div
          className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
          }}
        />

        {/* Gold trim along the inner (stage-facing) edge */}
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

        {/* Hanging tassel fringe along the bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg,
              hsl(var(--theater-gold)) 0px,
              hsl(var(--theater-gold)) 2px,
              transparent 2px,
              transparent 6px)`,
            filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.5))",
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
      style={{
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 1s ease-in-out",
      }}
    >
      {/* Stage backdrop while curtains are closed */}
      <div className="absolute inset-0" style={{ background: "hsl(0 8% 4%)" }} />

      {/* Soft warm spotlight bleed through the seam */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
        {/* Scalloped swag */}
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
        {/* Gold rope */}
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
};

export default CurtainIntro;
