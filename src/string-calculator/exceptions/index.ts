export class NegativesNotAllowedException extends Error {
    constructor(negatives: number[]) {
        super(`negatives not allowed: ${negatives.join(', ')}`);
        this.name = 'NegativesNotAllowedException';
    }
} 