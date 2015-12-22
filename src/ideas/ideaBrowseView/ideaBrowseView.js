/* global angular */

angular.module('flintAndSteel')
.controller('IdeaBrowseViewCtrl',
    [
        '$scope', 'ideaSvc', 'sseSvc',
        function($scope, ideaSvc, sseSvc) {
            "use strict";

            $scope.loaded = false;

            function setIdeaHeaders(data) {
                $scope.ideas = data;
                $scope.loaded = true;
            }

            ideaSvc.getIdeaHeaders(setIdeaHeaders, function getIdeaHeadersError(data, status) {
                console.log(status);
            });

            sseSvc.create("newHeaders", "/ideaheaders/events", function(data) {
                $scope.$apply(function() {
                    setIdeaHeaders(data)
                });
            });

            $scope.$on('$stateChangeStart', function() {
                sseSvc.destroy();
            });
        }
    ]
);
