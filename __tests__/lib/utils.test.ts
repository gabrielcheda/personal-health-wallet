import {
  cn,
  formatDate,
  formatDateTime,
  formatCurrency,
  calculateAge,
  getStatusColor,
} from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'active', false && 'inactive')).toBe('base active');
    });

    it('should override conflicting Tailwind classes', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4');
    });

    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
    });

    it('should handle undefined and null', () => {
      expect(cn('base', undefined, null, 'extra')).toBe('base extra');
    });
  });

  describe('formatDate', () => {
    it('should format date in Brazilian format', () => {
      const date = new Date('2024-10-15');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should handle different dates', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-12-31');

      expect(formatDate(date1)).toBeTruthy();
      expect(formatDate(date2)).toBeTruthy();
      expect(formatDate(date1)).not.toBe(formatDate(date2));
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time in Brazilian format', () => {
      const date = new Date('2024-10-15T14:30:00');
      const formatted = formatDateTime(date);
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
      expect(formatted).toMatch(/\d{2}:\d{2}/);
    });

    it('should include time information', () => {
      const date = new Date('2024-10-15T14:30:00');
      const formatted = formatDateTime(date);
      expect(formatted.length).toBeGreaterThan(formatDate(date).length);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency in Brazilian Real', () => {
      expect(formatCurrency(1000)).toContain('R$');
    });

    it('should handle decimal values', () => {
      const formatted = formatCurrency(1234.56);
      expect(formatted).toContain('1');
      expect(formatted).toContain('234');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toContain('R$');
      expect(formatCurrency(0)).toContain('0');
    });

    it('should handle negative values', () => {
      const formatted = formatCurrency(-100);
      expect(formatted).toContain('R$');
      expect(formatted).toContain('100');
    });
  });

  describe('calculateAge', () => {
    beforeEach(() => {
      // Mock current date to 2024-10-15
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-10-15'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should calculate age correctly', () => {
      const birthDate = new Date('1990-01-01');
      expect(calculateAge(birthDate)).toBe(34);
    });

    it('should handle birthday not yet occurred this year', () => {
      const birthDate = new Date('1990-11-01');
      expect(calculateAge(birthDate)).toBe(33);
    });

    it('should handle birthday on same month', () => {
      const birthDate = new Date('1990-10-10');
      expect(calculateAge(birthDate)).toBe(34);
    });

    it('should handle birthday after current date in month', () => {
      const birthDate = new Date('1990-10-20');
      expect(calculateAge(birthDate)).toBe(33);
    });

    it('should return 0 for birth date this year', () => {
      const birthDate = new Date('2024-01-01');
      expect(calculateAge(birthDate)).toBe(0);
    });
  });

  describe('getStatusColor', () => {
    it('should return correct color for normal status', () => {
      expect(getStatusColor('normal')).toContain('success');
    });

    it('should return correct color for high status', () => {
      expect(getStatusColor('high')).toContain('warning');
    });

    it('should return correct color for low status', () => {
      expect(getStatusColor('low')).toContain('warning');
    });

    it('should return correct color for critical status', () => {
      expect(getStatusColor('critical')).toContain('danger');
    });

    it('should return correct color for active status', () => {
      expect(getStatusColor('active')).toContain('success');
    });

    it('should return correct color for completed status', () => {
      expect(getStatusColor('completed')).toContain('gray');
    });

    it('should return correct color for suspended status', () => {
      expect(getStatusColor('suspended')).toContain('danger');
    });

    it('should return default color for unknown status', () => {
      expect(getStatusColor('unknown')).toContain('gray');
    });

    it('should handle empty string', () => {
      expect(getStatusColor('')).toBeTruthy();
    });
  });
});
