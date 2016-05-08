'use strict';

angular.module('myApp.addDivision', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addDivision', {
    templateUrl: 'addDivision/addDivision.html',
    controller: 'AddDivisionCtrl'
  });
}])

.controller('AddDivisionCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
     
	if(!CommonProp.getUser()){
   		 $location.path('/home');
	}
    var login={};
	$scope.login=login;
$scope.navbar = true;

	$scope.logout = function(){
   		CommonProp.logoutUser();
	}

    $scope.AddDivision = function(){
		login.loading = true;
		var title = $scope.division.title;
		

		var firebaseObj = new Firebase("https://codedoors-angularfirebase.firebaseio.com/Division");		
	    var fb = $firebase(firebaseObj);
	        
		var user = CommonProp.getUser();
		

		fb.$push({ title: title,emailId: user,'.priority': user }).then(function(ref) {
			login.loading = false;
			$location.path('/welcome');
		}, function(error) {
			login.loading = false;
	  		console.log("Error:", error);
		});

    }
}]);

