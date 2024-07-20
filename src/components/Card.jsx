import { StreakIcon } from './Icons/StreakIcon';
import PropTypes from 'prop-types';

/**
 * Card component represents a single card in the memory game.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.card - The emoji or symbol displayed on the card.
 * @param {number} props.index - The index of the card in the game board.
 * @param {boolean} props.isVisible - Whether the card is currently visible (flipped).
 * @param {function} props.onClick - The function to call when the card is clicked.
 * @param {number} [props.streakCard] - The index of the card that is part of a streak.
 * @param {number} [props.consecutiveMatches] - The number of consecutive matches made.
 *
 * @returns {JSX.Element} The rendered card component.
 */
const Card = ({ card, index, isVisible, onClick, streakCard, consecutiveMatches }) => (
  <div
    className="xs:w-14 xs:h-14 sm:w-22 sm:h-22 md:w-[72px] md:h-[72px] lg:w-[72px] lg:h-[72px] w-14 h-14 cursor-pointer perspective"
    onClick={() => onClick(index)}
  >
    <div
      className={`w-full h-full relative transition-transform duration-500 preserve-3d ${
        isVisible ? 'flip' : ''
      }`}
    >
      {/* Front of card */}
      <div className="absolute w-full h-full flex items-center justify-center text-3xl bg-primary text-white rounded-2xl shadow-card backface-hidden">
        ?
      </div>
      {/* Back of card */}
      <div className="absolute w-full h-full flex items-center justify-center text-3xl bg-primary text-white rounded-2xl shadow-card backface-hidden flip">
        <span>{card}</span>
      </div>
    </div>
    {streakCard === index && consecutiveMatches > 1 && (
      <div className="absolute -top-4 -left-4 w-12 h-12 animate-streak">
        <StreakIcon className="w-full h-full" />
        <span className="absolute inset-0 flex items-center justify-center text-primary text-sm font-bold">
          {consecutiveMatches}x
        </span>
      </div>
    )}
  </div>
);

Card.propTypes = {
  card: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  streakCard: PropTypes.number,
  consecutiveMatches: PropTypes.number,
};

export default Card;
