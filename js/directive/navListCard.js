/**
 * Created by qingyun on 16/9/27.
 */

angular.module('starter')
    .directive('navCard', ['dataService', function (dataService) {
        return {
            restrict: 'A',
            link: function (scope, ele, attr) {
                var span = $(ele).find('span');
                var topicPage = $(ele).next();
                var remain=$('.remain');
                ele.on('click', function (e) {
                    span.hasClass('checked') ?
                        (
                            span.removeClass('checked'),
                                topicPage.css({top: -15+'rem'})
                        ) : (
                        span.addClass('checked'),
                            topicPage.removeClass('press'),
                            topicPage.css({top:1.0001 + 'rem'})
                    )
                });
                $(topicPage).on('touchstart','li',function (e) {
                    var startT=Date.now(),endT,elapseT;
                    $(this).on('touchend',function () {
                        endT=Date.now();
                        elapseT=endT-startT;
                        if(elapseT>1000){
                            $(remain).on('touchstart','li',function () {
                                var idx = $(this).attr('data-topicIdx');
                                var ss=scope.remainNav.splice(idx,1);
                                scope.items.push(ss[0]);
                                scope.$apply();
                            });
                            $(topicPage).addClass('press');
                        }
                        $(this).off('touchend')
                    });
                });
                $(topicPage).on('touchstart', 'i', function () {
                    var idx = $(this).parent().attr('data-topicIdx');
                    var ss=scope.items.splice(idx,1);
                    scope.remainNav.push(ss[0]);
                    scope.$apply();
                });
            }
        }
    }]);
