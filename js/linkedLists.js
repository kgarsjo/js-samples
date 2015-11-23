define(function() {
	'use-strict';

    function callOnValidHead(head, fn) {
        var args= Array.prototype.slice.call(arguments, 2);
        if (head) {
            return fn.apply(undefined, args);
        }
    }

    function doFilter(head, select) {
      if (select(head.value)) {
          head.next= linkedList.filter(head.next, select);
          return head;
      } else {
          return linkedList.filter(head.next, select);
      }
    }

    function asNode(value) {
      return {
        value: value
      };
    }

    var linkedList= {
        createLinkedList: function() {
            var args= Array.prototype.slice.call(arguments);
            if (!!args.length) {
                var head= asNode(args[0]);
                head.next= this.createLinkedList.apply(this, args.slice(1));
                return head;
            }
        },

        filter: (function constructFilter() {
            var doFilter= function(head, select) {
                if (select(head.value)) {
                  head.next= linkedList.filter(head.next, select);
                  return head;
                } else {
                  return linkedList.filter(head.next, select);
                }
            };

            return function filter(head, select) {
                return callOnValidHead(head, doFilter, head, select);
            };
        })(),

        map: (function constructMap() {
			var doMap= function(head, fn) {
				var newHead= asNode(fn(head.value));
				newHead.next= linkedList.map(head.next, fn);
				return newHead;
			};

            return function map(head, fn) {
				return callOnValidHead(head, doMap, head, fn);
        	};
		})(),

        reverse: (function constructReverse() {
			var doReverse= function(original, reversed) {
				if (original) {
					var curr= original;
					var original= curr.next;
					curr.next= reversed;
					return doReverse(original, curr);
				}
				return reversed;
			};

			return function reverse(head) {
				return doReverse(head);
			};
        })(),
    };

    return linkedList;
});
