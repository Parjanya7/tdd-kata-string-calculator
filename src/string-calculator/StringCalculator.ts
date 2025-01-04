import { sum, parseNumbers } from './utils';

export class StringCalculator {
    public add(numbers: string): number {
        if (numbers === '') return 0;
        return sum(parseNumbers(numbers));
    }
}
