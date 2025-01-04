# String Calculator TDD Kata

A Test-Driven Development exercise implementing a string calculator that follows the kata rules.

## Description
This project demonstrates Test-Driven Development (TDD) principles through implementing a string calculator. The calculator handles various input formats including custom delimiters, multiple delimiters, and follows specific rules for number handling.

## Reference Link
[Original Kata by Roy Osherove](https://osherove.com/tdd-kata-1/)

## Repository
[TDD Kata String Calculator](https://github.com/Parjanya7/tdd-kata-string-calculator)

## Steps to Run the Project
1. Clone the repository
```bash
git clone https://github.com/Parjanya7/tdd-kata-string-calculator.git
```
2. Install dependencies 
```bash
npm install
```
3. Run the tests
```bash
npm test
```


## Problem Statements & Implementation
The kata was implemented following these incremental requirements:

1. Create a simple String calculator with a method `add(numbers: string): number`
   - Empty string returns 0
   - Single number returns the number
   - Two numbers returns their sum

2. Allow the add method to handle an unknown amount of numbers

3. Allow the add method to handle new lines between numbers (instead of commas)
   - Example: "1\n2,3" returns 6

4. Support different delimiters
   - Format: "//[delimiter]\n[numbers]"
   - Example: "//;\n1;2" returns 3

5. Calling add with negative numbers throws an exception
   - Message includes all negative numbers found
   - Example: "-1,2" throws "negatives not allowed: -1"

6. Numbers bigger than 1000 should be ignored
   - Example: "2,1001" returns 2

7. Delimiters can be of any length
   - Format: "//[delimiter]\n"
   - Example: "//[***]\n1***2***3" returns 6

8. Allow multiple delimiters
   - Format: "//[delim1][delim2]\n"
   - Example: "//[*][%]\n1*2%3" returns 6

9. Handle multiple delimiters with length longer than one char
   - Example: "//[**][%%]\n1**2%%3" returns 6

10. Added GetCalledCount() method to track add() invocations

11. Implemented AddOccurred event that triggers after each add() call

## Key Features
- Functional core with OOP wrapper
- Event system for operation notifications
- Comprehensive test coverage
- Clean code principles
- TypeScript type safety
