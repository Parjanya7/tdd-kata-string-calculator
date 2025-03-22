# String Calculator

A TypeScript implementation of a string calculator following Test-Driven Development (TDD) principles. This calculator can add numbers provided in a string format with various delimiter options.

## Features

The calculator supports the following features:

1. **Basic Operations**
   - Empty string returns 0
   - Single number returns the number
   - Two numbers separated by comma returns their sum
   - Unknown amount of numbers returns their sum

2. **Delimiter Support**
   - Default delimiters: comma (,) and newline (\n)
   - Custom single character delimiter: `//;\n1;2`
   - Custom delimiter of any length: `//[***]\n1***2***3`
   - Multiple delimiters: `//[*][%]\n1*2%3`

3. **Number Validation**
   - Throws exception for negative numbers
   - Ignores numbers bigger than 1000

4. **Usage Tracking**
   - Tracks the number of times the `add` method is called

## Examples

```typescript
const calculator = new StringCalculator();

// Basic operations
calculator.add('');           // returns 0
calculator.add('1');          // returns 1
calculator.add('1,2');        // returns 3
calculator.add('1,2,3,4,5');  // returns 15

// Newline support
calculator.add('1\n2,3');     // returns 6
calculator.add('1,2\n3');     // returns 6

// Custom delimiters
calculator.add('//;\n1;2');   // returns 3
calculator.add('//|\n1|2|3'); // returns 6

// Custom delimiter of any length
calculator.add('//[***]\n1***2***3');  // returns 6
calculator.add('//[delimiter]\n1delimiter2delimiter3');  // returns 6

// Multiple delimiters
calculator.add('//[*][%]\n1*2%3');     // returns 6
calculator.add('//[*][%][#]\n1*2%3#4'); // returns 10

// Negative numbers
calculator.add('-1');         // throws "negatives not allowed - -1"
calculator.add('1,-2');       // throws "negatives not allowed - -2"

// Numbers bigger than 1000
calculator.add('2,1001');     // returns 2
calculator.add('2,1000');     // returns 1002

// Usage tracking
calculator.getCalledCount();  // returns the number of times add was called
```

## Project Structure

```
src/
├── __tests__/
│   └── StringCalculator.test.ts  # Test cases
├── StringCalculator.ts           # Main implementation
└── constants.ts                  # Constants and patterns
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```

## Development

This project follows Test-Driven Development (TDD) principles, where tests are written first and then the implementation is developed to make those tests pass. The test suite provides 100% coverage of the codebase.