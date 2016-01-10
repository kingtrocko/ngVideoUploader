
var uploader = angular.module('ngVideoUploader', []);

uploader.directive('videoUploader', function(){
    return {
      restrict : 'E',
      scope: {},
      templateUrl: 'js/video-uploader-template.html',
      controller: ['$scope', function($scope){
          
          (function initController(){
              $scope.showInput = false;
              
              $('#fileupload').fileupload({
                  url: '/upload',
                  autoUpload: true
              })
                .on('fileuploadfail', function(e, data){
                    console.log(e);
                })
                .on('fileuploadprogress', function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css('width', progress + '%');
                });
              
              
              
          })();
      }],
      link: function(scope, element){          
          var aTag = element.find('a');
          var fileInput = element.find('input');
          
          aTag.bind('click', function(){
              fileInput.click();
          });
      }
    };
});