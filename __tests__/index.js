import testFunc	from '../src';

describe ('Testing test', () => {
	it('Test import', () => {
		expect(testFunc(3)).toBe(3);
	})
});
