define(
  function() {

    return function polyfills() {

      // JS:TGP p21
      if (!Function.prototype.method) {
        Function.prototype.method= function(name, func) {
          this.prototype[name]= func;
          return this;
        };
      }

    };

  }
);
