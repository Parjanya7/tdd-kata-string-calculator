import { StringCalculatorPatterns } from './constants';

export class StringCalculator {
  private addCallCount: number = 0;

  private escapeRegExp(string: string): string {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  private parseDelimiterAndNumbers(input: string): { delimiter: RegExp; numbers: string } {
    // First try to match multiple delimiters pattern
    const multipleDelimitersMatch = input.match(StringCalculatorPatterns.MULTIPLE_DELIMITERS);
    if (multipleDelimitersMatch) {
      // Get all captured delimiters and escape them
      const delimiters = Array.from(multipleDelimitersMatch.slice(1))
        .map(delimiter => this.escapeRegExp(delimiter));
      
      // Create a regex that matches any of the delimiters, comma, or newline
      const delimiterPattern = `(${delimiters.join('|')}|,|\\n)`;
      return {
        delimiter: new RegExp(delimiterPattern),
        numbers: input.substring(multipleDelimitersMatch[0].length)
      };
    }

    // Try the single bracketed delimiter pattern
    const bracketedDelimiterMatch = input.match(StringCalculatorPatterns.CUSTOM_DELIMITER_WITH_BRACKETS);
    if (bracketedDelimiterMatch) {
      const delimiter = bracketedDelimiterMatch[1];
      const escapedDelimiter = this.escapeRegExp(delimiter);
      return {
        delimiter: new RegExp(`${escapedDelimiter}|,|\\n`),
        numbers: input.substring(bracketedDelimiterMatch[0].length)
      };
    }

    // Try the simple delimiter pattern
    const simpleDelimiterMatch = input.match(StringCalculatorPatterns.CUSTOM_DELIMITER);
    if (simpleDelimiterMatch) {
      return {
        delimiter: new RegExp(`[${simpleDelimiterMatch[1]},\n]`),
        numbers: input.substring(simpleDelimiterMatch[0].length)
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

  private filterLargeNumbers(numbers: string[]): number[] {
    return numbers
      .map(num => parseInt(num, 10))
      .filter(num => num <= StringCalculatorPatterns.MAX_NUMBER);
  }

  public add(numbers: string): number {
    this.addCallCount++;
    
    if (!numbers) {
      return 0;
    }

    const { delimiter, numbers: numbersToProcess } = this.parseDelimiterAndNumbers(numbers);
    const numberArray = numbersToProcess.split(delimiter);
    
    this.validateNumbers(numberArray);
    const filteredNumbers = this.filterLargeNumbers(numberArray);
    
    return filteredNumbers.reduce((sum, num) => sum + num, 0);
  }

  public getCalledCount(): number {
    return this.addCallCount;
  }
}