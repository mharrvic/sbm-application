'use strict';

/* Warehouse order Controller */

app.controller('warehouseOrderCtrl', ['$scope', 'Username', '$rootScope', 'DBAccess', 'dateFormatter', function($scope, Username, $rootScope, DBAccess, dateFormatter) {
    Username.popup();

    /* 
        Initialize Warehouse Item 
    */
    var initWarehouse = function() {
        $scope.warehouse_display = [];
        $scope.category = ['All'];
        $scope.datenow = dateFormatter.slashFormat(new Date());
        var query = "SELECT id, _id, name, uom, category_name FROM inventory WHERE status = 1";
        DBAccess.execute(query, []).then(function(res) {
            /* Contain Warehouse Item */
            $scope.warehouse_item = res;
            $scope.warehouse_display = res;

            /* Load category */
            angular.forEach($scope.warehouse_item, function(value) {
                if ($scope.category.indexOf(value.category_name) == -1) {
                    $scope.category.push(value.category_name);
                }
            });
        }, function(err) {
            Log.write(err);
        });
    };

    /*
        Function for Filterin Warehous Item by category
    */
    $scope.filterByCategory = function(x) {
        $scope.warehouse_display = [];
        if (x == 'All') {
            $scope.warehouse_display = $scope.warehouse_item;
        } else {
            angular.forEach($scope.warehouse_item, function(value) {
                if (x == value.category_name) {
                    $scope.warehouse_display.push(value);
                }
            });
        }
    };

    var unregisterUser = $rootScope.$on('user', function(event, data) {
        unregisterUser();
        $scope.user = data;
        $scope.employee_name = $scope.user.name;
        initWarehouse();
    });
}]);