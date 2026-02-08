
import React, { useState, useEffect } from 'react';

type Language = 'EN' | 'IT';

const translations = {
  EN: {
    menuTitle: "LOVESICK",
    menuSub: "Akademi High Shadow Simulator",
    enterBtn: "ENTER THE SHADOWS",
    protocol: "Yandere Protocol Active",
    gameOverMsg: "Your heart broke before it could even beat.",
    devMsg: "The game is in development",
    backBtn: "Back to menu",
    gameOverText: "GAMEOVER",
    rotateMsg: "Please rotate your device to landscape mode"
  },
  IT: {
    menuTitle: "LOVESICK",
    menuSub: "Simulatore Ombra Akademi High",
    enterBtn: "ENTRA NELL'OMBRA",
    protocol: "Protocollo Yandere Attivo",
    gameOverMsg: "Il tuo cuore si è spezzato prima ancora di battere.",
    devMsg: "Il gioco è in fase di sviluppo",
    backBtn: "Torna al menù",
    gameOverText: "GAMEOVER",
    rotateMsg: "Ruota il dispositivo in modalità orizzontale"
  }
};

const App: React.FC = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [lang, setLang] = useState<Language>('EN');
  const [isPortrait, setIsPortrait] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const triggerGameOver = () => {
    const bloodOverlay = document.getElementById('blood-overlay');
    if (bloodOverlay) {
      bloodOverlay.classList.add('blood-active');
      setTimeout(() => {
        bloodOverlay.classList.remove('blood-active');
      }, 1000);
    }
    
    setTimeout(() => {
      setIsGameOver(true);
    }, 300);
  };

  const LanguageSwitcher = () => (
    <div className="absolute top-2 right-2 sm:top-6 sm:right-6 z-50 flex gap-2">
      {(['EN', 'IT'] as Language[]).map((l) => (
        <button
          key={l}
          onClick={(e) => {
            e.stopPropagation();
            setLang(l);
          }}
          className={`px-4 py-2 sm:px-3 sm:py-1 text-[10px] font-black rounded border transition-all touch-manipulation min-w-[44px] min-h-[32px] flex items-center justify-center ${
            lang === l 
            ? 'bg-rose-600 border-rose-500 text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]' 
            : 'bg-black/40 border-white/10 text-white/40 hover:text-white/80'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="mb-8 text-rose-600">
          <i className="fa-solid fa-mobile-screen-button text-6xl rotate-90 opacity-20 absolute scale-110"></i>
          <i className="fa-solid fa-mobile-screen-button text-6xl animate-pulse"></i>
        </div>
        <h2 className="anime-font text-xl text-rose-500 uppercase tracking-widest leading-relaxed">
          {t.rotateMsg}
        </h2>
        <div className="mt-6 w-16 h-1 bg-rose-900/30 rounded-full overflow-hidden">
          <div className="h-full bg-rose-600 w-1/2 animate-[shimmer_2s_infinite]"></div>
        </div>
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-2 text-center select-none overflow-hidden relative">
        <LanguageSwitcher />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
        
        <div className="shattered-heart animate-bounce mb-1 sm:mb-4">
          <i className="fa-solid fa-heart-crack text-[8vh] sm:text-8xl text-rose-800 drop-shadow-[0_0_20px_rgba(159,18,57,0.8)]"></i>
        </div>

        <h1 className="anime-font text-[12vh] sm:text-[8rem] heartbroken-text mb-1 sm:mb-4 tracking-tighter leading-none flex flex-wrap justify-center items-center">
          {t.gameOverText.split("").map((char, i) => (
            <span 
              key={i} 
              className="heartbroken-letter px-0.5" 
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className="space-y-1 sm:space-y-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-500 max-w-2xl px-4">
          <p className="text-[3vh] sm:text-xl font-light text-rose-200/50 italic tracking-widest uppercase">
            {t.gameOverMsg}
          </p>
          
          <div className="h-px w-24 sm:w-64 bg-gradient-to-r from-transparent via-rose-900 to-transparent mx-auto"></div>
          
          <p className="text-[2.5vh] sm:text-lg font-bold text-white tracking-[0.2em] uppercase opacity-80 animate-pulse">
            {t.devMsg}
          </p>
        </div>

        <button 
          onClick={() => setIsGameOver(false)}
          className="mt-4 sm:mt-8 px-8 py-3 border border-rose-900/50 text-rose-500 rounded-full font-black text-[2.5vh] sm:text-xs uppercase hover:bg-rose-950 hover:text-rose-400 transition-all tracking-widest active:scale-95 touch-manipulation min-h-[44px]"
        >
          {t.backBtn}
        </button>

        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600/30"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600/30"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden relative select-none px-4">
      <LanguageSwitcher />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/40 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center animate-in fade-in duration-1000 w-full">
        <h1 className="anime-font text-[22vh] sm:text-[12rem] text-rose-600 mb-0 tracking-tighter leading-none drop-shadow-[0_0_25px_rgba(225,29,72,0.4)] transition-transform duration-500">
          {t.menuTitle}
        </h1>
        
        <p className="text-rose-200 uppercase tracking-[0.4em] sm:tracking-[0.8em] text-[2.5vh] sm:text-sm mb-6 sm:mb-16 opacity-60 text-center">
          {t.menuSub}
        </p>
        
        <button 
          onClick={triggerGameOver}
          className="group relative px-12 py-5 sm:px-20 sm:py-8 bg-rose-600 rounded-full font-black text-[3vh] sm:text-2xl hover:bg-rose-500 transition-all shadow-xl shadow-rose-900/40 overflow-hidden active:scale-95 touch-manipulation min-h-[60px]"
        >
          <span className="relative z-10">{t.enterBtn}</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>

      <div className="absolute bottom-2 left-4 sm:bottom-10 sm:left-10 opacity-30 text-[1.5vh] sm:text-[10px] font-black uppercase tracking-widest text-rose-500 pointer-events-none">
        {t.protocol}
      </div>
    </div>
  );
};

export default App;
