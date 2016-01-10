
var uploader = angular.module('ngVideoUploader', []);

uploader.directive('videoUploader',['$http', function($http){
    var uploadUrl = 'https://upload.wistia.com?api_password=0f2cfe85b5a918b95dfaf24bc72833eabb5d3a4d24d80b5dc8efb47bcb6e0095';
    
    return {
      restrict : 'E',
      scope: {},
      templateUrl: 'js/video-uploader-template.html',
      controller: ['$scope', function($scope){
          
          (function initController(){
              $scope.showInput = false;
              $scope.encodedFile = '';
              
              $('#fileupload').fileupload({
                  url: uploadUrl,
                  autoUpload: true,
                  multipart: true
              })
                .on('fileuploadadd', function(e, data){
                    if(data.files.length > 0){
                        var file = data.files[0];
                        encodeTheFile(file);
                        
                        console.log($scope.encodedFile);
                        
                        var formData = new FormData();
                        formData.append('file', $scope.encodedFile);
                        
                        $(this).fileupload('option', 'formData', formData );
                        data.submit();
                    }
                    debugger;
                    console.log(data);
                })
                .on('fileuploadsubmit', function(e, data){
                    
                })
                .on('fileuploadfail', function(e, data){
                    console.log(e);
                })
                .on('fileuploadprogress', function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css('width', progress + '%');
                })
                .on('fileuploadalways', function(e, data){
                    console.log(data);
                });
              
              
              var encodeTheFile = function(file){
                   var reader = new FileReader();
                    reader.onload = function(readerEvt) {
                        var binaryString = readerEvt.target.result;
                        $scope.encodedFile = btoa(binaryString);
                    };
                    reader.readAsBinaryString(file);
              };
              
              
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
}]);