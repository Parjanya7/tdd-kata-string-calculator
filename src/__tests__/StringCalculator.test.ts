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

    it('should handle an unknown amount of numbers', () => {
      expect(calculator.add('1,2,3,4,5')).toBe(15);
      expect(calculator.add('10,20,30,40,50')).toBe(150);
      expect(calculator.add('1,2,3,4,5,6,7,8,9,10')).toBe(55);
    });
  });
}); 
