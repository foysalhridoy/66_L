export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
  totalRemainingMs: number;
}

/**
 * Calculates time remaining until target ISO timestamp.
 */
export function getCountdown(targetIsoDate: string): CountdownResult {
  const targetTime = targetIsoDate.includes('T')
    ? new Date(targetIsoDate).getTime()
    : new Date(`${targetIsoDate}T23:59:59+06:00`).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPassed: true,
      totalRemainingMs: diff,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    isPassed: false,
    totalRemainingMs: diff,
  };
}

/**
 * Formats a deadline timestamp into a human-readable string in Bangladesh time (Asia/Dhaka).
 * If hasExactTime is false, displays only the date without inventing a time.
 */
export function formatDeadlineDisplay(
  isoDate: string | null,
  hasExactTime: boolean,
  customLabel?: string
): string {
  if (!isoDate) {
    return customLabel || 'Deadline Not Announced';
  }

  if (!hasExactTime) {
    // Treat as YYYY-MM-DD
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const year = parseInt(parts[0], 10);
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${day} ${monthNames[monthIndex]} ${year}`;
    }
    return customLabel || isoDate;
  }

  try {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Dhaka',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date) + ' (BST)';
  } catch {
    return customLabel || isoDate;
  }
}

/**
 * Returns current formatted time in Asia/Dhaka.
 */
export function getCurrentDhakaTime(): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date());
  } catch {
    return new Date().toLocaleString();
  }
}
