(function () {
  'use strict';
  angular
    .module('elefgee')
    .factory('SteamService', function ($http, _, $q, $cacheFactory, $rootScope, $location, $window) {

      var getUserInfo = function() {
        return $http.get('/user');
      }

      var getMe = function () {
        return $http.get('/me');
      }

      var addPost = function(post) {
        $http.put('/posts', post).success(function(data){
         $rootScope.$broadcast('post:added');
         $location.path('/feed');
         $window.scrollTo(0, 0);
        })
      }

      var deletePost = function(post, id) {
        $http.put('/deletePost', post).then(function(data){
          $rootScope.$broadcast('post:deleted');
        })
      }

      // var addReviewUser = function(user, userReview) {
      //   user.userReview = userReview;
      //   $http.put('/addReview', user).then(function(data){
      //     ""('I just added a review!', data)
      //     // $rootScope.$broadcast('review:added');
      //   })
      // }

      var addReview = function(user, userObj) {
        user.userObj = userObj;
        $http.put('/addReview', user).then(function(data){
          // $rootScope.$broadcast('review:added');
        })
      }

      return {
        getUserInfo: getUserInfo,
        addPost: addPost,
        deletePost: deletePost,
        // addReviewUser: addReviewUser,
        addReview: addReview,
        getMe: getMe
      };

    });
    angular
    .module('elefgee')
    .factory('Socket', ['socketFactory', function(socketFactory){
      return socketFactory();
    }])
})();
