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
            Please Stand By...
          </h1>
          <div
            className="mt-4 text-lg md:text-2xl font-serif tracking-widest"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            ✦ THE SHOW WILL BEGIN SOON. ✦
          </div>
        </header>

        {/* Countdown */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16 gap-8">
          <Countdown targetDate={targetDate} />
          
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--theater-red)) 0%, hsl(var(--theater-gold)) 100%)',
                boxShadow: '0 4px 15px hsl(var(--theater-red) / 0.3)',
              }}
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="hsl(var(--primary-foreground))" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--theater-red)) 0%, hsl(var(--theater-gold)) 100%)',
                boxShadow: '0 4px 15px hsl(var(--theater-red) / 0.3)',
              }}
              aria-label="Twitter/X"
            >
              <svg className="w-5 h-5" fill="hsl(var(--primary-foreground))" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--theater-red)) 0%, hsl(var(--theater-gold)) 100%)',
                boxShadow: '0 4px 15px hsl(var(--theater-red) / 0.3)',
              }}
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="hsl(var(--primary-foreground))" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            
            <a
              href="https://youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--theater-red)) 0%, hsl(var(--theater-gold)) 100%)',
                boxShadow: '0 4px 15px hsl(var(--theater-red) / 0.3)',
              }}
              aria-label="YouTube"
            >
              <svg className="w-5 h-5" fill="hsl(var(--primary-foreground))" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </main>

        {/* Decorative Footer Element */}
        <footer className="py-6 text-center">
          <div
            className="text-sm tracking-[0.3em] uppercase font-serif"
            style={{ color: 'hsl(var(--muted-foreground) / 0.6)' }}
          >
            Dress Rehearsal Complete
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
