import { StringCalculatorPatterns } from './constants';

export class StringCalculator {
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

  public add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    const { delimiter, numbers: numbersToProcess } = this.parseDelimiterAndNumbers(numbers);
    const numberArray = numbersToProcess.split(delimiter);
    return numberArray.reduce((sum, num) => sum + parseInt(num, 10), 0);
  }
}