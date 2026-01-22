
import React, { useState } from 'react';
import { DETAILS, COLORS, CelticKnot, ArrowIcon } from './constants';
import { generateRoyalGreeting, generateMeridaImage } from './services/geminiService';
import FloatingWisps from './components/FloatingWisps';

const BearIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12,2C10.89,2 10,2.89 10,4C10,4.24 10.04,4.47 10.12,4.68C8.3,5.1 7,6.72 7,8.65C7,10.05 7.68,11.3 8.73,12.06C6.54,12.76 5,14.81 5,17.22C5,19.85 7.15,22 9.78,22H14.22C16.85,22 19,19.85 19,17.22C19,14.81 17.46,12.76 15.27,12.06C16.32,11.3 17,10.05 17,8.65C17,6.72 15.7,5.1 13.88,4.68C13.96,4.47 14,4.24 14,4C14,2.89 13.11,2 12,2M7,4A2,2 0 0,1 9,6A2,2 0 0,1 7,8A2,2 0 0,1 5,6A2,2 0 0,1 7,4M17,4A2,2 0 0,1 19,6A2,2 0 0,1 17,8A2,2 0 0,1 15,6A2,2 0 0,1 17,4M12,8C13.1,8 14,8.9 14,10C14,11.1 13.1,12 12,12C10.9,12 10,11.1 10,10C10,8.9 10.9,8 12,8Z" />
  </svg>
);

const MeridaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12,2C11.5,2 11,2.1 10.5,2.3C10,2.5 9.6,2.8 9.2,3.2C8.8,3.6 8.5,4 8.3,4.5C8.1,5 8,5.5 8,6C8,7.1 8.4,8.1 9.1,8.9C8.4,9.7 8,10.7 8,11.8C8,13.2 8.7,14.4 9.8,15.1C9,15.7 8.5,16.5 8.2,17.5C7.9,18.5 8,19.5 8.4,20.4C8.8,21.3 9.5,21.9 10.4,22.2C11.3,22.5 12.3,22.5 13.2,22.1C14.1,21.7 14.7,21 15,20.1C15.3,19.2 15.2,18.2 14.8,17.3C14.4,16.4 13.7,15.8 12.8,15.5L12,15L11.2,15.5C10.4,15.8 9.8,16.4 9.4,17.3C9.1,18.2 9,19.2 9.3,20.1C9.6,21 10.2,21.7 11.1,22.1C12,22.5 13,22.5 13.9,22.2C14.8,21.9 15.5,21.3 15.9,20.4C16.3,19.5 16.4,18.5 16.1,17.5C15.8,16.5 15.3,15.7 14.5,15.1C15.6,14.4 16.3,13.2 16.3,11.8C16.3,10.7 15.9,9.7 15.2,8.9C15.9,8.1 16.3,7.1 16.3,6C16.3,4.9 15.9,3.9 15.2,3.1C14.5,2.3 13.5,1.9 12.5,1.8C12.3,1.8 12.1,1.8 12,1.8L12,2Z" />
    <path d="M12,4C13.1,4 14,4.9 14,6C14,7.1 13.1,8 12,8C10.9,8 10,7.1 10,6C10,4.9 10.9,4 12,4Z" />
    <path d="M12,10C13.1,10 14,10.9 14,12C14,13.1 13.1,14 12,14C10.9,14 10,13.1 10,12C10,10.9 10.9,10 12,10Z" />
  </svg>
);

const App: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [personalizedMsg, setPersonalizedMsg] = useState('');
  const [meridaImg, setMeridaImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleGenerate = async () => {
    if (!guestName.trim()) return;
    setIsLoading(true);
    try {
      const [msg, img] = await Promise.all([
        generateRoyalGreeting(guestName),
        generateMeridaImage()
      ]);
      
      setPersonalizedMsg(msg);
      setMeridaImg(img);
      setShowInvitation(true);
    } catch (err) {
      console.error("Error de generación:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const sendWhatsApp = () => {
    const text = encodeURIComponent(`¡Hola! Soy ${guestName}, confirmo con honor mi asistencia al cumpleaños de Valentina. ¡Ahí nos vemos!`);
    window.open(`https://wa.me/${DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  const resetAll = () => {
    setShowInvitation(false);
    setIsConfirmed(false);
    setGuestName('');
    setPersonalizedMsg('');
    setMeridaImg(null);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 bg-[#1a2e1a] text-[#fefae0] overflow-hidden">
      <FloatingWisps />

      {isConfirmed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="relative w-full max-w-lg bg-[#2d5a27] border-4 border-double border-[#d4af37] p-8 md:p-12 rounded-[2rem] text-center shadow-[0_0_50px_rgba(212,175,55,0.4)] animate-in zoom-in-95 duration-300">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1a2e1a] p-4 rounded-full border-2 border-[#d4af37]">
              <CelticKnot className="w-16 h-16 text-[#d4af37] animate-pulse" />
            </div>
            <h3 className="font-celtic text-3xl md:text-4xl text-[#d4af37] mb-6 mt-4">¡Lealtad Jurada!</h3>
            <p className="font-serif italic text-xl md:text-2xl mb-8 leading-relaxed">
              "Tu nombre ha sido grabado en las piedras de DunBroch. El Clan de Valentina te espera con honor y alegría."
            </p>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={sendWhatsApp}
                className="w-full px-10 py-4 bg-[#25D366] text-white font-celtic tracking-widest rounded-xl hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.147 1.44 4.817 1.441 5.483 0 9.944-4.461 9.947-9.945.001-2.657-1.036-5.155-2.92-7.04-1.881-1.884-4.385-2.92-7.045-2.92-5.485 0-9.946 4.462-9.948 9.946-.001 1.83.5 3.612 1.45 5.165l-1.012 3.693 3.784-1.044z" />
                </svg>
                Notificar por WhatsApp
              </button>
              
              <button
                onClick={() => setIsConfirmed(false)}
                className="w-full px-10 py-3 bg-[#d35400] text-white font-celtic tracking-widest rounded-xl hover:bg-[#b34700] transition-colors"
              >
                Cerrar Pergamino
              </button>
            </div>
          </div>
        </div>
      )}

      {!showInvitation ? (
        <div className="z-10 w-full max-w-md relative mt-16">
          <div className="absolute -top-32 left-0 right-0 flex justify-center items-end pointer-events-none h-40">
            <div className="absolute left-4 bottom-4 animate-in slide-in-from-left-12 duration-1000 opacity-60">
              <div className="relative">
                <div className="w-12 h-1 bg-[#d4af37]/20 absolute -bottom-1 rounded-full blur-sm" />
                <MeridaIcon className="w-16 h-16 text-[#d35400]" />
              </div>
            </div>
            
            <div className="flex gap-2 items-end mb-2">
               <div className="animate-bounce" style={{ animationDelay: '0.1s' }}>
                <BearIcon className="w-8 h-8 text-[#1a2e1a] stroke-[#d4af37] stroke-1 drop-shadow-lg transform -rotate-12" />
               </div>
               <div className="animate-bounce" style={{ animationDelay: '0.3s' }}>
                <BearIcon className="w-10 h-10 text-[#1a2e1a] stroke-[#d4af37] stroke-1 drop-shadow-lg -mb-2" />
               </div>
               <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
                <BearIcon className="w-8 h-8 text-[#1a2e1a] stroke-[#d4af37] stroke-1 drop-shadow-lg transform rotate-12" />
               </div>
            </div>

             <div className="absolute right-4 bottom-4 animate-in slide-in-from-right-12 duration-1000 opacity-60 transform scale-x-[-1]">
              <div className="relative">
                <div className="w-12 h-1 bg-[#d4af37]/20 absolute -bottom-1 rounded-full blur-sm" />
                <MeridaIcon className="w-16 h-16 text-[#d35400]" />
              </div>
            </div>
          </div>

          <div className="bg-[#2d5a27]/30 backdrop-blur-xl p-10 rounded-[2.5rem] border border-[#d4af37]/30 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex justify-center mb-8 relative">
               <CelticKnot className="w-20 h-20 text-[#d4af37] animate-float" />
               <BearIcon className="w-6 h-6 text-[#d35400] absolute -top-2 right-1/2 translate-x-12 animate-pulse" />
            </div>
            <h1 className="font-celtic text-4xl mb-6 text-[#d4af37] tracking-wider">Tierras de DunBroch</h1>
            <p className="font-serif italic text-xl mb-10 text-[#fefae0]/80">Para ver tu destino, revela tu nombre ante el clan...</p>
            
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Tu nombre real..."
              className="w-full bg-[#1a2e1a]/60 border-b-2 border-[#d4af37]/50 p-4 text-center text-2xl focus:outline-none focus:border-[#d35400] transition-all rounded-t-xl mb-10 placeholder:text-white/20"
            />

            <button
              onClick={handleGenerate}
              disabled={isLoading || !guestName.trim()}
              className="group relative w-full overflow-hidden inline-flex items-center justify-center px-10 py-4 font-celtic text-xl tracking-widest text-[#1a2e1a] transition-all duration-300 bg-[#d4af37] rounded-2xl hover:bg-[#d35400] hover:text-[#fefae0] disabled:opacity-50 disabled:grayscale shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isLoading ? 'Conjurando...' : 'Cambiar mi Destino'}
                {!isLoading && <ArrowIcon className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="z-10 w-full max-w-2xl bg-white/5 backdrop-blur-2xl rounded-[3rem] overflow-hidden border-[3px] border-[#d4af37]/60 shadow-[0_0_80px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in duration-1000 border-double my-8">
          
          <div className="h-72 md:h-96 relative overflow-hidden bg-[#1a2e1a]">
            {meridaImg ? (
              <img src={meridaImg} alt="Mérida" className="w-full h-full object-cover scale-105" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <CelticKnot className="w-24 h-24 text-gold/10 animate-spin-slow" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a] via-transparent to-black/40" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 px-6">
              <h2 className="font-celtic text-5xl md:text-7xl text-[#fefae0] text-center drop-shadow-[0_4px_15px_rgba(0,0,0,1)] leading-tight">
                Valentina <br/> <span className="text-white text-3xl md:text-4xl tracking-widest uppercase mt-4 block">Cumple 10 Años</span>
              </h2>
            </div>
          </div>

          <div className="p-8 md:p-14 text-center relative">
            <div className="bg-[#d35400]/5 border border-[#d35400]/20 p-8 rounded-[2rem] mb-12 relative group shadow-inner">
              <p className="font-serif italic text-2xl md:text-3xl text-[#d35400] leading-relaxed drop-shadow-sm">
                "{personalizedMsg}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
              <div className="space-y-3 md:border-r border-[#d4af37]/20 px-4">
                <span className="font-celtic text-[#d4af37] text-sm tracking-widest uppercase font-bold">Fecha Legendaria</span>
                <p className="font-serif text-3xl font-bold text-white">{DETAILS.date}</p>
                <p className="font-celtic text-[#d35400] text-xl">{DETAILS.time}</p>
              </div>
              <div className="space-y-3 px-4">
                <span className="font-celtic text-[#d4af37] text-sm tracking-widest uppercase font-bold">El Castillo</span>
                <p className="font-serif text-3xl font-bold text-white">{DETAILS.location}</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-block mt-3 text-sm font-celtic underline underline-offset-8 decoration-[#d35400] hover:text-[#d35400] transition-colors"
                >
                  Ver Mapa del Reino
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
              <button
                onClick={handleConfirm}
                className="w-full md:w-auto px-20 py-5 bg-[#d4af37] text-[#1a2e1a] font-celtic text-2xl rounded-2xl hover:bg-[#d35400] hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(212,175,55,0.3)]"
              >
                Confirmar mi Presencia
              </button>
              
              <div className="flex gap-6 items-center opacity-30">
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#d4af37]" />
                <CelticKnot className="w-8 h-8 text-[#d4af37]" />
                <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#d4af37]" />
              </div>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={resetAll}
        className="mt-8 mb-4 text-xs font-celtic tracking-[0.3em] opacity-30 hover:opacity-100 uppercase transition-all hover:text-[#d35400]"
      >
        Reiniciar Destino
      </button>
    </div>
  );
};

export default App;
