import {LoggerService} from './logger.service';
import {CalculatorService} from './calculator.service';

describe('CalculatorService', () => {
  it('should add 2 numbers', () => {
    const calculator = new CalculatorService(new LoggerService());
    expect(calculator.add(2, 2)).toBe(4, 'Unexpected addition result');
  });
  it('should subtract 2 numbers', () => {
    const calculator = new CalculatorService(new LoggerService());
    expect(calculator.subtract(2, 2)).toBe(0, 'Unexpected subtraction result');
  });
});
