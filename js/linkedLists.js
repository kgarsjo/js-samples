define(function() {

    var callOnValidHead= function(head, fn) {
        if (head) {
            return fn();
        }
    };

    return { 

        asNode: function(value) {
            return {
             value: value
            }
        },

        createLinkedList: function() {
            var args= Array.prototype.slice.call(arguments);
            if (!!args.length) {
                var head= this.asNode(args[0]);
                head.next= this.createLinkedList.apply(this, args.slice(1));
                return head;
            }
        },

        filter: function(head, select) {
            var self= this;
            return callOnValidHead(head, function doFilter() {
                if (select(head)) {
                    head.next= self.filter(head.next, select);
                    return head;
                } else {
                    return self.filter(head.next, select);
                }
            });
        }

    };

});
