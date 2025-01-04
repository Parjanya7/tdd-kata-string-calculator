import { sum, parseNumbers } from './utils';

export class StringCalculator {
    private calledCount: number = 0;

    public add(numbers: string): number {
        this.calledCount++;
        if (numbers === '') return 0;
        return sum(parseNumbers(numbers));
    }

    public getCalledCount(): number {
        return this.calledCount;
    }
}
