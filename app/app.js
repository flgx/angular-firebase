'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.register',
  'myApp.welcome',
  'myApp.addPost',
  'myApp.addCategory',
  'myApp.addTeam',
  'myApp.addDivision',
  'myApp.test'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).controller("LayoutController",['$rootScope','$scope','$firebase','$location','CommonProp',function($rootScope,$scope,$firebase,$location,CommonProp) {
	if(!CommonProp.getUser()){
   		 $location.path('/home');
	}
	
    var login={};
	$scope.login=login;
	$scope.navbar = false;
	$scope.logout = function(){
    	CommonProp.logoutUser();
	}


}]);
