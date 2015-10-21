define(['jquery', 'underscore'], function($, _) {

    var url= 'my/example/service'

    return function constructor() {
        this.fetchAttribute= function(callback) {
            $.ajax({
                url: url,
                method: 'GET'
            }).done( function(data) {
                callback(data);
            });
        };

        this.cacheAttribute= function(cache, callback) {
            if (cache && cache.attribute) {
                callback(cache.attribute);
            } else {
                this.fetchAttribute(function(data) {
                    cache= (cache) ? cache : {};
                    cache.attribute= data;
                    callback(data);
                });
            }
        };

        this.withAttribute= _.partial(this.cacheAttribute, {});
    };

});
