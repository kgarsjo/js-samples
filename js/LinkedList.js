define(function() {
		'use-strict';

		// Private functions
    function callOnValidHead(head, fn) {
        var args= Array.prototype.slice.call(arguments, 2);
        if (head) {
            return fn.apply(head, args);
        }
    }

		function clone(head) {
				if (!head) { return; }
				var headClone= asNode(head.value);
				headClone.next= clone(head.next);
				return headClone;
		}

    function asNode(value) {
      return {
        value: value
      };
    }

		function createLinkedList(values) {
			if (!!values.length) {
					var head= asNode(values[0]);
					head.next= createLinkedList(values.slice(1));
					return head;
			}
		}

		function createListFromHead(head) {
				var values= doToArray(head);
				values.unshift(null);
				return new (Function.prototype.bind.apply(LinkedList, values));
		}

		function doToArray(head) {
				if (head) {
					return [head.value].concat(doToArray(head.next));
				}
				return [];
		};


		// Constructor
    var LinkedList= function() {
				this.head= createLinkedList(Array.prototype.slice.call(arguments));
    };


		// Public functions
		LinkedList.prototype.filter= (function constructFilter() {
				var doFilter= function(head, select) {
						if (select(head.value)) {
							head.next= guardFilter(head.next, select);
							return head;
						} else {
							return guardFilter(head.next, select);
						}
				};

				var guardFilter= function(head, select) {
						return callOnValidHead(head, doFilter, head, select);
				};

				return function filter(select) {
						var filtered= guardFilter(clone(this.head), select);
						return createListFromHead(filtered);
				};
		})();

		LinkedList.prototype.map= (function constructMap() {
				var doMap= function(head, fn) {
						var newHead= asNode(fn(head.value));
						newHead.next= linkedList.map(head.next, fn);
						return newHead;
				};

				return function map(fn) {
						return callOnValidHead(head, doMap, head, fn);
				};
		})();

		LinkedList.prototype.reverse= (function constructReverse() {
				var doReverse= function(original, reversed) {
						if (original) {
								var curr= original;
								var original= curr.next;
								curr.next= reversed;
								return doReverse(original, curr);
						}
						return reversed;
				};

				return function reverse() {
						return doReverse(head);
				};
		})();

		LinkedList.prototype.toArray= function() {
				return doToArray(this.head);
		};

    return LinkedList;
});
