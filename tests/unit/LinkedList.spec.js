define(['js/LinkedList'], function linkedListsSpec(LinkedList) {

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

        beforeAll(polyfillBind);

        it('Should return new LinkedList for constructor with empty args', function() {
            var actual= new LinkedList();
            expect(actual).toBeDefined();
        });

        it('Should return new LinkedList for constructor with one arg', function() {
            var actual= new LinkedList('a');
            expect(actual).toBeDefined();
        });

        it('Should return new LinkedList for constructor with multiple args', function() {
            var actual= new LinkedList('a', 'b', 'c');
            expect(actual).toBeDefined();
        });

        // TODO should be able to consolidate via test generator (for in)
        it('Should return an empty array for toArray() on empty list', function() {
            var actual= new LinkedList().toArray();
            expect(actual).toEqual([]);
        });

        // TODO should be able to consolidate via test generator (for in)
        it('Should return a unit array for toArray() on unit list', function() {
            var actual= new LinkedList('a').toArray();
            expect(actual).toEqual(['a']);
        });

        // TODO should be able to consolidate via test generator (for in)
        it('Should return an array for toArray() on list', function() {
            var actual= new LinkedList('a', 'b', 'c').toArray();
            expect(actual).toEqual(['a', 'b', 'c']);
        });

        it('Should return empty list on filter() with undefined head', function() {
            var list= new LinkedList();
            list.filter(alwaysSelect);
            expect(list.toArray()).toEqual([]);
        });

        it('Should return duplicate list on filter() over single selected node', function() {
            var list= new LinkedList('a');
            var actual= list.filter(alwaysSelect);
            expect(list.toArray()).toEqual(['a']);
            expect(actual.toArray()).toEqual(['a']);
        });

        it('Should return empty list on filter() over single filtered node', function () {
            var list= new LinkedList('a');
            var actual= list.filter(neverSelect);
            expect(list.toArray()).toEqual(['a']);
            expect(actual.toArray()).toEqual([]);
        });

    });

    function polyfillBind() {
        if (!Function.prototype.bind) {
          Function.prototype.bind = function(oThis) {
              if (typeof this !== 'function') {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
              }

              var aArgs   = Array.prototype.slice.call(arguments, 1),
                  fToBind = this,
                  fNOP    = function() {},
                  fBound  = function() {
                    return fToBind.apply(this instanceof fNOP
                           ? this
                           : oThis,
                           aArgs.concat(Array.prototype.slice.call(arguments)));
                  };

              if (this.prototype) {
                // native functions don't have a prototype
                fNOP.prototype = this.prototype;
              }
              fBound.prototype = new fNOP();

              return fBound;
            };
        }
    }

});
