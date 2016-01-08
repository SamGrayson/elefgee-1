(function () {
  'use strict';

  angular
    .module('elefgee', [
      'ngRoute',
      'underscore',
      'account',
      'angularMoment',
      'btford.socket-io'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          redirectTo: '/login'
        })
        .when('/login', {
          templateUrl: 'login/views/login.html',
          controller: 'AccountController'
        })
        .when('/feed', {
          templateUrl: 'feed/views/feed.html',
          controller: 'FeedController'
        })
        .when('/faq', {
          templateUrl: 'feed/views/faq.html',
          controller: 'FeedController'
        })
        .when('/post', {
          templateUrl: 'post/views/post.html',
          controller: 'PostController'
        })
        .when('/account/:steamId', {
          templateUrl: 'account/views/account.html',
          controller: 'AccountController'
        })
        .when('/BONK', {
          templateUrl: 'login/views/redirectView.html',
          controller: 'SteamController'
        })
        .otherwise({
          redirectTo: '/BONK'
        });
    })
    .directive('errSrc', function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
        }
      }
    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
