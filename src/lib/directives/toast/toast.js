angular.module('myWeb.lib.directive').config(['$mdToastProvider',function($mdToastProvider){
  var config ={};
  config.position = "top right";
  config.delay = "1500";

  $mdToastProvider.addPreset('registerWarning', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: orange;">' +
              '请输入有效的注册信息！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('registerSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: green;">' +
              '注册成功！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('registerError', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: red;">' +
              '注册发生错误！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('registerError_reEmail', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: red;">' +
              '该邮箱以被注册！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('loginWarning', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: orange;">' +
              '请输入有效的登陆信息！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('loginSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: green;">' +
              '登陆成功！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('loginError', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: red;">' +
              '登陆信息错误！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('changePasswdError', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: red;">' +
              '修改密码错误！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('changePasswdSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: green;">' +
              '修改密码成功！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('changeUsernameError', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: red;">' +
              '修改用户名错误！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('changeUsernameSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: green;">' +
              '修改用户名成功！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('addCartSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: green;">' +
              '加入购物车成功' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('addBookSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: green;">' +
              '上架图书成功!' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('deleteBookSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: orange;">' +
              '删除图书成功!' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('editUserSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: green;">' +
              '用户修改成功！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('editUserError', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: red;">' +
              '修改用户错误！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('pleaseLogin', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: orange;">' +
              '未登录，请先登录' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
  $mdToastProvider.addPreset('addCommentSuccess', {
    options: function() {
      return {
        template:
          '<md-toast>' +
            '<div class="md-toast-content" style="background-color: green;">' +
              '评论发布成功！' +
            '</div>' +
          '</md-toast>',
        position: config.position,
        hideDelay: config.delay
      };
    }
  });
}])