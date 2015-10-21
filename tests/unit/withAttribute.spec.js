define(['jquery', 'js/withAttribute'], function withAttributeSpec($, TestObject) {

    describe('withAttribute Spec', function() {

        var testObject;

        beforeEach(function() {
            testObject= new TestObject();
        });

        it ('should make ajax request on fetchAttribute()', function() {
            spyOn($, 'ajax').and.callFake(okResponse);
            var callback= jasmine.createSpy();

            testObject.fetchAttribute(callback);
            expect($.ajax.calls.mostRecent().args[0].url).toEqual('my/example/service');
            expect(callback).toHaveBeenCalledWith('foo');
        });

        it ('should make ajax request with empty cache on cacheAttribute()', function() {
            spyOn($, 'ajax').and.callFake(okResponse);
            var callback= jasmine.createSpy();
            
            testObject.cacheAttribute({}, callback);
            expect($.ajax.calls.mostRecent().args[0].url).toEqual('my/example/service');
            expect(callback).toHaveBeenCalledWith('foo');
        });

        it ('should make cacne nonempty with empty cache on cacheAttribute()', function() {
            spyOn($, 'ajax').and.callFake(okResponse);
            var callback= jasmine.createSpy();
            var cache= {};

            testObject.cacheAttribute(cache, callback);
            expect(cache.attribute).toBe('foo');
        });

        it ('should use cache and not use ajax with nonempty cache on cacheAttribute()', function() { 
            spyOn($, 'ajax').and.callFake(okResponse);
            var callback= jasmine.createSpy();
            
            testObject.cacheAttribute({
                attribute: 'foo'
            }, callback);
            expect($.ajax.calls.count()).toEqual(0);
            expect(callback).toHaveBeenCalledWith('foo');
        });

        it ('should make ajax request on first withAttribute()', function() {
            spyOn($, 'ajax').and.callFake(okResponse);
            var callback= jasmine.createSpy();

            testObject.withAttribute(callback);
            expect($.ajax.calls.mostRecent().args[0].url).toEqual('my/example/service');
            expect(callback).toHaveBeenCalledWith('foo');
        });

        it ('should make ajax request on first withAttribute(), but not on second', function() {
            spyOn($, 'ajax').and.callFake(okResponse);
            var callback= jasmine.createSpy();

            testObject.withAttribute(callback);
            expect(callback).toHaveBeenCalledWith('foo');
            
            testObject.withAttribute(callback);
            expect(callback).toHaveBeenCalledWith('foo');
            expect($.ajax.calls.mostRecent().args[0].url).toEqual('my/example/service');
            expect($.ajax.calls.count()).toEqual(1);
        });

    });

    function okResponse() {
        var d= $.Deferred();
        d.resolve('foo');
        return d.promise();
    }

});
