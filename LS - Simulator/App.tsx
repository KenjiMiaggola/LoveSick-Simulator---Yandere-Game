
import React, { useState, useEffect } from 'react';

type Language = 'EN' | 'IT';
type AppView = 'MENU' | 'LOADING' | 'MESSAGE';

const translations = {
  EN: {
    menuTitle: "LOVESICK",
    menuSub: "Akademi High Shadow Simulator",
    enterBtn: "ENTER THE SHADOWS",
    protocol: "ALPHA",
    loadingText: "Synchronizing Heartbeat...",
    devMsg: "The game is in development. Thank you for testing the protocol.",
    unauthorizedMsg: "Access is not authorized for users",
    backBtn: "Return to Menu",
    rotateMsg: "Please rotate your device to landscape mode"
  },
  IT: {
    menuTitle: "LOVESICK",
    menuSub: "Simulatore Ombra Akademi High",
    enterBtn: "ENTRA NELL'OMBRA",
    protocol: "ALPHA",
    loadingText: "Sincronizzazione Battito...",
    devMsg: "Il gioco è in fase di sviluppo. Grazie per aver testato il protocollo.",
    unauthorizedMsg: "L'accesso non è autorizzato per gli utenti",
    backBtn: "Torna al Menù",
    rotateMsg: "Ruota il dispositivo in modalità orizzontale"
  }
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('MENU');
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

  const startLoading = () => {
    const bloodOverlay = document.getElementById('blood-overlay');
    if (bloodOverlay) {
      bloodOverlay.classList.add('blood-active');
      setTimeout(() => {
        bloodOverlay.classList.remove('blood-active');
      }, 1000);
    }
    
    setTimeout(() => {
      setView('LOADING');
    }, 300);
  };

  useEffect(() => {
    if (view === 'LOADING') {
      const timer = setTimeout(() => {
        setView('MESSAGE');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [view]);

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
      </div>
    );
  }

  if (view === 'LOADING') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white p-4 text-center select-none overflow-hidden relative">
        <div className="relative flex flex-col items-center">
          {/* Spinner personalizzato in stile Lovesick */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-rose-900/30 border-t-rose-600 rounded-full animate-spin mb-8 shadow-[0_0_20px_rgba(225,29,72,0.2)]"></div>
          
          <div className="anime-font text-2xl sm:text-4xl text-rose-500 tracking-widest animate-pulse uppercase">
            {t.loadingText}
          </div>
          
          <div className="mt-4 flex gap-1">
            <div className="w-2 h-2 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-rose-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'MESSAGE') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4 text-center select-none overflow-hidden relative">
        <LanguageSwitcher />
        <div className="max-w-2xl animate-in fade-in zoom-in duration-700">
          <i className="fa-solid fa-heart text-5xl sm:text-7xl text-rose-600 mb-8 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]"></i>
          <h2 className="anime-font text-3xl sm:text-5xl text-white mb-6 uppercase tracking-tighter">
            System Ready
          </h2>
          <div className="mb-12 space-y-2">
            <p className="text-xl sm:text-2xl font-light text-rose-200/70 italic px-6">
              {t.devMsg}
            </p>
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-rose-900/60">
              {t.unauthorizedMsg}
            </p>
          </div>
          <button 
            onClick={() => setView('MENU')}
            className="px-10 py-4 border border-rose-600 text-rose-500 rounded-full font-black text-sm uppercase hover:bg-rose-600 hover:text-white transition-all tracking-widest active:scale-95 touch-manipulation"
          >
            {t.backBtn}
          </button>
        </div>
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
          onClick={startLoading}
          className="group relative px-12 py-5 sm:px-20 sm:py-8 bg-rose-600 rounded-full font-black text-[3vh] sm:text-2xl hover:bg-rose-500 transition-all shadow-xl shadow-rose-900/40 overflow-hidden active:scale-95 touch-manipulation min-h-[60px]"
        >
          <span className="relative z-10">{t.enterBtn}</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>

      <div className="absolute bottom-2 left-4 sm:bottom-10 sm:left-10 opacity-30 text-[1.5vh] sm:text-[10px] font-black uppercase tracking-widest text-rose-500 pointer-events-none">
        {t.protocol}
      </div>

      <div className="absolute bottom-2 right-4 sm:bottom-10 sm:right-10 opacity-30 text-[1.5vh] sm:text-[10px] font-black uppercase tracking-widest text-rose-500 pointer-events-none">
        KStudio
      </div>
    </div>
  );
};

export default App;
