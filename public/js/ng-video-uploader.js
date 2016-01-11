
var uploader = angular.module('ngVideoUploader', []);

uploader.directive('videoUploader',['$http', '$window', '$timeout', function($http, $window, $timeout){
    var uploadUrl = 'https://upload.wistia.com?api_password=0f2cfe85b5a918b95dfaf24bc72833eabb5d3a4d24d80b5dc8efb47bcb6e0095';
    var showVideo = false;
    return {
      restrict : 'E',
      templateUrl: 'js/video-uploader-template.html',
      controller: ['$scope', function($scope){
          
          function makeRequest(endpoint, callback){
              $.getJSON(endpoint + "&format=json&callback=?", callback);
          }
          
          function parseJSON(json) {
            console.log(json.thumbnail_url);
            debugger;
          };
          
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
                        
                        console.log('the hashed id is ', video.hashed_id);
                        
                        var embedUrl = 'http://home.wistia.com/medias/' + video.hashed_id;         
                        embedUrl += '?embedType=api&handle=oEmbedVideo';
                        embedUrl = encodeURIComponent(embedUrl);
                        
                        endpoint += '?url=' + embedUrl;
                        console.log(endpoint);
                        
                        
                        //makeRequest(endpoint, parseJSON);
                        
                        
                       /* $http.get(endpoint).then(
                            //onSuccess
                            function(res){
                                debugger;
                                console.log('response',res);
                            }, 
                            function(res){
                                debugger;
                            });*/
                        
                        
                        $timeout(function(){
                          showVideoModal(data.result);
                        },10000);
                    }
                });          
          }
          
          function showVideoModal(video_result){
              $('#video-modal').on('show.bs.modal', function (event) {
                  var modal = $(this);
                  //var videoDiv = '<iframe src="//fast.wistia.net/embed/iframe/'+ video_result.hashed_id +'" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="360"></iframe>';
                  
                  var videoDiv = '<div class="wistia_embed wistia_async_'+ video_result.hashed_id +'" style="width:570px;height:320px;"></div>';
                  
                  modal.find('.modal-title').text(video_result.name);
                  modal.find('.modal-body').append(videoDiv);
              });
              
              $('#video-modal').on('hidden.bs.modal', function(event){
                  $window.location.reload();
              });
                            
              $('#video-modal').modal('show');
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