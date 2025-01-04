import { DelimiterInfo } from './types';
import { validateNumbers } from './validators';
import { MAX_ALLOWED_NUMBER } from './constants';

const extractDelimiterInfo = (input: string): DelimiterInfo => {
    const hasCustomDelimiter = input.startsWith('//');
    
    if (!hasCustomDelimiter) {
        return { delimiter: '[,\n]', numbers: input };
    }
    
    const firstNewLine = input.indexOf('\n');
    let delimiter = input.substring(2, firstNewLine);
    
    if (delimiter.startsWith('[') && delimiter.endsWith(']')) {
        delimiter = delimiter.slice(1, -1);
    }
    
    return {
        delimiter: delimiter,
        numbers: input.substring(firstNewLine + 1)
    };
};

const createDelimiterRegex = (delimiter: string): RegExp => {
    if (delimiter === '[,\n]') return new RegExp(delimiter);
    
    const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`[,\n]|${escapedDelimiter}`);
};

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
