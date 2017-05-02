import testFunc from '../src';

describe ('Testing test', () => {
	it ('True test', () => {
		expect(2).toBe(2);
	});

	it('Test import', () => {
		expect(testFunc()).toBe(undefined);
	})
});
