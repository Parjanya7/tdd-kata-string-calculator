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

    it('should handle new lines between numbers', () => {
        expect(calculator.add('1\n2,3')).toBe(6);
        expect(calculator.add('1\n2\n3')).toBe(6);
        expect(calculator.add('1,2\n3,4\n5')).toBe(15);
    });

    it('should support custom delimiters', () => {
        expect(calculator.add('//;\n1;2')).toBe(3);
        expect(calculator.add('//:\n1:2:3')).toBe(6);
        expect(calculator.add('//|\n1|2|3')).toBe(6);
        expect(calculator.add('//sep\n1sep2sep3')).toBe(6);
    });

    it('should throw exception for negative numbers', () => {
        expect(() => calculator.add('-1,2')).toThrow('negatives not allowed: -1');
        expect(() => calculator.add('2,-4,3,-5')).toThrow('negatives not allowed: -4, -5');
        expect(() => calculator.add('-1,-2,-3')).toThrow('negatives not allowed: -1, -2, -3');
    });

    it('should throw exception with custom delimiters and multiple negative numbers', () => {
        expect(() => calculator.add('//;\n-1;-2;3')).toThrow('negatives not allowed: -1, -2');
        expect(() => calculator.add('//|\n1|-2|-3|-4')).toThrow('negatives not allowed: -2, -3, -4');
    });

    it('should ignore numbers bigger than 1000', () => {
        expect(calculator.add('2,1001')).toBe(2);
        expect(calculator.add('1000,1001,2')).toBe(1002);
        expect(calculator.add('1,2000,2')).toBe(3);
        expect(calculator.add('//;\n1;1001;2')).toBe(3);
    });

    it('should support delimiters of any length', () => {
        expect(calculator.add('//[***]\n1***2***3')).toBe(6);
        expect(calculator.add('//[delimiter]\n1delimiter2delimiter3')).toBe(6);
        expect(calculator.add('//[##]\n1##2##3')).toBe(6);
        expect(calculator.add('//[....]\n1....2....3')).toBe(6);
    });

    describe('GetCalledCount', () => {
        let calculator: StringCalculator;

        beforeEach(() => {
            calculator = new StringCalculator();
        });

        it('should return number of times add was called', () => {
            expect(calculator.getCalledCount()).toBe(0);
            
            calculator.add('1,2');
            expect(calculator.getCalledCount()).toBe(1);
            
            calculator.add('2,3');
            calculator.add('1');
            expect(calculator.getCalledCount()).toBe(3);
        });

        it('should maintain count across different operations', () => {
            calculator.add('1,2');
            calculator.add('//;\n1;2');
            calculator.add('1\n2,3');
            
            expect(calculator.getCalledCount()).toBe(3);
        });
    });

    describe('AddOccurred Event', () => {
        let calculator: StringCalculator;

        beforeEach(() => {
            calculator = new StringCalculator();
        });

        it('should trigger event after add is called', () => {
            let givenInput: string | null = null;
            let givenResult: number | null = null;

            calculator.addAddOccurredListener((input, result) => {
                givenInput = input;
                givenResult = result;
            });

            calculator.add('1,2');

            expect(givenInput).toBe('1,2');
            expect(givenResult).toBe(3);
        });

        it('should trigger event multiple times', () => {
            const calls: Array<[string, number]> = [];

            calculator.addAddOccurredListener((input, result) => {
                calls.push([input, result]);
            });

            calculator.add('1,2');
            calculator.add('3,4');

            expect(calls).toEqual([
                ['1,2', 3],
                ['3,4', 7]
            ]);
        });

        it('should support multiple listeners', () => {
            const calls1: Array<[string, number]> = [];
            const calls2: Array<[string, number]> = [];

            calculator.addAddOccurredListener((input, result) => {
                calls1.push([input, result]);
            });
            calculator.addAddOccurredListener((input, result) => {
                calls2.push([input, result]);
            });

            calculator.add('1,2');

            expect(calls1).toEqual([['1,2', 3]]);
            expect(calls2).toEqual([['1,2', 3]]);
        });
    });
});
