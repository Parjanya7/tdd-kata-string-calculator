import { NegativesNotAllowedException } from './exceptions';

export const validateNumbers = (numbers: number[]): void => {
    const negatives = numbers.filter(n => n < 0);
    if (negatives.length > 0) {
        throw new NegativesNotAllowedException(negatives);
    }
}; 