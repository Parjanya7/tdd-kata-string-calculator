import { DelimiterInfo } from './types';
import { validateNumbers } from './validators';
import { MAX_ALLOWED_NUMBER } from './constants';

const extractDelimiters = (delimiterSection: string): string[] => {
    if (!delimiterSection.startsWith('[')) {
        return [delimiterSection];
    }

    const delimiters: string[] = [];
    let currentDelimiter = '';
    let isInBrackets = false;

    for (const char of delimiterSection) {
        if (char === '[') {
            isInBrackets = true;
            continue;
        }
        if (char === ']') {
            isInBrackets = false;
            if (currentDelimiter) {
                delimiters.push(currentDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                currentDelimiter = '';
            }
            continue;
        }
        if (isInBrackets) {
            currentDelimiter += char;
        }
    }

    return delimiters;
};

const extractDelimiterInfo = (input: string): DelimiterInfo => {
    const hasCustomDelimiter = input.startsWith('//');
    
    if (!hasCustomDelimiter) {
        return { delimiter: '[,\n]', numbers: input };
    }
    
    const firstNewLine = input.indexOf('\n');
    const delimiterSection = input.substring(2, firstNewLine);
    
    if (!delimiterSection.startsWith('[')) {
        return {
            delimiter: delimiterSection.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            numbers: input.substring(firstNewLine + 1)
        };
    }
    
    const delimiters = extractDelimiters(delimiterSection);
    return {
        delimiter: delimiters.join('|'),
        numbers: input.substring(firstNewLine + 1)
    };
};

const createDelimiterRegex = (delimiter: string): RegExp => {
    if (delimiter === '[,\n]') return new RegExp(delimiter);
    
    return new RegExp(`[,\n]|${delimiter}`);
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
