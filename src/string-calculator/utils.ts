export const sum = (numbers: number[]): number => 
    numbers.reduce((acc, curr) => acc + curr, 0);

export const parseNumbers = (input: string): number[] =>
    input === '' ? [] : input.split(/[,\n]/).map(Number);
