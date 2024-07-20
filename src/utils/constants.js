/**
 * @constant {string[]} CARD_ELEMENTS
 * Array of emoji characters used as card faces in the memory game.
 * These emojis represent various food items.
 */
export const CARD_ELEMENTS = [
  '🍓',
  '🍉',
  '🍌',
  '🍏',
  '🥝',
  '🍇',
  '🍄',
  '🍋',
  '🥑',
  '🍆',
  '🌽',
  '🫑',
  '🥒',
  '🥬',
  '🥦',
  '🧄',
  '🫘',
  '🌰',
  '🫛',
  '🍄‍🟫',
  '🫓',
  '🧀',
  '🍖',
  '🍗',
  '🥩',
  '🍔',
  '🍟',
  '🍕',
  '🌮',
  '🌯',
  '🥙',
  '🧆',
  '🥚',
  '🍳',
  '🥘',
  '🍲',
  '🫕',
  '🥣',
  '🥗',
  '🍿',
  '🧈',
  '🧂',
  '🥫',
];

/**
 * @constant {number} CARDS_AMOUNT
 * The total number of cards in the game.
 */
export const CARDS_AMOUNT = 12;

/**
 * @constant {number} MATCH_SCORE
 * The base score awarded for matching a pair of cards.
 */
export const MATCH_SCORE = 10;

/**
 * @constant {number} CONSECUTIVE_MATCH_BONUS
 * The bonus score awarded for each consecutive match.
 */
export const CONSECUTIVE_MATCH_BONUS = 5;

/**
 * @constant {number} TIME_BONUS_FACTOR
 * The factor used to calculate time-based bonus points.
 */
export const TIME_BONUS_FACTOR = 5;

/**
 * @constant {number} CARD_FLIP_TIMEOUT_MS
 * The duration in milliseconds for which all cards are shown at the start of the game.
 */
export const CARD_FLIP_TIMEOUT_MS = 750;

/**
 * @constant {number} GAME_DURATION_MS
 * The total duration of the game in milliseconds.
 */
export const GAME_DURATION_MS = 2000;
