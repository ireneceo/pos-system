// Kitchen Station & LiveOrders notification sound presets using Web Audio API

export type SoundPreset = 'bell' | 'beep' | 'triple' | 'urgent' | 'melody' | 'deep';

export const SOUND_PRESETS: { value: SoundPreset; label: string }[] = [
  { value: 'bell', label: 'Bell' },
  { value: 'beep', label: 'Double Beep' },
  { value: 'triple', label: 'Triple' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'melody', label: 'Melody' },
  { value: 'deep', label: 'Deep' },
];

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

function playTone(
  ctx: AudioContext, freq: number, startTime: number, duration: number,
  volume: number = 0.8, type: OscillatorType = 'sine'
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = type;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

// Play two tones together (chord) for richer sound
function playChord(
  ctx: AudioContext, freqs: number[], startTime: number, duration: number,
  volume: number = 0.8, type: OscillatorType = 'sine'
) {
  const perVol = volume / freqs.length;
  freqs.forEach(f => playTone(ctx, f, startTime, duration, perVol, type));
}

export function playPresetSound(preset: SoundPreset, volume: number = 0.8): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (preset) {
      case 'bell':
        // Bright bell: C major chord ding-dong
        playChord(ctx, [523, 659, 784], now, 0.5, volume, 'sine');       // C5+E5+G5
        playChord(ctx, [659, 784, 1047], now + 0.4, 0.6, volume, 'sine'); // E5+G5+C6
        break;

      case 'beep':
        // Sharp electronic double beep
        playChord(ctx, [880, 1760], now, 0.25, volume, 'square');        // A5+A6
        playChord(ctx, [880, 1760], now + 0.35, 0.25, volume, 'square');
        break;

      case 'triple':
        // Staccato triple ping (xylophone feel)
        playChord(ctx, [1047, 1319], now, 0.15, volume, 'sine');          // C6+E6
        playChord(ctx, [1047, 1319], now + 0.2, 0.15, volume, 'sine');
        playChord(ctx, [1047, 1319], now + 0.4, 0.15, volume, 'sine');
        break;

      case 'urgent':
        // Alarm siren: alternating high-low with harmonics
        playChord(ctx, [880, 1320], now, 0.18, volume, 'sawtooth');
        playChord(ctx, [660, 990], now + 0.2, 0.18, volume, 'sawtooth');
        playChord(ctx, [880, 1320], now + 0.4, 0.18, volume, 'sawtooth');
        playChord(ctx, [660, 990], now + 0.6, 0.18, volume, 'sawtooth');
        break;

      case 'melody':
        // Doorbell melody: Do-Mi-Sol-Do ascending
        playChord(ctx, [523, 784], now, 0.22, volume, 'sine');            // C5+G5
        playChord(ctx, [659, 988], now + 0.25, 0.22, volume, 'sine');     // E5+B5
        playChord(ctx, [784, 1175], now + 0.5, 0.22, volume, 'sine');     // G5+D6
        playChord(ctx, [1047, 1568], now + 0.75, 0.35, volume, 'sine');   // C6+G6
        break;

      case 'deep':
        // Deep gong: low rumble with overtones
        playChord(ctx, [130, 196, 262], now, 1.2, volume, 'sine');        // C3+G3+C4
        playTone(ctx, 65, now, 1.5, volume * 0.5, 'triangle');            // Sub bass C2
        break;
    }
  } catch (error) {
    console.error('Failed to play notification sound:', error);
  }
}

// LiveOrders default sound (bright double ding)
export function playLiveOrderSound(volume: number = 0.8): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playChord(ctx, [800, 1200], now, 0.4, volume, 'sine');
    playChord(ctx, [1000, 1500], now + 0.25, 0.5, volume, 'sine');
  } catch (error) {
    console.error('Failed to play notification sound:', error);
  }
}

// ─── Repeating sound manager ───
let repeatInterval: ReturnType<typeof setInterval> | null = null;
let repeatPreset: SoundPreset = 'bell';

export function startRepeatingSound(preset: SoundPreset, intervalMs: number = 3000): void {
  stopRepeatingSound();
  repeatPreset = preset;
  playPresetSound(preset);
  repeatInterval = setInterval(() => {
    playPresetSound(repeatPreset);
  }, intervalMs);
}

export function stopRepeatingSound(): void {
  if (repeatInterval) {
    clearInterval(repeatInterval);
    repeatInterval = null;
  }
}

export function isRepeating(): boolean {
  return repeatInterval !== null;
}
