angular.module('menuApp', [])
  .directive('menu', function() {
    return {
      restrict : 'EA',
      templateUrl: '/web/templates/template_main_menu.html',
      controller: 'ControlMainMenu'
    }
 });