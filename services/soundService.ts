
const SFX_URLS = {
  reveal: 'https://assets.mixkit.co/sfx/preview/mixkit-magic-marimba-glissando-2821.mp3',
  confirm: 'https://assets.mixkit.co/sfx/preview/mixkit-magical-item-reveal-1229.mp3'
};

class SoundService {
  private sounds: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    // Pre-cargar sonidos
    Object.entries(SFX_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.35; // Volumen sutil
      this.sounds.set(key, audio);
    });
  }

  play(effect: keyof typeof SFX_URLS) {
    const audio = this.sounds.get(effect);
    if (audio) {
      audio.currentTime = 0; // Reiniciar si ya se estaba reproduciendo
      audio.play().catch(e => console.debug("Reproducción bloqueada por el navegador hasta interactuar."));
    }
  }
}

export const soundService = new SoundService();
