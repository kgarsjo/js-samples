define(['js/linkedLists'], function linkedListsSpec(TestObject) {

    describe('Linked lists', function() {
    
        var alwaysSelect= function(value) {
            return true;
        };

        var neverSelect= function(value) {
            return false;
        };

        var toUpper= function(value) {
            return (typeof value === 'string')
                ? value.toUpperCase()
                : value;
        };

        it('Should return a node when calling asNode', function() {
            var expected= 'Hello World';
            var node= TestObject.asNode(expected);

            expect(node).toBeDefined();
            expect(node.value).toBe(expected);
        });

        it('Should return undefined for no arguments on createLinkedList()', function() {
            var actual= TestObject.createLinkedList();
            expect(actual).not.toBeDefined();
        });

        it('Should return single node for one argument on createLinkedList()', function() {
            var expected= 'foo';
            var node= TestObject.createLinkedList(expected);
            expect(node.value).toBe(expected);
            expect(node.next).not.toBeDefined();
        });

        it('Should return linked nodes for multiple arguments on createLinkedList()', function() {
            var head= TestObject.createLinkedList('foo', 'bar', 'baz');
            expect(head.value).toBe('foo');
            expect(head.next.value).toBe('bar');
            expect(head.next.next.value).toBe('baz');
            expect(head.next.next.next).not.toBeDefined();    
        });

        it('Should return undefined on filter() with undefined head', function() {
            var actual= TestObject.filter(undefined, alwaysSelect);
            expect(actual).not.toBeDefined();
        });

        it('Should return undefined on filter() with nonselected single node', function() {
            var head= TestObject.createLinkedList('foo');
            var actual= TestObject.filter(head, neverSelect);
            expect(actual).not.toBeDefined();
        });

        it('Should return head on filter() with selected single node', function() {
            var head= TestObject.createLinkedList('foo');
            var actual= TestObject.filter(head, alwaysSelect);
            expect(actual.value).toBe('foo');
            expect(actual.next).not.toBeDefined();
        });

        it('Should return undefined on filter() with no selected nodes', function() {
            var head= TestObject.createLinkedList('foo, bar');
            var actual= TestObject.filter(head, neverSelect);
            expect(actual).not.toBeDefined();
        });

        it('Should return linked nodes on filter() with all selected nodes', function() {
            var head= TestObject.createLinkedList('foo', 'bar');
            var actual= TestObject.filter(head, alwaysSelect);
            expect(actual.value).toBe('foo');
            expect(actual.next.value).toBe('bar');
            expect(actual.next.next).not.toBeDefined();
        });

        it('Should return filtered linked nodes on filter() with some selected nodes', function() {
            var head= TestObject.createLinkedList('foo', 'bar', 'baz');
            var filterBar= function(value) {
                return value !== 'bar';
            };
            var actual= TestObject.filter(head, filterBar);
            expect(actual.value).toBe('foo');
            expect(actual.next.value).toBe('baz');
            expect(actual.next.next).not.toBeDefined();
        });

        it('Should return undefined on map() with undefined head', function() {
           var actual= TestObject.map(undefined, toUpper);
            expect(actual).not.toBeDefined();
        });

        it('Should return mapped node on filter() with one node', function() {
            var head= TestObject.createLinkedList('foo');
            var actual= TestObject.map(head, toUpper);
            expect(actual.value).toBe('FOO');
            expect(actual.next).not.toBeDefined();
        });

        it ('Should return mapped nodes on filter() with several nodes', function() {
            var head= TestObject.createLinkedList('foo', 'bar');
            var actual= TestObject.map(head, toUpper);
            expect(actual.value).toBe('FOO');
            expect(actual.next.value).toBe('BAR');
            expect(actual.next.next).not.toBeDefined();
        });

    });

});
