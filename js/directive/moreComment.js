/**
 * Created by qingyun on 16/10/15.
 */
angular.module('starter')
  .directive('moreComment', ['dataService', function (dataService) {
    return {
      restrict: 'AE',
      scope: {
        data: "="
      },
      transclude: 'element',
      compile: function () {
        return {
          post: function ($scope, $ele, $attr, $ctr, $transclude) {
            var ids = $scope.data;
            if (ids.length > 1) {
              ids = ids.reverse();
              var idss=ids.slice(1);
              var lastEle;
              angular.forEach(idss, function (val, idx) {
                (idss.length != 0) && ($transclude(function (clone, scope) {
                  scope.comId = val;
                  scope.idx=(idss.length-idx);
                  if (idx == 0) {
                    $ele.after(clone);
                    lastEle = clone;
                  } else {
                    lastEle.prepend(clone[0]);
                    lastEle = clone;
                  }
                }))
              })
            }
          }
        }

      }
    }

  }]);



