/**
 * @fileoverview SoundManager class for handling game sounds
 * @module SoundManager
 */

import streakSound from '../assets/sounds/streak.mp3';
import cardClickSound from '../assets/sounds/cardClick.mp3';
import congratsSound from '../assets/sounds/congrats.mp3';
import retrySound from '../assets/sounds/retry.mp3';
import newGameSound from '../assets/sounds/newGame.mp3';

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
    };

    /**
     * Mute state
     * @type {boolean}
     */
    this.muted = false;
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
}

export default new SoundManager();
