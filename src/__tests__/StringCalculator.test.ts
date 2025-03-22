import { StringCalculator } from '../StringCalculator';

describe('StringCalculator', () => {
  let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  describe('add', () => {
    it('should return 0 for an empty string', () => {
      expect(calculator.add('')).toBe(0);
    });

    it('should return the number for a single number input', () => {
      expect(calculator.add('1')).toBe(1);
    });

    it('should return the sum of two numbers', () => {
      expect(calculator.add('1,2')).toBe(3);
    });
  });
}); 
