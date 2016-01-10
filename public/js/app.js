(function() {
    'use strict';
    
    angular.module('app', ['ngVideoUploader']).controller('indexController', IndexController);
    
    IndexController.$inject = ['$scope'];
    
    function IndexController($scope){
        $scope.caption = 'Wistia widget - Video uploader';
    }
    
})();