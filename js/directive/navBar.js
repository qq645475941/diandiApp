angular.module('starter')
  .directive('navBar', ['dataService', function (dataService) {
    return {
      restrict: 'E',
      scope:{},
      templateUrl: 'temp/navBar.html',
      link: function (scope, ele, attr) {
        dataService.getTopic().then(function (data) {
          var _array = data.data.tList;
          scope.dujia = _array.find(function (e) {
            return e.tname == '头条';
          });
          var index = _array.indexOf(scope.dujia);
          _array.splice(index, 1);
          var optNav = _array.splice(0, 19);
          var remainNav = _array;
          scope.items = optNav;
          scope.remainNav = remainNav;
        });
        ele.on('touchstart', '.item-bar span', function(e) {
          $(this).parent().parent().find('.item-bar').removeClass('checked');
          $(this).parent().addClass('checked');
          var a = e.target;
          var navBar = $(ele).find('.navBar');
          var left = window.innerWidth / 2 - a.offsetLeft - 100;
          if (left > 0) {
            left = 0;
          }
          navBar.css({left: left + 'px'});
        });
      }
    }
  }]);
