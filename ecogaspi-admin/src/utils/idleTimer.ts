import { authService } from '../services/authService';

class IdleTimer {
  private timeoutDuration: number; // Duration in milliseconds
  private timeoutId: NodeJS.Timeout | null = null;
  private events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'wheel'];
  private onTimeoutCallback: (() => void) | null = null;

  constructor(timeoutDuration: number = 30 * 60 * 1000) { // Default to 30 minutes
    this.timeoutDuration = timeoutDuration;
  }

  /**
   * Start the idle timer
   */
  start = (onTimeout: () => void): void => {
    this.onTimeoutCallback = onTimeout;
    this.resetTimer();
    this.addEventListener();
  };

  /**
   * Stop the idle timer
   */
  stop = (): void => {
    this.removeEventListener();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  };

  /**
   * Reset the idle timer
   */
  resetTimer = (): void => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      if (this.onTimeoutCallback) {
        this.onTimeoutCallback();
      }
    }, this.timeoutDuration);
  };

  /**
   * Add event listeners to reset the timer on user activity
   */
  private addEventListener = (): void => {
    this.events.forEach(event => {
      document.addEventListener(event, this.resetTimer, true);
    });
  };

  /**
   * Remove event listeners
   */
  private removeEventListener = (): void => {
    this.events.forEach(event => {
      document.removeEventListener(event, this.resetTimer, true);
    });
  };
}

export const idleTimer = new IdleTimer();