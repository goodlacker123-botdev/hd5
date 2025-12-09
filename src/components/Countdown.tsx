import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
  redirectUrl?: string;
}

const Countdown = ({ targetDate, redirectUrl }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, redirectUrl]);

  return (
    <div className="relative">
      {/* Spotlight effect */}
      <div className="absolute inset-0 -top-32 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full opacity-40"
             style={{ background: 'var(--gradient-spotlight)' }} />
      </div>
      
      <div className="relative grid grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="flex flex-col items-center justify-center p-6 md:p-8 rounded-lg border-2 backdrop-blur-sm"
            style={{
              background: 'hsl(var(--card) / 0.6)',
              borderColor: 'hsl(var(--accent))',
              boxShadow: 'var(--shadow-gold-glow)',
            }}
          >
            <div
              className="text-5xl md:text-7xl font-bold font-serif tabular-nums"
              style={{ color: 'hsl(var(--accent))' }}
            >
              {String(value).padStart(2, "0")}
            </div>
            <div
              className="text-sm md:text-lg uppercase tracking-widest mt-2 font-serif"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
