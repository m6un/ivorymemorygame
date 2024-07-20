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
  const [showLoader, setShowLoader] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <Suspense fallback={showLoader ? <Loader /> : null} onLoad={() => setIsLoaded(true)}>
      <MemoryGame />
    </Suspense>
  );
}

export default App;
