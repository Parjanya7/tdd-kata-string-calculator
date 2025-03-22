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
  });
}); 