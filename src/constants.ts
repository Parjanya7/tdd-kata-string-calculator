/**
 * Regular expression patterns for the StringCalculator
 */
export const StringCalculatorPatterns = {
  /**
   * Pattern to detect custom delimiter format
   * ^ - Start of string
   * \/\/ - Matches literal "//"
   * (.+) - Captures one or more characters (the delimiter)
   * \n - Matches newline character
   */
  CUSTOM_DELIMITER: /^\/\/(.+)\n/,

  /**
   * Default delimiters for number separation
   * Matches either comma or newline
   */
  DEFAULT_DELIMITERS: /[,\n]/,

  /**
   * Maximum number to be included in the sum
   * Numbers greater than this will be ignored
   */
  MAX_NUMBER: 1000
} as const; 