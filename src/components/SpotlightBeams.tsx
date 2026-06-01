const beamBase: React.CSSProperties = {
  position: "absolute",
  top: "-20%",
  width: "55vw",
  height: "140vh",
  pointerEvents: "none",
  background:
    "radial-gradient(ellipse at top, hsla(45, 95%, 75%, 0.35) 0%, hsla(40, 90%, 60%, 0.18) 25%, hsla(35, 80%, 50%, 0.06) 55%, transparent 75%)",
  filter: "blur(12px)",
  mixBlendMode: "screen",
  transformOrigin: "top center",
  WebkitMaskImage:
    "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
  maskImage:
    "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
};

const SpotlightBeams = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        style={{
          ...beamBase,
          left: "-15%",
          animation:
            "spotlight-sway-left 11s ease-in-out infinite, spotlight-flicker 5.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          ...beamBase,
          right: "-15%",
          animation:
            "spotlight-sway-right 13s ease-in-out infinite, spotlight-flicker 6.5s ease-in-out infinite 1s",
        }}
      />
    </div>
  );
};

export default SpotlightBeams;
