import Countdown from "@/components/Countdown";
import theaterBg from "@/assets/theater-background.jpg";

const Index = () => {
  // Countdown target: January 31st, 2026 at 5:00 PM Eastern Time
  const targetDate = new Date('2026-01-31T17:00:00-05:00');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${theaterBg})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-8 md:py-12 text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif tracking-wider"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary-foreground)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px hsl(var(--accent) / 0.3)',
            }}
          >
            The Show Begins
          </h1>
          <div
            className="mt-4 text-xl md:text-2xl font-serif tracking-widest"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            ✦ COMING SOON ✦
          </div>
        </header>

        {/* Countdown */}
        <main className="flex-1 flex items-center justify-center px-4 pb-16">
          <Countdown targetDate={targetDate} />
        </main>

        {/* Decorative Footer Element */}
        <footer className="py-6 text-center">
          <div
            className="text-sm tracking-[0.3em] uppercase font-serif"
            style={{ color: 'hsl(var(--muted-foreground) / 0.6)' }}
          >
            Curtain Call
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
