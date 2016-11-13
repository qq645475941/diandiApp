/**
 * Created by qingyun on 16/9/26.
 */
angular.module('starter')
    .factory('dataService', ['$http', function ($http) {
        var service = {
            getTopic: function () {
                var url = '/163topic';
                return $http.get(url);
            },
            getTopicList: {
                offset:0,
                size:10,
                isRequesting:false,
                getTopicLists: function (id) {
                    var url = '/163wangyi/nc/article/headline/' + id + '/' + this.offset + '-' + this.size + '.html';
                    return $http.get(url);
                },
                setReqState: function (state) {
                    this.isRequesting = state;
                },
                getNextTopicList: function (id) {
                    if (!this.isRequesting) {
                        this.isRequesting = true;
                        this.offset += this.size;
                        return this.getTopicLists(id);
                    }
                }
            },
            getTopicDetail:{
                Detail:function (id) {
                    var url='/163wyDetail/nc/article/'+id+'/full.html';
                    return $http.get(url);
                }
            },
            getHostComment:{
                offset:0,
                limit:10,
                isRequesting:'',
                setReqState: function (state) {
                    this.isRequesting = state;
                },
                getNewComment:function (id) {
                        var url='/comment/'+id+' /app/comments/newList?format=building&headLimit=3&ibc=newsappios&limit='+this.limit+'&offset='+this.offset+'&showLevelThreshold=5&tailLimit=2';
                        return $http.get(url)
                },
                getMoreComment: function (id) {
                    if (!this.isRequesting) {
                        this.isRequesting = true;
                        this.offset += this.limit;
                        return this.getNewComment(id);
                    }
                },
                getComment:function (id) {
                    var url = '/comment/' + id + '/app/comments/hotList?format=building&headLimit=3&ibc=newsappios&limit=10&offset=0&showLevelThreshold=5&tailLimit=2';
                    return $http.get(url);
                }

            },
            commentFloor:function (container,array,con) {
                    for (var i = 0; i < array.length; i++) {
                        var ss = array[i].split(',');
                        var module = document.createElement('div');
                        module.setAttribute('class', 'www');
                        container.appendChild(module);
                        for (var j = 0; j < ss.length; j++) {

                            var userName = con[ss[j]].user.nickname || '火星网友';
                            var imgSrc = con[ss[j]].user.avatar || 'img/ionic.png';
                            var conChild1 = module.querySelectorAll('.com-container')[j - 1];
                            var qq = conChild1 || module;
                            if (ss.length == 1) {
                                qq.insertAdjacentHTML('afterbegin', '<div class="com-container">' +
                                    '<div class="commentPhoto">' +
                                    '<img src="' + imgSrc + '" alt="">' +
                                    '</div>' +
                                    '<div class="com-item">' +
                                    '<div class="com-user">' +
                                    '<div class="user-info">'+
                                    '<div>' +
                                    '<a>' + userName + '</a>' +
                                    '<p>' + con[ss[j]].user.location + '</p>' +
                                    '</div>' +
                                    '<div class="vote"><p>' + con[ss[j]].vote + '顶</p></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="com-content">' + con[ss[j]].content + '</div> ' +
                                    '</div>');
                            }else {
                                if(j==0){
                                    qq.insertAdjacentHTML('afterbegin', '<div class="com-container">' +
                                        '<div class="commentPhoto">' +
                                        '<img src="' + imgSrc + '" alt="">' +
                                        '</div>' +
                                        '<div class="com-item">' +
                                        '<div class="com-user">' +
                                        '<div class="user-info">'+
                                        '<div>' +
                                        '<a>' + userName + '</a>' +
                                        '<p>' + con[ss[j]].user.location + '</p>' +
                                        '</div>' +
                                        '<div class="vote"><p>' + con[ss[j]].vote + '顶</p></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="com-content">' + con[ss[j]].content + '</div> ' +
                                        '</div>');
                                }else{

                                    var fl_con=qq.querySelectorAll('.com-user')[j-1];

                                    (j==1)&&(fl_con.insertAdjacentHTML('beforeend','<div class="com-item com-floor"> ' +
                                        '<div class="com-user"> ' +
                                        '<div class="user-info">'+
                                        '<div> ' +
                                        '<a>' + userName + '</a> ' +
                                        '<p>' + con[ss[j]].user.location + '</p> ' +
                                        '</div> ' +
                                        '<div class="vote">' +
                                        '<p>' + con[ss[j]].vote + '顶</p>' +
                                        '</div> ' +
                                        '</div>'+
                                        '</div> ' +
                                        '<div class="com-content">' + con[ss[j]].content + '</div> ' +
                                        '</div>'));
                                    (j>1)&&(fl_con.insertAdjacentHTML('afterbegin','<div class="com-item com-floor"> ' +
                                        '<div class="com-user"> ' +
                                        '<div class="user-info">'+
                                        '<div> ' +
                                        '<a>' + userName + '</a> ' +
                                        '<p>' + con[ss[j]].user.location + '</p> ' +
                                        '</div> ' +
                                        '<div class="vote">' +
                                        '<p>' + con[ss[j]].vote + '顶</p>' +
                                        '</div> ' +
                                        '</div>'+
                                        '</div> ' +
                                        '<div class="com-content">' + con[ss[j]].content + '</div> ' +
                                        '</div>'))
                                }
                            }
                        }
                    }
                }


        };
        return service;
    }]);