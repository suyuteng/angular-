var app=angular.module('routingDemoApp',['ngRoute']);
/*定义过滤器实现图书库存量   */      	
app.filter("checkStatefilter",function(){
	return function(input){
		return input=="true"?"正常出售":"已经售罄";
	}
})
/*定义过滤器实现标签的提示状态*/
.filter("checkStatelabelfilter",function(){
	return function(input){
		return input=="true"?"label-success":"label-danger";
	}
});

/*路由设置*/
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{
    	templateUrl:'list.html',
    	controller:'bookstorelistcontroller'
    
    })
    .when('/:id',{
    	templateUrl:'detail.html',
    	controller:'bookstoredetailcontroller'
    	
    })
   
    .otherwise({redirectTo:'/'});
}]);
/*图书列表页的控制器*/
app.controller('bookstorelistcontroller',function($scope,$http){
	$http.get("data/books.json")
  	.success(function (response) {
  		$scope.books = response.data;
  	});
	$scope.orderBypro="price";
	$scope.showMessage=function(num){
		console.log(num.book.state);
		if(num.book.state==='true'){
			alert("你已成功将其加入购物车");
		}else{
			alert('这本书目暂不出售');
		}
		
	}
});
/*图书详情页的控制器*/
app.controller('bookstoredetailcontroller',function($scope,$http,$routeParams){
	$http.get("data/"+$routeParams.id+".json").success(function(resp){
		$scope.book=resp;
	})
	$scope.cover=$routeParams.id;
	$scope.coverSet=function(id){
		$scope.cover=id;					
		$http.get("data/"+id+".json").success(function(resp){
		$scope.book=resp;
	})
	}
});