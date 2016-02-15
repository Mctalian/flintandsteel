/* global angular */

angular.module('flintAndSteel')
.controller('HomeViewCtrl',
    [
        '$document', '$scope', '$timeout', '$window', '$state','$mdSidenav', 'ideaSvc', 'userSvc', 'paginateSvc', '$filter',
        function($document, $scope, $timeout, $window, $state, $mdSidenav, ideaSvc, userSvc, paginateSvc, $filter) {
            "use strict";

            $scope.ideas = [];
            $scope.topIdeas = [];
            $scope.trendPages = [];
            $scope.currentPage = {};
            $scope.pageNumber = 0;

            $scope.internetExplorerMessage = "Some pages may not render properly in this Browser.  For best experience, please use Google Chrome.";

            function getInternetExplorerVersion(navObj) {
                console.log(navObj);
                var browserVersion = -1;
                var userAgent = navObj.userAgent;
                var versionMatcher;
                var searchResults;
                if (navObj.appName === 'Microsoft Internet Explorer') {
                    versionMatcher = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                    console.log('We shouldn\'t be here');
                    searchResults = versionMatcher.exec(userAgent);
                    if (searchResults !== null) {
                        browserVersion = parseFloat(searchResults[1]);
                    }
                }
                else if (navObj.appName === 'Netscape') {
                    versionMatcher = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                    console.log(searchResults);
                    searchResults = versionMatcher.exec(userAgent);
                    if (searchResults !== null) {
                        browserVersion = parseFloat(searchResults[1]);
                    }
                }
                return browserVersion;
            }

            $scope.browserVersion = parseInt(getInternetExplorerVersion($window.navigator));

            ideaSvc.getIdeaHeaders().then(function getIdeaHeadersSuccess(response) {
                $scope.ideas = response.data;
                $scope.topIdeas = $filter('orderBy')($scope.ideas, '-likes');
                $scope.trendPages = paginateSvc.createPerPage($scope.topIdeas, 5);
                $scope.currentPage = $scope.trendPages[$scope.pageNumber];
            }, function getIdeaHeadersError(response) {
                console.log(response);
            });

            $scope.navToBrowse = function navToBrowse() {
                $state.go('ideabrowse');
            };

            $scope.navTo = function navTo(state) {
                if (state === 'addIdea') {
                    if (userSvc.isUserLoggedIn()) {
                        $state.go(state);
                    }
                    else {
                        $state.go('home');
                    }
                }
                else if (state === 'idea') {
                    $state.go('idea', {ideaId: 'mock_idea'});
                }
                else {
                    $state.go(state);
                }
                if (!$mdSidenav('left').isLockedOpen()) {
                    $mdSidenav('left').close();
                }
            };

            $scope.isUserLoggedIn = userSvc.isUserLoggedIn;
        }
    ]
);
