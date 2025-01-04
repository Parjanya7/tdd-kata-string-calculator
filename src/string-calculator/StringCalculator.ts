import { sum, parseNumbers } from './utils';
import { AddOccurredCallback } from './types';

export class StringCalculator {
    private calledCount: number = 0;
    private addOccurredListeners: AddOccurredCallback[] = [];

    public addAddOccurredListener(listener: AddOccurredCallback): void {
        this.addOccurredListeners.push(listener);
    }

    public add(numbers: string): number {
        this.calledCount++;
        const result = numbers === '' ? 0 : sum(parseNumbers(numbers));
        
        this.addOccurredListeners.forEach(listener => 
            listener(numbers, result)
        );
        
        return result;
    }

    public getCalledCount(): number {
        return this.calledCount;
    }
}
