'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCtrl'
  });
}])

.controller('AddPostCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
     
	if(!CommonProp.getUser()){
    $location.path('/home');
}
     var login={};
$scope.login=login;
$scope.navbar = true;

	$scope.logout = function(){
    CommonProp.logoutUser();
}
	var firebaseObjCategories = new Firebase("https://codedoors-angularfirebase.firebaseio.com/Categories");
    var sync = $firebase(firebaseObjCategories);
    console.log('sync categories;;;');
    console.log(sync.$asArray());
    $scope.categories = sync.$asArray();
    console.log('ARTILE SCOPE');
    $scope.AddPost = function(){
		login.loading = true;
		var title = $scope.article.title;
	    var post = $scope.article.post;
	    var category = $scope.article.categorySelect;
		

		var firebaseObj = new Firebase("https://codedoors-angularfirebase.firebaseio.com/Articles");
		
	    	var fb = $firebase(firebaseObj);
	        
		var user = CommonProp.getUser();
		

		fb.$push({ title: title,post: post,emailId: user, category: category,'.priority': user }).then(function(ref) {
			login.loading = false;
			$location.path('/welcome');
		}, function(error) {
			login.loading = false;
	  		console.log("Error:", error);
		});

    }
}]);

