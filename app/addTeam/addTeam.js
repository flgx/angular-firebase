'use strict';

angular.module('myApp.addTeam', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addTeam', {
    templateUrl: 'addTeam/addTeam.html',
    controller: 'AddTeamCtrl'
  });
}])

.controller('AddTeamCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
     
	if(!CommonProp.getUser()){
   		 $location.path('/home');
	}
     var login={};
	$scope.login=login;
$scope.navbar = true;

	$scope.logout = function(){
    	CommonProp.logoutUser();
	}
	
    $scope.AddTeam = function(){
	login.loading = true;
    var name = $scope.team.name;
    var president = $scope.team.president;
	var foundation = $scope.team.foundation;	
	var firebaseObj = new Firebase("https://codedoors-angularfirebase.firebaseio.com/Teams");
	
    var fb = $firebase(firebaseObj);
        
	var user = CommonProp.getUser();
	

	fb.$push({ name: name,post: post, president: president,foundation:foundation}).then(function(ref) {
		login.loading = false;
		$location.path('/welcome');
	}, function(error) {
		login.loading = false;
  		console.log("Error:", error);
	});

    }
}]);

