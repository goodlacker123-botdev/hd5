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
              href="https://open.spotify.com/user/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--theater-red)) 0%, hsl(var(--theater-gold)) 100%)',
                boxShadow: '0 4px 15px hsl(var(--theater-red) / 0.3)',
              }}
              aria-label="Spotify"
            >
              <svg className="w-5 h-5" fill="hsl(var(--primary-foreground))" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
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
            
            <a
              href="https://music.apple.com/profile/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--theater-red)) 0%, hsl(var(--theater-gold)) 100%)',
                boxShadow: '0 4px 15px hsl(var(--theater-red) / 0.3)',
              }}
              aria-label="Apple Music"
            >
              <svg className="w-5 h-5" fill="hsl(var(--primary-foreground))" viewBox="0 0 24 24">
                <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.455-2.865 2.78-.192.448-.292.925-.363 1.408a10.61 10.61 0 0 0-.1 1.18c-.01.193-.01.386-.015.578v12.15c.01.307.024.614.056.92.048.46.13.912.308 1.338.534 1.29 1.452 2.254 2.785 2.843.511.225 1.053.353 1.607.424.52.066 1.045.095 1.572.1h12.016c.527-.005 1.05-.034 1.57-.1.554-.07 1.097-.2 1.608-.424 1.332-.589 2.25-1.554 2.784-2.843.178-.426.26-.879.308-1.338.032-.306.046-.613.056-.92v-12.15c-.004-.192-.004-.385-.014-.578zM9.628 18.012c-1.248 0-2.496 0-3.744.002-.21 0-.42-.006-.63-.025-.495-.045-.948-.185-1.335-.51-.96-.806-1.04-2.26-.165-3.166.384-.397.867-.62 1.414-.71.55-.09 1.1-.117 1.654-.074a9.093 9.093 0 0 1 2.62.602c.077.03.156.055.237.077l.002-7.948c0-.046.007-.093.014-.14.05-.334.24-.596.548-.736.172-.078.356-.106.543-.127.363-.04.728-.07 1.092-.098 1.256-.096 2.515-.19 3.772-.286.412-.032.826-.062 1.238-.093.17-.013.34-.024.512-.027.343-.006.645.1.907.327.26.226.39.514.416.848.023.302.022.605.023.907v9.07c0 .14-.01.28-.03.418-.092.636-.45 1.09-1.06 1.352-.305.132-.625.204-.953.246-.61.078-1.223.108-1.836.115-1.23.015-2.426-.158-3.55-.746-1.006-.526-1.626-1.29-1.81-2.417-.104-.635-.052-1.264.197-1.864.49-1.182 1.413-1.87 2.67-2.078.603-.1 1.21-.13 1.82-.13.148 0 .296.01.444.014v-3.856l-.002-.015-.06.007c-1.25.12-2.5.237-3.748.356-.41.04-.822.076-1.233.118-.093.01-.186.028-.278.048-.156.033-.29.108-.398.229-.108.122-.162.265-.166.428-.004.132-.002.264-.002.396v7.754z"/>
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
