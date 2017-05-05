angular.module('myWeb').config(['$mdIconProvider', function($mdIconProvider) {
  $mdIconProvider
  .icon('wenxue', '../images/lib_wenxue.svg', 24)
  .icon('tuijian','../images/lib_tuijian.svg',24)
  .icon('jiaoyu','../images/lib_jiaoyu.svg',24)
  .icon('tongshu','../images/lib_tongshu.svg',24)
  .icon('lizhi','../images/lib_lizhi.svg',24)
  .icon('shenghuo','../images/lib_shenghuo.svg',24)
  .icon('yishu','../images/lib_yishu.svg',24)
  .icon('keji','../images/lib_keji.svg',24)
  .icon('user','../images/user.svg',24)
  .icon('cart','../images/cart.svg',24)
  .icon('order','../images/order.svg',24)


}])