# React Memory Game

## Overview

This mobile-friendly memory card matching game is built with React.js, offering an engaging and challenging experience for players. Optimized for mobile browsers and packaged as a native Android application, it combines classic gameplay with modern web technologies.

## 📀 Play Online

You can play the game online without any installation:

👉 <a href="https://memorygame.chandrxn.me" target="_blank" rel="noopener noreferrer">Click here to play Memory Game</a>

## 🌟 Key Features

### Gameplay
- 🃏 Card Matching: Find pairs among a grid of face-down cards
- 🧠 Memory Challenge: Test and enhance cognitive skills
- 🔀 Dynamic Card Layout: Randomized card placement for each game

### Technical Highlights
- ⚛️ React.js Single Page Application (SPA)
- 📱 Responsive design for all devices
- 🚀 Performance-optimized for mobile
- 🔄 Efficient state management with React Hooks
- 🎨 Sleek, intuitive user interface

### Enhanced Gameplay Elements
- 🏆 Score Tracking: Monitor moves or time
-   Streak for getting cards correct on the trot
-   Score calculation by considering streak + time taken to complete
- 🔊 Audio Feedback: Sound effects for actions (optional)

## 🛠️ Technical Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite JS
- **Native Conversion**: Capacitor

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-memory-game.git
   cd react-memory-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 🏗️ Building for Production

1. Create an optimized production build:
   ```bash
   npm run build
   ```

2. The build artifacts will be stored in the `build/` directory.

3. To serve the production build locally:
   ```bash
   npx serve -s build
   ```

## 📱 Creating the Android APK

We use Capacitor to convert the React app into a native Android application.

1. Add Capacitor to your project:
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   ```

2. Add the Android platform:
   ```bash
   npm install @capacitor/android
   npx cap add android
   ```

3. Build your React app:
   ```bash
   npm run build
   ```

4. Copy web assets to the native project:
   ```bash
   npx cap sync
   ```

5. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```

6. Use Android Studio to build and generate the APK.

## 🎮 How to Play

1. Start a new game by clicking the "New Game" button.
2. Flip cards by clicking on them.
3. Find matching pairs to remove them from the board.
4. The game ends when all pairs are matched.

## 🔮 Future Enhancements

- 👥 Multiplayer mode
- 🏅 Global leaderboard
- 🎨 Custom themes and card designs
- ✨ Advanced animations






