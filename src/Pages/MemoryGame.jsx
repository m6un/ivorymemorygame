/**
 * MemoryGame component
 *
 * This component implements a memory card game where players match pairs of emoji cards.
 * It manages game state, handles user interactions, and provides a responsive UI.
 *
 * @component
 * @returns {JSX.Element} The rendered MemoryGame component
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import EndGameModal from '../components/EndGameModal';
import {
  CARD_ELEMENTS,
  CARDS_AMOUNT,
  MATCH_SCORE,
  CONSECUTIVE_MATCH_BONUS,
  TIME_BONUS_FACTOR,
  CARD_FLIP_TIMEOUT_MS,
  GAME_DURATION_MS,
} from '../utils/constants';
import { PlusIcon } from '../components/Icons/PlusIcon';
import Card from '../components/Card';
import SoundManager from '../utils/SoundManager';
import useWakeLock from '../hooks/useWakeLock';

const MemoryGame = () => {
  // State variables
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [score, setScore] = useState(0);
  const [consecutiveMatches, setConsecutiveMatches] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [streakCard, setStreakCard] = useState(null);
  const [showAllCards, setShowAllCards] = useState(true);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_MS / 1000);
  const [isGameActive, setIsGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [discoveredEmojis, setDiscoveredEmojis] = useState(new Set());
  const [isMuted, setIsMuted] = useState(false);

  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  /**
   * Generates an array of paired cards for the game
   * @param {Array} arr - Array of possible card values
   * @param {number} fieldSize - Total number of cards needed
   * @returns {Array} Shuffled array of paired cards
   */
  const generateArrayWithPairs = useCallback((arr, fieldSize) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    const selectedItems = shuffled.slice(0, fieldSize / 2);
    const pairs = selectedItems.flatMap(item => [item, item]);
    return pairs.sort(() => Math.random() - 0.5);
  }, []);

  /**
   * Calculates the final score including time bonus
   * @returns {number} Final score
   */
  const calculateScore = useCallback(() => {
    const timeBonus = timeLeft * TIME_BONUS_FACTOR;
    return score + timeBonus;
  }, [timeLeft, score]);

  /**
   * Starts a new game
   */
  const startGame = useCallback(() => {
    SoundManager?.playNewGame();
    const shuffledCards = generateArrayWithPairs(CARD_ELEMENTS, CARDS_AMOUNT);
    setCards(shuffledCards);
    setVisibleCards([]);
    setMatchedCards([]);
    setScore(0);
    setConsecutiveMatches(0);
    setGameStartTime(Date.now());
    setIsWon(false);
    setStreakCard(null);
    setShowAllCards(true);
    setTimeLeft(GAME_DURATION_MS / 1000);
    setIsGameActive(false);
    setShowModal(false);
    setDiscoveredEmojis(new Set());

    requestWakeLock();

    setTimeout(() => {
      setShowAllCards(false);
      setIsGameActive(true);
    }, CARD_FLIP_TIMEOUT_MS);
  }, [generateArrayWithPairs, requestWakeLock]);

  /**
   * Ends the current game
   */
  const endGame = useCallback(() => {
    setIsGameActive(false);
    const finalScore = calculateScore();
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }
    if (discoveredEmojis?.size > 0) {
      SoundManager?.playCongrats();
    } else {
      SoundManager?.playRetry();
    }
    setShowModal(true);
    releaseWakeLock();
  }, [calculateScore, highScore, discoveredEmojis, releaseWakeLock]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft, endGame]);

  /**
   * Toggles sound mute state
   */
  const toggleMute = useCallback(() => {
    setIsMuted(prevMuted => !prevMuted);
    SoundManager.toggleMute();
  }, []);

  /**
   * Handles card click events
   * @param {number} index - Index of the clicked card
   */
  const handleCardClick = useCallback(
    index => {
      if (showAllCards || !isGameActive) return;
      if (visibleCards.length === 2 || visibleCards.includes(index) || matchedCards.includes(index))
        return;

      try {
        SoundManager?.playCardClick();

        const newVisibleCards = [...visibleCards, index];
        setVisibleCards(newVisibleCards);

        if (newVisibleCards.length === 2) {
          const [firstIndex, secondIndex] = newVisibleCards;
          if (cards[firstIndex] === cards[secondIndex]) {
            setMatchedCards(prev => [...prev, firstIndex, secondIndex]);
            setDiscoveredEmojis(prev => new Set(prev).add(cards[firstIndex]));
            const matchScore = MATCH_SCORE + consecutiveMatches * CONSECUTIVE_MATCH_BONUS;
            setScore(prev => prev + matchScore);
            setConsecutiveMatches(prev => prev + 1);
            setStreakCard(secondIndex);

            if (consecutiveMatches > 0) {
              SoundManager?.playStreak();
            }

            setTimeout(() => setStreakCard(null), 1000);
            setVisibleCards([]);

            if (matchedCards.length + 2 === CARDS_AMOUNT) {
              const timeTaken = (Date.now() - gameStartTime) / 1000;
              const timeBonus = Math.max(0, Math.floor((300 - timeTaken) * TIME_BONUS_FACTOR));
              setScore(prevScore => prevScore + timeBonus);
              setIsWon(true);
              endGame();
            }
          } else {
            setTimeout(() => setVisibleCards([]), 1000);
            setConsecutiveMatches(0);
          }
        }
      } catch (error) {
        console.error('Error in handleCardClick:', error);
      }
    },
    [
      visibleCards,
      matchedCards,
      cards,
      isGameActive,
      showAllCards,
      consecutiveMatches,
      gameStartTime,
      endGame,
    ]
  );

  // Memoized card components
  const memoizedCards = useMemo(
    () =>
      cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          isVisible={showAllCards || visibleCards.includes(index) || matchedCards.includes(index)}
          onClick={handleCardClick}
          streakCard={streakCard}
          consecutiveMatches={consecutiveMatches}
        />
      )),
    [
      cards,
      showAllCards,
      visibleCards,
      matchedCards,
      handleCardClick,
      streakCard,
      consecutiveMatches,
    ]
  );

  // Memoized end game modal
  const memoizedModal = useMemo(
    () => (
      <EndGameModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        score={score}
        highScore={highScore}
        onPlayAgain={startGame}
        emojisDiscovered={discoveredEmojis}
      />
    ),
    [showModal, score, highScore, startGame, discoveredEmojis]
  );

  console.log({ cards });

  return (
    <div className="flex flex-col items-center bg-memory-pattern justify-center min-h-screen text-primary">
      <h1 className=" text-2xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-medium mb-2 text-black">
        Memory Game
      </h1>
      <h2 className="text-sm mb-4 font-normal text-gray-600">Match the emojis</h2>
      <div
        className={`grid grid-cols-4 gap-3 max-w-md mx-auto mt-4 ${cards.length === 0 ? 'mb-2' : 'mb-8'}`}
      >
        {memoizedCards}
      </div>
      {isWon && <h2 className="text-lg font-semibold mb-2">You won!</h2>}
      {isGameActive ? (
        <div className="flex flex-row items-center justify-center gap-4">
          <div
            className={`text-sm w-12 h-12 rounded-full flex items-center justify-center text-white ${
              timeLeft < 5 ? 'bg-red-600' : 'bg-black'
            }`}
          >
            {timeLeft ? timeLeft + 's' : "Time's up!"}
          </div>
          <button
            onClick={toggleMute}
            className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:opacity-80 transition-opacity"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      ) : (
        <button
          className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:opacity-80 transition-opacity"
          onClick={startGame}
        >
          <span className="flex gap-2 items-center">
            <PlusIcon className="w-6 h-6" />
            New game
          </span>
        </button>
      )}
      {memoizedModal}
    </div>
  );
};

export default MemoryGame;