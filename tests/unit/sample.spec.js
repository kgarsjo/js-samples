define(['js/sample'], function sampleSpec(sample) {

	describe('Sample spec', function() {
		
		it ('should return "bar" on foo()', function() {
			expect(sample.foo()).toEqual('bar');
		});

	});

});
