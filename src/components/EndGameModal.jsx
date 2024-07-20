import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { CopyIcon } from './Icons/CopyIcon';
import { ShareIcon } from './Icons/ShareIcon';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

/**
 * EndGameModal component displays the end game modal with score, high score, and options to play again or share results.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - The function to call when the modal is closed.
 * @param {number} props.score - The player's score.
 * @param {number} props.highScore - The highest score achieved.
 * @param {function} props.onPlayAgain - The function to call when the player wants to play again.
 * @param {Set} props.emojisDiscovered - The set of emojis discovered by the player.
 *
 * @returns {JSX.Element|null} The rendered end game modal component or null if the modal is not open.
 */
const EndGameModal = ({ isOpen, onClose, score, highScore, onPlayAgain, emojisDiscovered }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /**
   * Generates the shareable and display content based on the discovered emojis.
   *
   * @param {boolean} [display=false] - Whether to generate content for display or sharing.
   * @returns {string} The generated content.
   */
  const generateShareableandDisplayContent = (display = false) => {
    const emojis = Array.from(emojisDiscovered);
    return display
      ? emojis.length !== 0
        ? `You found the following emojis:\n${emojis.join(' ')}`
        : `You found no emojis 😔`
      : `I found the following emojis: \n${emojis.join(' ')}\n\nPlay now: https://memorygame.chandrxn.me`;
  };

  const shareableContent = generateShareableandDisplayContent();
  const disPlayContent = generateShareableandDisplayContent(true);

  /**
   * Shares the shareable content to Twitter.
   */
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareableContent)}`;
    window.open(twitterUrl, '_blank');
  };

  /**
   * Shares the shareable content to social media.
   */
  const shareToSocial = async () => {
    const shareData = {
      title: 'Emoji Memory Game',
      text: shareableContent,
    };

    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor's Share plugin for native platforms
        await Share.share(shareData);
      } else if (navigator.share && navigator.canShare(shareData)) {
        // Use Web Share API for supported browsers
        await navigator.share(shareData);
      } else {
        // Fallback to Twitter sharing for unsupported browsers
        shareToTwitter();
      }
    } catch (error) {
      console.error('Failed to share: ', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">
          {emojisDiscovered?.size > 0 ? 'Congratulations!' : 'Better luck next time!'}
        </h2>
        <p className="mb-2 text-gray-600 text-sm font-medium">Your Score: {score}</p>
        <p className="mb-4 text-gray-600 text-sm font-medium">Highest Score: {highScore}</p>
        <div className="bg-gray-100 rounded-xl p-4 mb-4">
          <pre className="whitespace-pre-wrap text-gray-600 flex flex-row justify-between items-end">
            <span className="text-gray-600 text-sm">{disPlayContent}</span>
          </pre>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onPlayAgain}
            className="bg-green-600 text-white  px-6 py-2 rounded-md text-sm hover:opacity-90 transition-opacity flex-1"
          >
            Play Again
          </button>
          {emojisDiscovered?.size > 0 && (
            <button
              onClick={shareToSocial}
              className="bg-black text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition-opacity flex-1 "
            >
              <span className="flex gap-1 items-center justify-center">
                <ShareIcon className="w-6 h-6" />
                Share
              </span>
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-2 text-gray-600 px-4 py-2 text-sm rounded-md hover:text-gray-800 hover:bg-gray-100 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

EndGameModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  emojisDiscovered: PropTypes.instanceOf(Set).isRequired,
};

export default EndGameModal;
