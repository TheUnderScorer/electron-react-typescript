import { sum } from './math';

describe('sum', () => {
    it('should sum two numbers', () => {
        expect(sum(2, 2)).toBe(4);
    });
});
