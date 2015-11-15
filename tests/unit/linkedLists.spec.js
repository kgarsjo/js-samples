define(['js/linkedLists'], function linkedListsSpec(TestObject) {

    describe('Linked lists', function() {
    
        var alwaysSelect= function(head) {
            return true;
        };
        var neverSelect= function(head) {
            return false;
        };

        it('Should return a node when calling asNode', function() {
            var expected= 'Hello World';
            var node= TestObject.asNode(expected);

            expect(node).toBeDefined();
            expect(node.value).toBe(expected);
        });

        // Test understanding of slice
        //      list.slice(1, 0) ==> []
        //      list.slice(1, 1) ==> []
        //      list.slice(0, 0) ==> []
        //      list.slice(0, 1) ==> [0]
        //      list.slice(0, 1)[0] ==> 0
        it('Test array.slice', function() {
            var list= [0,1,2,3,4];
            var first= list.slice(0,1);
            expect(first[0]).toBe(0);
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
            var filterBar= function(head) {
                return head.value !== 'bar';
            };
            var actual= TestObject.filter(head, filterBar);
            expect(actual.value).toBe('foo');
            expect(actual.next.value).toBe('baz');
            expect(actual.next.next).not.toBeDefined();
        });

    });

});