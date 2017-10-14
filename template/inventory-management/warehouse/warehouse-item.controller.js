/* 
    Warehouse Item Modal Records Controller

*/

app.controller('warehouseItemCtrl', ['$scope', '$rootScope', 'Modal', function($scope, $rootScope, Modal) {
    $scope.data = $rootScope.warehouse_item_record;
    console.log($scope.data);

    /*
        Function for close transaction summary
    */
    $scope.closeSummary = function() {
        Modal.hide();
    };

}]);