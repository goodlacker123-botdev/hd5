import { useEffect, useState } from "react";

interface CurtainRevealProps {
  onComplete: () => void;
}

const CurtainReveal = ({ onComplete }: CurtainRevealProps) => {
  const [phase, setPhase] = useState<"curtain" | "opening" | "text" | "fadeout">("curtain");

  useEffect(() => {
    // Show curtain briefly, then open
    const t1 = setTimeout(() => setPhase("opening"), 800);
    // Show text after curtains open
    const t2 = setTimeout(() => setPhase("text"), 2800);
    // Fade out and redirect
    const t3 = setTimeout(() => setPhase("fadeout"), 5300);
    const t4 = setTimeout(() => onComplete(), 6300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "hsl(var(--background))",
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 1s ease-in-out",
      }}
    >
      {/* Stage background with spotlight */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[800px] h-[800px] rounded-full opacity-30"
          style={{ background: "var(--gradient-spotlight)" }}
        />
      </div>

      {/* Left Curtain */}
      <div
        className="absolute top-0 bottom-0 left-0 z-10"
        style={{
          width: phase === "curtain" ? "50%" : "0%",
          background: "var(--gradient-curtain)",
          transition: "width 2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "inset -20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Curtain folds */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.3) 30px, rgba(0,0,0,0.3) 32px, transparent 32px, transparent 60px)`,
        }} />
        {/* Gold trim */}
        <div
          className="absolute top-0 bottom-0 right-0 w-3"
          style={{
            background: "linear-gradient(180deg, hsl(var(--theater-gold)) 0%, hsl(var(--theater-gold) / 0.6) 50%, hsl(var(--theater-gold)) 100%)",
          }}
        />
      </div>

      {/* Right Curtain */}
      <div
        className="absolute top-0 bottom-0 right-0 z-10"
        style={{
          width: phase === "curtain" ? "50%" : "0%",
          background: "var(--gradient-curtain)",
          transition: "width 2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "inset 20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Curtain folds */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.3) 30px, rgba(0,0,0,0.3) 32px, transparent 32px, transparent 60px)`,
        }} />
        {/* Gold trim */}
        <div
          className="absolute top-0 bottom-0 left-0 w-3"
          style={{
            background: "linear-gradient(180deg, hsl(var(--theater-gold)) 0%, hsl(var(--theater-gold) / 0.6) 50%, hsl(var(--theater-gold)) 100%)",
          }}
        />
      </div>

      {/* Top valance */}
      <div
        className="absolute top-0 left-0 right-0 h-16 z-20"
        style={{
          background: "var(--gradient-curtain)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
          borderBottom: "3px solid hsl(var(--theater-gold) / 0.6)",
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-4" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, hsl(var(--theater-gold) / 0.3) 40px, hsl(var(--theater-gold) / 0.3) 42px)`,
        }} />
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
            textShadow: "0 0 60px hsl(var(--accent) / 0.5)",
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
