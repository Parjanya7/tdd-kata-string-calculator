import { sum } from './utils';

export class StringCalculator {
    public add(numbers: string): number {
        if (numbers === '') return 0;
        
        const nums = numbers.split(',').map(Number);
        return sum(nums);
    }
}
