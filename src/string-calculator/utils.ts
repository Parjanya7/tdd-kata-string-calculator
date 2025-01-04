import { DelimiterInfo } from './types';

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

export const parseNumbers = (input: string): number[] => {
    if (input === '') return [];
    
    const { delimiter, numbers } = extractDelimiterInfo(input);
    return numbers
        .split(createDelimiterRegex(delimiter))
        .map(Number);
};

export const sum = (numbers: number[]): number => 
    numbers.reduce((acc, curr) => acc + curr, 0);
