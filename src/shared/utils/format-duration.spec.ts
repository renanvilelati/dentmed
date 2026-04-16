import { formatDuration } from './format-duration';

describe('formatDuration (unit)', () => {
  it('should format zero minutes correctly', () => {
    expect(formatDuration(0)).toBe('00:00');
  });

  it('should format minutes less than one hour', () => {
    expect(formatDuration(30)).toBe('00:30');
  });

  it('should format exactly one hour', () => {
    expect(formatDuration(60)).toBe('01:00');
  });

  it('should format hours and minutes correctly', () => {
    expect(formatDuration(90)).toBe('01:30');
  });

  it('should format multiple hours correctly', () => {
    expect(formatDuration(150)).toBe('02:30');
  });

  it('should format large durations correctly', () => {
    expect(formatDuration(1440)).toBe('24:00');
  });
});
