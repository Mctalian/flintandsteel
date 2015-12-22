/* global angular */

angular.module('flintAndSteel')
.service('paginateSvc',
    [
        function() {
            "use strict";

            this.createNumPages = function createPages(content, numPages) {
                var pages = [];
                var contentLength = content.length;
                var numPerPage = Math.ceil(content.length / numPages);

                for (var index = 0; index < contentLength; index += numPerPage) {
                    pages.push({start: index, length: numPerPage});
                }
                return pages;
            };

            this.createPerPage = function createPages(content, numPerPage) {
                var pages = [];
                var contentLength = content.length;

                for (var index = 0; index < contentLength; index += numPerPage) {
                    pages.push({start: index, length: numPerPage});
                }
                return pages;
            };
        }
    ]
);
