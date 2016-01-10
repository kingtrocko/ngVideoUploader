(function() {
    'use strict';
    
    angular.module('app', []).controller('indexController', IndexController);
    
    IndexController.$inject = ['$scope'];
    
    function IndexController($scope){
        $scope.caption = 'Hello world!';
    }
    
})();