
import React, { useState } from 'react';

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
    gameOverText: "GAMEOVER"
  },
  IT: {
    menuTitle: "LOVESICK",
    menuSub: "Simulatore Ombra Akademi High",
    enterBtn: "ENTRA NELL'OMBRA",
    protocol: "Protocollo Yandere Attivo",
    gameOverMsg: "Il tuo cuore si è spezzato prima ancora di battere.",
    devMsg: "Il gioco è in fase di sviluppo",
    backBtn: "Torna al menù",
    gameOverText: "GAMEOVER"
  }
};

const App: React.FC = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [lang, setLang] = useState<Language>('EN');

  const t = translations[lang];

  const triggerGameOver = () => {
    const bloodOverlay = document.getElementById('blood-overlay');
    if (bloodOverlay) {
      bloodOverlay.classList.add('blood-active');
    }
    
    setTimeout(() => {
      setIsGameOver(true);
    }, 300);
  };

  const LanguageSwitcher = () => (
    <div className="absolute top-6 right-6 z-50 flex gap-2">
      {(['EN', 'IT'] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-[10px] font-black rounded border transition-all ${
            lang === l 
            ? 'bg-rose-600 border-rose-500 text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]' 
            : 'bg-transparent border-white/10 text-white/40 hover:text-white/80 hover:border-white/30'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  if (isGameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-12 text-center select-none overflow-hidden relative">
        <LanguageSwitcher />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
        
        <div className="shattered-heart animate-bounce">
          <i className="fa-solid fa-heart-crack text-8xl text-rose-800 drop-shadow-[0_0_30px_rgba(159,18,57,0.8)]"></i>
        </div>

        <h1 className="anime-font text-[8rem] heartbroken-text mb-4 tracking-[0.2em] leading-none">
          {t.gameOverText.split("").map((char, i) => (
            <span 
              key={i} 
              className="heartbroken-letter" 
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <p className="text-2xl font-light text-rose-200/50 italic tracking-widest uppercase">
            {t.gameOverMsg}
          </p>
          
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-rose-900 to-transparent mx-auto"></div>
          
          <p className="text-lg font-bold text-white tracking-[0.3em] uppercase opacity-80 animate-pulse">
            {t.devMsg}
          </p>
        </div>

        <button 
          onClick={() => {
            setIsGameOver(false);
            document.getElementById('blood-overlay')?.classList.remove('blood-active');
          }}
          className="mt-16 px-10 py-4 border border-rose-900/50 text-rose-500 rounded-full font-black text-xs uppercase hover:bg-rose-950 hover:text-rose-400 transition-all tracking-widest"
        >
          {t.backBtn}
        </button>

        <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600/20 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden relative select-none">
      <LanguageSwitcher />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center animate-in fade-in duration-1000">
        <h1 className="anime-font text-[12rem] text-rose-600 mb-0 tracking-tighter leading-none select-none drop-shadow-[0_0_35px_rgba(225,29,72,0.5)] hover:scale-105 transition-transform duration-500">
          {t.menuTitle}
        </h1>
        <p className="text-rose-200 uppercase tracking-[0.8em] text-sm mb-16 opacity-70 select-none">
          {t.menuSub}
        </p>
        
        <button 
          onClick={triggerGameOver}
          className="group relative px-20 py-8 bg-rose-600 rounded-full font-black text-2xl hover:bg-rose-500 transition-all shadow-2xl shadow-rose-900/50 overflow-hidden select-none active:scale-95"
        >
          <span className="relative z-10">{t.enterBtn}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>

      <div className="absolute bottom-10 left-10 opacity-20 text-[10px] font-black uppercase tracking-[0.5em] text-rose-500 select-none">
        {t.protocol}
      </div>
    </div>
  );
};

export default App;
