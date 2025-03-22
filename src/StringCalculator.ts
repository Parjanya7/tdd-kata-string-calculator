export class StringCalculator {
  public add(numbers: string): number {
    if (!numbers) {
      return 0;
    }
    return parseInt(numbers, 10);
  }
} 
