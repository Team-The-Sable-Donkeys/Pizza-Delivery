import { MyCurrencyPipe } from './mycurrency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new MyCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
