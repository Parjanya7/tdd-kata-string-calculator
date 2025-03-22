import { StringCalculatorPatterns } from './constants';

export class StringCalculator {
  private addCallCount: number = 0;

  private parseDelimiterAndNumbers(input: string): { delimiter: RegExp; numbers: string } {
    const delimiterMatch = input.match(StringCalculatorPatterns.CUSTOM_DELIMITER);
    
    if (delimiterMatch) {
      // If custom delimiter is found:
      // 1. Create a regex that includes the custom delimiter along with comma and newline
      // 2. Extract the numbers part by removing the delimiter declaration
      return {
        delimiter: new RegExp(`[${delimiterMatch[1]},\n]`),
        numbers: input.substring(delimiterMatch[0].length)
      };
    }

    // If no custom delimiter, use default delimiters
    return {
      delimiter: StringCalculatorPatterns.DEFAULT_DELIMITERS,
      numbers: input
    };
  }

  private validateNumbers(numbers: string[]): void {
    const negativeNumbers = numbers
      .map(num => parseInt(num, 10))
      .filter(num => num < 0);

    if (negativeNumbers.length > 0) {
      throw new Error(`negatives not allowed - ${negativeNumbers.join(',')}`);
    }
  }

  public add(numbers: string): number {
    this.addCallCount++;
    
    if (!numbers) {
      return 0;
    }

    const { delimiter, numbers: numbersToProcess } = this.parseDelimiterAndNumbers(numbers);
    const numberArray = numbersToProcess.split(delimiter);
    
    this.validateNumbers(numberArray);
    
    return numberArray.reduce((sum, num) => sum + parseInt(num, 10), 0);
  }

  public getCalledCount(): number {
    return this.addCallCount;
  }
}