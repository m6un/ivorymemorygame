import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage screen wake lock
 * @returns {Object} An object containing the wake lock state and functions to request and release it
 */
const useWakeLock = () => {
  const [wakeLock, setWakeLock] = useState(null);

  /**
   * Request a wake lock
   */
  const requestWakeLock = useCallback(async () => {
    if ('wakeLock' in navigator) {
      try {
        const lock = await navigator.wakeLock.request('screen');
        setWakeLock(lock);
      } catch (err) {
        console.error(`Failed to request wake lock: ${err.name}, ${err.message}`);
      }
    } else {
      console.log('Wake Lock API not supported in this browser.');
    }
  }, []);

  /**
   * Release the current wake lock
   */
  const releaseWakeLock = useCallback(async () => {
    if (wakeLock) {
      try {
        await wakeLock.release();
        setWakeLock(null);
      } catch (err) {
        console.error(`Failed to release wake lock: ${err.name}, ${err.message}`);
      }
    }
  }, [wakeLock]);

  /**
   * Clean up the wake lock on component unmount
   */
  useEffect(() => {
    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, [wakeLock]);

  return { wakeLock, requestWakeLock, releaseWakeLock };
};

export default useWakeLock;
