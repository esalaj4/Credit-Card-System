import { ExpirationDatePipe } from './expiration-date.pipe';

describe('ExpirationDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ExpirationDatePipe();
    expect(pipe).toBeTruthy();
  });
});
