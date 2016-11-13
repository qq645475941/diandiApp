angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform){
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home/list/T1348647853363");
    $stateProvider
      .state("home", {
        url: '/home',
        abstract: true,
        views: {
          "home": {
            templateUrl: 'temp/home.html'
          }
        }
      })
      .state('list', {
        url: '/list/:id',
        parent: 'home',
        views: {
          'newList': {
            templateUrl: 'temp/list.html',
            controller: function ($stateParams, dataService, $scope) {
              var id = $stateParams.id || 'T1348647853363';

              dataService.getTopicList.getTopicLists(id).then(function (data) {
                $scope.items = data.data[id];
              });
              $scope.doRefresh = function () {
                dataService.getTopicList.getTopicLists(id).then(function (data) {
                  $scope.items = data.data[id];
                  $scope.$broadcast('scroll.refreshComplete');
                });
              }
              dataService.getTopicList.setReqState(false);
              $scope.loadMore = function () {
                dataService.getTopicList.getNextTopicList(id).then(function (data) {
                  var items = data.data[id];
                  $scope.items = ($scope.items || []).concat(items);
                  $scope.$broadcast('scroll.infiniteScrollComplete');
                  dataService.getTopicList.setReqState(false);
                })
              };
            }
          }
        }
      })
      .state('detail', {
        parent: 'home',
        url: '/detail/:id',
        resolve: {
          data: function (dataService, $stateParams) {
            var id = $stateParams.id;
            return dataService.getTopicDetail.Detail(id).then(function (data) {
              var news = data.data[id];
              var REG_img = '<!--IMG#(.*?)?-->';
              var regExpression = new RegExp(REG_img, 'mg');
              var htmlBody = (data.data[id].body || '').replace(regExpression, function (a, b) {
                for (var i = 0; i < data.data[id].img.length; i++) {
                  if (i == b) {
                    b = data.data[id].img[i].src
                  }
                }
                return '<img src=' + b + '>';
              });
              var detailObj = {
                news: news,
                htmlBody: htmlBody
              };
              return detailObj;
            });
          },
          comment: function (dataService, $stateParams) {
            var id = $stateParams.id;
            return dataService.getHostComment.getComment(id).then(function (data) {
              var commentIds = data.data.commentIds;
              var comments = data.data.comments;
              var hostcomment = [];
              var ids = commentIds;

              for (var i = 0; i < ids.length; i++) {
                (ids[i].split(',').length == 1) && (hostcomment.push(comments[ids[i]]))
              }
              hostcomment.sort(function (x, y) {
                return x.vote > y.vote ? -1 : 1;
              });
              hostcomment = hostcomment.slice(0, 3);
              return hostcomment;
            });
          }
        },
        views: {
          'home@': {
            templateUrl: 'temp/detail.html',
            controller: function (data, $scope, comment, $stateParams) {
              var id = $stateParams.id;
              $scope.news = data.news;
              $scope.htmlBody = data.htmlBody;
              $scope.hostcomment = comment;
              $scope.id = id;

            }
          }
        }
      })
      .state('comment', {
        parent: 'home',
        url: '/comment/:id',
        resolve: {
          hotCom: function (dataService, $stateParams) {
            var id = $stateParams.id;
            return dataService.getHostComment.getComment(id).then(function (data) {
              var commentIds = data.data.commentIds;
              var comments = data.data.comments;
              var sss = {
                commentIds: commentIds,
                comments: comments
              };
              return sss;
            })
          }
        },
        views: {
          'home@': {
            templateUrl: 'temp/moreComment.html',
            controller: function ($scope, dataService, $stateParams, hotCom) {
              var id = $stateParams.id;
              $scope.commentIds = hotCom.commentIds;
              $scope.comments = hotCom.comments;
              for (var i=0;i<$scope.commentIds.length;i++){
                $scope.commentIds[i]=$scope.commentIds[i].split(',');
              }
            }
          }
        }
      })

  }]);
