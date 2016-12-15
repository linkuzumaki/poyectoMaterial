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

             .primaryPalette('blue',{
                 'default': '500'

            })
             .accentPalette('indigo',{
                 'default':'A200'
             })

     });