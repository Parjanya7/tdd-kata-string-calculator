import { StringCalculator } from '../../src/string-calculator/StringCalculator';

describe('StringCalculator', () => {
    let calculator: StringCalculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    it('should return 0 for empty string', () => {
        expect(calculator.add('')).toBe(0);
    });

    it('should return number for single number string', () => {
        expect(calculator.add('1')).toBe(1);
    });

    it('should return sum for two numbers separated by comma', () => {
        expect(calculator.add('1,2')).toBe(3);
    });
});
