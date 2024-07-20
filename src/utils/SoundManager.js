/**
 * @fileoverview SoundManager class for handling game sounds
 * @module SoundManager
 */

import streakSound from '../assets/sounds/streak.mp3';
import cardClickSound from '../assets/sounds/cardClick.mp3';
import congratsSound from '../assets/sounds/congrats.mp3';
import retrySound from '../assets/sounds/retry.mp3';
import newGameSound from '../assets/sounds/newGame.mp3';
import matchSound from '../assets/sounds/match.mp3';

/**
 * SoundManager class
 * @class
 * @description Manages the loading and playing of game sounds
 */
class SoundManager {
  /**
   * Create a SoundManager
   * @constructor
   */
  constructor() {
    /**
     * Object containing sound sources and audio objects
     * @type {Object.<string, {src: string, audio: HTMLAudioElement|null}>}
     */
    this.sounds = {
      cardClick: { src: cardClickSound, audio: null },
      streak: { src: streakSound, audio: null },
      congrats: { src: congratsSound, audio: null },
      retry: { src: retrySound, audio: null },
      newGame: { src: newGameSound, audio: null },
      match: { src: matchSound, audio: null },
    };

    /**
     * Mute state
     * @type {boolean}
     */
    this.muted = false;

    this.tickingSound = null;
    this.tickingInterval = null;
  }

  /**
   * Load a sound if not already loaded
   * @param {string} soundName - The name of the sound to load
   * @returns {HTMLAudioElement} The loaded audio element
   */
  loadSound(soundName) {
    if (!this.sounds[soundName].audio) {
      this.sounds[soundName].audio = new Audio(this.sounds[soundName].src);
    }
    return this.sounds[soundName].audio;
  }

  /**
   * Toggle mute state for all sounds
   */
  toggleMute() {
    this.muted = !this.muted;
    Object.values(this.sounds).forEach(sound => {
      if (sound.audio) {
        sound.audio.muted = this.muted;
      }
    });
  }

  /**
   * Play a sound if not muted
   * @param {string} soundName - The name of the sound to play
   */
  playSound(soundName) {
    if (!this.muted) {
      const audio = this.loadSound(soundName);
      audio.currentTime = 0;
      audio.play().catch(error => console.error(`Error playing ${soundName} sound:`, error));
    }
  }

  playCardClick() {
    this.playSound('cardClick');
  }
  playStreak() {
    this.playSound('streak');
  }
  playCongrats() {
    this.playSound('congrats');
  }
  playRetry() {
    this.playSound('retry');
  }
  playNewGame() {
    this.playSound('newGame');
  }
  playMatch() {
    this.playSound('match');
  }

  playTickingLoop() {
    if (this.muted) return;

    this.tickingSound = this.loadSound('match');
    this.tickingSound.volume = 0.5; // Adjust volume as needed

    const playTicking = () => {
      if (this.tickingSound) {
        this.tickingSound.currentTime = 0;
        this.tickingSound.play();
      }
    };

    playTicking(); // Play immediately
    this.tickingInterval = setInterval(playTicking, 2000); // Loop every 2 seconds
  }

  stopTickingLoop() {
    if (this.tickingInterval) {
      clearInterval(this.tickingInterval);
      this.tickingInterval = null;
    }
    if (this.tickingSound) {
      this.tickingSound.pause();
      this.tickingSound = null;
    }
  }
}

export default new SoundManager();
