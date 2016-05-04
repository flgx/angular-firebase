'use strict';

angular.module('myApp.addCategory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addCategory', {
    templateUrl: 'addCategory/addCategory.html',
    controller: 'AddCategoryCtrl'
  });
}])

.controller('AddCategoryCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
     
	if(!CommonProp.getUser()){
    	$location.path('/home');
	}
     var login={};
	$scope.login=login;

	$scope.logout = function(){
   		 CommonProp.logoutUser();
	}

    $scope.AddCategory = function(){
	login.loading = true;
	var title = $scope.category.title;
	
	var firebaseObj = new Firebase("https://codedoors-angularfirebase.firebaseio.com/Categories");
	
    var fb = $firebase(firebaseObj);
        
	var user = CommonProp.getUser();
	

	fb.$push({ title: title,emailId: user,'.priority': user}).then(function(ref) {
		login.loading = false;
		$location.path('/welcome');
	}, function(error) {
		login.loading = false;
  		console.log("Error:", error);
	});

    }
}]);

