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

    it('should handle new lines between numbers', () => {
      expect(calculator.add('1\n2,3')).toBe(6);
      expect(calculator.add('1,2\n3')).toBe(6);
      expect(calculator.add('1\n2\n3')).toBe(6);
    });

    it('should support custom delimiters', () => {
      expect(calculator.add('//;\n1;2')).toBe(3);
      expect(calculator.add('//|\n1|2|3')).toBe(6);
      expect(calculator.add('//.\n1.2.3')).toBe(6);
    });

    it('should maintain existing functionality with custom delimiters', () => {
      expect(calculator.add('//;\n1;2\n3')).toBe(6);
      expect(calculator.add('//|\n1|2,3')).toBe(6);
    });

    it('should throw exception for negative numbers', () => {
      expect(() => calculator.add('-1')).toThrow('negatives not allowed - -1');
      expect(() => calculator.add('1,-2')).toThrow('negatives not allowed - -2');
      expect(() => calculator.add('-1,-2')).toThrow('negatives not allowed - -1,-2');
      expect(() => calculator.add('//;\n1;-2')).toThrow('negatives not allowed - -2');
    });

    it('should ignore numbers bigger than 1000', () => {
      expect(calculator.add('2,1001')).toBe(2);
      expect(calculator.add('2,1000')).toBe(1002);
      expect(calculator.add('1,2,1001,3')).toBe(6);
      expect(calculator.add('1001,1002,1003')).toBe(0);
      expect(calculator.add('//;\n1;1001;2')).toBe(3);
    });
  });

  describe('getCalledCount', () => {
    it('should return 0 when no add calls have been made', () => {
      expect(calculator.getCalledCount()).toBe(0);
    });

    it('should return the number of times add was called', () => {
      calculator.add('1,2');
      expect(calculator.getCalledCount()).toBe(1);

      calculator.add('3,4');
      expect(calculator.getCalledCount()).toBe(2);

      calculator.add('5,6');
      expect(calculator.getCalledCount()).toBe(3);
    });

    it('should count failed add calls', () => {
      try {
        calculator.add('-1');
      } catch (error) {
        // Expected error
      }
      expect(calculator.getCalledCount()).toBe(1);
    });
  });
}); 
