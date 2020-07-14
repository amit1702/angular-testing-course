import {LoggerService} from './logger.service';
import {CalculatorService} from './calculator.service';
import {TestBed} from '@angular/core/testing';

describe('CalculatorService', () => {
  let loggerSpy: any;
  let calculator: CalculatorService;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });
    calculator = TestBed.get(CalculatorService);
  });

  it('should add 2 numbers', () => {
    expect(calculator.add(2, 2)).toBe(4, 'Unexpected addition result');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
  
  it('should subtract 2 numbers', () => {
    expect(calculator.subtract(2, 2)).toBe(0, 'Unexpected subtraction result');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
