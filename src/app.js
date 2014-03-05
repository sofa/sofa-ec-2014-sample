angular.module('sample', [
    'sdk.services.couchService',
    'sdk.services.basketService',
    'sdk.filter'
])
.controller('appController', function($scope, couchService){

    var states = {
        CATEGORIES: 0,
        PRODUCTS: 1,
        PRODUCT: 2
    };

    $scope.states = states;
    $scope.state = states.CATEGORIES;

    couchService
        .getCategory()
        .then(function(category){
            $scope.category = category;
        });

    $scope.goDeeper = function(category){
        if(category.hasChildren){
            $scope.category = category;
        }
        else {

            couchService
                .getProducts(category.urlId)
                .then(function(products){
                    $scope.products = products;
                    $scope.state = states.PRODUCTS;
                });
        }
    };
});


