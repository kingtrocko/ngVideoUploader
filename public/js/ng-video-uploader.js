
var uploader = angular.module('ngVideoUploader', []);

uploader.directive('videoUploader',['$http', '$window', '$timeout', function($http, $window, $timeout){
    var uploadUrl = 'https://upload.wistia.com?api_password=0f2cfe85b5a918b95dfaf24bc72833eabb5d3a4d24d80b5dc8efb47bcb6e0095';
    var showVideo = false;
    return {
      restrict : 'E',
      scope: {},
      templateUrl: 'js/video-uploader-template.html',
      controller: ['$scope', function($scope){
          
          function intializeUploadPlugin(){
              $('#fileupload').fileupload({
                  url: uploadUrl,
                  autoUpload: true,
                  multipart: true
              })
              .on('fileuploadadd', function(e, data){
                    if(data.files.length > 0){
                        var file = data.files[0];
                        $('#upload-file').addClass('disabled');
                        
                        var formData = new FormData();
                        formData.append('file', file);
                        formData.append('project_id', 'ifemiu8aom');
                        
                        $(this).fileupload('option', 'formData', formData );
                        data.submit();
                    }
                })
                .on('fileuploadfail', function(e, data){
                    console.log(e);
                })
                .on('fileuploadprogress', function (e, data) {                    
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css('width', progress + '%');
                    if(progress >= 100){
                        showVideo = true;
                    }
                })
                .on('fileuploadalways', function(e, data){
                    console.log(data.result);
                    if(showVideo){
                        var video = data.result;
                        var endpoint = 'http://fast.wistia.com/oembed';
                        var embedUrl = 'http://home.wistia.com/medias/' + video.hashed_id;         
                        embedUrl += '?embedType=api&handle=oEmbedVideo';
                        embedUrl = encodeURIComponent(embedUrl);
                        endpoint += '?url=' + embedUrl;
                        console.log(endpoint);

                        showVideoThumbnail(data.result);
                    }
                });          
          }
          
          function showVideoThumbnail(video){
              var thumbnail = $('#video-thumbnail'); 
              thumbnail.attr('src', video.thumbnail.url);
              thumbnail.css('height', video.thumbnail.height);
              thumbnail.css('width', video.thumbnail.width);
              
              thumbnail.closest('a').css('display', 'block');
              thumbnail.closest('a').attr('data-hashed-id', video.hashed_id);
          }
          
          (function initController(){
              $scope.showInput = false;
              intializeUploadPlugin()
              
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