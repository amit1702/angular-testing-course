import {LoggerService} from './logger.service';
import {CalculatorService} from './calculator.service';

describe('CalculatorService', () => {
  it('should add 2 numbers', () => {
    const logger = jasmine.createSpyObj('LoggerService', ['log']);
    const calculator = new CalculatorService(logger);
    expect(calculator.add(2, 2)).toBe(4, 'Unexpected addition result');
    expect(logger.log).toHaveBeenCalledTimes(1);
  });
  it('should subtract 2 numbers', () => {
    const calculator = new CalculatorService(new LoggerService());
    expect(calculator.subtract(2, 2)).toBe(0, 'Unexpected subtraction result');
  });
});
