define(
  [
    'js/the_good_parts/polyfills',
  ],
  function(polyfills) {

    describe('Polyfill tests', function() {

      beforeAll(polyfills);

      describe('Function.prototype.method', function() {
        var TestClass;
        var bar= function() {
          return 'bar';
        };

        beforeEach(function() {
          TestClass= function() {};
        });

        it('Should be a truthy function', function() {
          var func= Function.prototype.method;
          expect(func).toBeTruthy();
          expect(typeof func).toEqual('function');
        });

        describe('Create instances of TestClass', function() {
          var instance;
          beforeEach(function() {
            TestClass.method('foo', bar);
            instance= new TestClass();
          });

          it('Should create a property callable from an object instance', function() {
            expect(instance.foo()).toEqual('bar');
          });

          it('Should create a property callable from the particular prototype', function() {
            expect(TestClass.prototype.foo).toBeDefined();
            var result= TestClass.prototype.foo.apply(instance);
            expect(result).toEqual('bar');
          });

        });

      });

    });

  }
);
