/* global angular */

angular.module('flintAndSteel')
.filter('search',
    [
        function() {
            "use strict";

            return function(items, searchTerm) {
                if (typeof searchTerm === "undefined" || searchTerm === '') {
                    return items;
                }
                var retArray = [];
                var re = /[ .,-\/#!$%\^&\*;:{}=\-_`~()<>\'\"@\[\]\|\\\?]/g;
                retArray = items.filter(function(item) {
                    var normalizedSearch = searchTerm.replace(re,"").toLowerCase();
                    var normalizedTitle = item.title.replace(re,"").toLowerCase();
                    var normalizedAuthor = item.author.name.replace(re,"").toLowerCase();
                    var normalizedAbstract = item.abstract.replace(re,"").toLowerCase();
                    var normalizedTags = item.tags;
                    var isPresent = false;
                    if (normalizedTitle.indexOf(normalizedSearch) >= 0) {
                        isPresent = true;
                    }
                    else if (normalizedAuthor.indexOf(normalizedSearch) >= 0) {
                        isPresent = true;
                    }
                    else if (normalizedAbstract.indexOf(normalizedSearch) >= 0) {
                        isPresent = true;
                    }
                    else if (typeof normalizedTags !== 'undefined') {
                        normalizedTags.forEach(function(tag) {
                            tag = tag.replace(re,"").toLowerCase();
                            if (tag.indexOf(normalizedSearch) >= 0) {
                                isPresent = true;
                            }
                        });
                    }
                    return isPresent;
                });
                return retArray;
            };
        }
    ]
);
