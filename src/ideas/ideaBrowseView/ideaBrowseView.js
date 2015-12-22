/* global angular */

angular.module('flintAndSteel')
.controller('IdeaBrowseViewCtrl',
    [
        '$scope', 'ideaSvc', 'sseSvc', '$filter',
        function($scope, ideaSvc, sseSvc, $filter) {
            "use strict";

            var ideas = [];

            $scope.loaded = false;
            $scope.ideas = ideas;

            $scope.searchIdeas = function searchIdeas() {
                $scope.ideas = $filter('search')(ideas, $scope.searchText);
            };

            function setIdeaHeaders(data) {
                ideas = data;
                $scope.loaded = true;
                $scope.searchIdeas($scope.searchText);
            }

            ideaSvc.getIdeaHeaders(setIdeaHeaders, function getIdeaHeadersError(data, status) {
                console.log(status);
            });

            sseSvc.create("newHeaders", "/ideaheaders/events", function(data) {
                $scope.$apply(function() {
                    setIdeaHeaders(data);
                });
            });

            $scope.$on('$stateChangeStart', function() {
                sseSvc.destroy();
            });
        }
    ]
);
