/**
 * @fileoverview Main App component for the Memory Game application
 * @module App
 */

import { lazy, Suspense, useState, useEffect } from 'react';
import Loader from './components/Loader';

// Lazy load the MemoryGame component for better performance
const MemoryGame = lazy(() => import('./Pages/MemoryGame'));

/**
 * App component
 * @function App
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  // State to control the visibility of the loader
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Set a timer to show the loader if content hasn't loaded within 500ms
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={showLoader ? <Loader /> : null}>
      <MemoryGame />
    </Suspense>
  );
}

export default App;
