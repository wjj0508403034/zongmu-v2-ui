var huoyun = angular.module('huoyun', ["huoyun.widget"]);

huoyun.config(["$logProvider", function($logProvider) {
  $logProvider.debugEnabled(true);
}]);

huoyun.config(["applicationProvider", function(applicationProvider) {
  applicationProvider.setName("纵目真值系统V2");
}]);

huoyun.config(["navProvider", function(navProvider) {

  navProvider.setItems([{
    name: "home",
    text: "任务大厅",
    href: "page/home/index.html"
  }, {
    name: "mytask",
    text: "我的任务",
    href: "page/task/index.html"
  }, {
    name: "train",
    text: "训练中心",
    href: "page/train/index.html"
  }, {
    name: "setting",
    text: "设置",
    visibility: false,
    href: "page/setting/asset.view.tag.html"
  }, {
    name: "help",
    text: "帮助中心",
    href: "page/help/index.html"
  }]);
}]);


huoyun.config(["footbarProvider", function(footbarProvider) {
  footbarProvider.configure({
    links: [{
      text: "关于系统",
      href: "http://www.zongmutech.com/"
    }, {
      text: "联系我们(QQ:123456;Tel:12345678)",
      href: "/"
    }],
    copyRight: "2014-2016",
    companyName: "纵目科技有限公司",
    recordNo: "沪公安备09004260号"
  });
}]);




huoyun.controller("appController", ["$scope",
  function($scope) {
    $scope.title = "纵目真值系统";

  }
]);