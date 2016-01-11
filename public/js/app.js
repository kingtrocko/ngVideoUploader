(function() {
    'use strict';
    
    angular.module('app', ['ngVideoUploader']).controller('indexController', IndexController);
    
    IndexController.$inject = ['$scope', '$http', '$window'];
    
    function IndexController($scope, $http, $window){
        $('#video-modal').on('hidden.bs.modal', function(event){
                  $window.location.reload();
        });
              
        $scope.caption = 'Wistia widget - Video uploader';
        $scope.showVideo = function(){
            var hashed_id = $('#video-thumbnail-container').attr('data-hashed-id');
                    
            var endpoint = 'https://fast.wistia.com/oembed';
            var embedUrl = 'http://home.wistia.com/medias/' + hashed_id;         
            embedUrl += '?embedType=api&handle=oEmbedVideo';
            embedUrl = encodeURIComponent(embedUrl);
            endpoint += '?url=' + embedUrl;
            console.log(endpoint);
            
            $http.get(endpoint).then(
                function(res){
                    if(res.status == 200){
                        showVideoInModal(res.data);     
                    }else{
                        alert('Ocurred an error');
                    }
                   
                   console.log('the response', res); 
                }, function(res){
                    alert('Video not ready yet. Wistia is processing it. \nTry again!');
                });
            
            var showVideoInModal = function(video){
                 //get modal reference
              var modal = $('.modal');
              var videoDiv = video.html;

              //append the video to the modal body and set video name in modal title
              modal.find('.modal-title').text(video.title);
              modal.find('.modal-body').html(videoDiv);
              
              var videoContainerId = "#wistia_" + hashed_id;
              
              modal.find(videoContainerId).css('width', '570');
              modal.find(videoContainerId).css('height', '320');
              
              $('#video-modal').modal('show');
              
            } 
        }
    }
    
})();