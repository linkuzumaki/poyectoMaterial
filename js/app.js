 angular.module('app',['ngMaterial',
     'ngAnimate',
     'ngAria',
     'ngMessages',
     'ngRoute',
     'app.routes',
     'app.controllers',
     'app.directive',
     'ngDialog',
     'mdColorPicker','ngFileUpload'])

     .config(function($mdThemingProvider) {
         $mdThemingProvider.theme('default')

             .primaryPalette('purple',{
                 'default': '400'
            })
             .accentPalette('indigo',{
                 'default':'A200'
             })

     });