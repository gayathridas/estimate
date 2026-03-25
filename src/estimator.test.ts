import { describe, it, expect } from 'vitest';
import { generateEstimate, formatUSD } from './estimator';

describe('Estimator Logic', () => {
  describe('generateEstimate', () => {
    const idea = 'A simple task tracker';

    it('should calculate costs correctly for simple complexity', () => {
      const result = generateEstimate(idea, 'simple');
      
      expect(result.idea).toBe(idea);
      expect(result.complexity).toBe('simple');
      expect(result.categories.length).toBeGreaterThan(0);
      
      // Multiplier for simple is 0.5
      // UI/UX base is 2000-5000 -> simple should be 1000-2500
      const uiUx = result.categories.find(c => c.name === 'UI / UX Design');
      expect(uiUx?.minCost).toBe(1000);
      expect(uiUx?.maxCost).toBe(2500);
    });

    it('should calculate costs correctly for medium complexity', () => {
      const result = generateEstimate(idea, 'medium');
      
      expect(result.complexity).toBe('medium');
      
      // Multiplier for medium is 1.0
      const uiUx = result.categories.find(c => c.name === 'UI / UX Design');
      expect(uiUx?.minCost).toBe(2000);
      expect(uiUx?.maxCost).toBe(5000);
    });

    it('should calculate costs correctly for complex complexity', () => {
      const result = generateEstimate(idea, 'complex');
      
      expect(result.complexity).toBe('complex');
      
      // Multiplier for complex is 2.2
      // UI/UX base is 2000-5000 -> complex should be 4400-11000
      const uiUx = result.categories.find(c => c.name === 'UI / UX Design');
      expect(uiUx?.minCost).toBe(4400);
      expect(uiUx?.maxCost).toBe(11000);
    });

    it('should have total costs equal to the sum of category costs', () => {
      const result = generateEstimate(idea, 'medium');
      const sumMin = result.categories.reduce((sum, c) => sum + c.minCost, 0);
      const sumMax = result.categories.reduce((sum, c) => sum + c.maxCost, 0);
      
      expect(result.totalMin).toBe(sumMin);
      expect(result.totalMax).toBe(sumMax);
    });
  });

  describe('formatUSD', () => {
    it('should format numbers as USD currency strings', () => {
      expect(formatUSD(1000)).toBe('$1,000');
      expect(formatUSD(50000)).toBe('$50,000');
      expect(formatUSD(0)).toBe('$0');
    });
  });
});
