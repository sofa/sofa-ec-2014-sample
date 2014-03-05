angular.module('sample', [
    'sdk.services.couchService',
    'sdk.services.basketService'
])
.controller('appController', function($scope, couchService){
    couchService
        .getCategory()
        .then(function(category){
            $scope.category = category;
        });

    $scope.goDeeper = function(category){
        if(category.hasChildren){
            $scope.category = category;
        }
    }
});


