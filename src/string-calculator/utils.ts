import { DelimiterInfo } from './types';
import { validateNumbers } from './validators';

const MAX_ALLOWED_NUMBER = 1000;

const extractDelimiterInfo = (input: string): DelimiterInfo => {
    const hasCustomDelimiter = input.startsWith('//');
    
    if (!hasCustomDelimiter) {
        return { delimiter: '[,\n]', numbers: input };
    }
    
    const firstNewLine = input.indexOf('\n');
    return {
        delimiter: input.substring(2, firstNewLine),
        numbers: input.substring(firstNewLine + 1)
    };
};

const createDelimiterRegex = (delimiter: string): RegExp =>
    new RegExp(delimiter === '[,\n]' ? delimiter : `[,\n${delimiter}]`);

const filterLargeNumbers = (numbers: number[]): number[] =>
    numbers.filter(n => n <= MAX_ALLOWED_NUMBER);

export const parseNumbers = (input: string): number[] => {
    if (input === '') return [];
    
    const { delimiter, numbers } = extractDelimiterInfo(input);
    const parsedNumbers = numbers
        .split(createDelimiterRegex(delimiter))
        .map(Number);
    
    validateNumbers(parsedNumbers);
    return filterLargeNumbers(parsedNumbers);
};

export const sum = (numbers: number[]): number => 
    numbers.reduce((acc, curr) => acc + curr, 0);
