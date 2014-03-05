angular.module('sample', [
    'sdk.services.couchService',
    'sdk.services.basketService',
    'sdk.filter'
])
.controller('appController', function($scope, couchService, basketService){

    var states = {
        CATEGORIES: 0,
        PRODUCTS: 1,
        PRODUCT: 2
    };

    $scope.states = states;
    $scope.state = states.CATEGORIES;

    $scope.itemCount = 0;

    var updateItemCount = function(){
        $scope.itemCount = basketService.getSummary().quantity;
    };

    updateItemCount();
    basketService.on('itemAdded', updateItemCount);

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

    $scope.openProduct = function(product){
        $scope.product = product;
        $scope.state = states.PRODUCT;
    };

    $scope.addToBasket = function(product){
        if (product){
            basketService.addItem(product, 1);
        }
    };

});


