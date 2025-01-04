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

    it('should return sum for multiple numbers separated by comma', () => {
        expect(calculator.add('1,2,3,4,5')).toBe(15);
        expect(calculator.add('10,20,30,40')).toBe(100);
        expect(calculator.add('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15')).toBe(120);
    });
});
