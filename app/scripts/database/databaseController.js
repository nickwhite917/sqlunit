(function () {
    'use strict';
    angular.module('app')
        .controller('databaseController', ['databaseService', '$q', '$mdDialog', databaseController]);
    
    function databaseController(databaseService, $q, $mdDialog) {
        var self = this;
        
        self.selected = null;
        self.databases = [];
        self.selectedIndex = 0;
        self.filterText = null;
        self.selectDatabase = selectDatabase;
        self.deleteDatabase = deleteDatabase;
        self.saveDatabase = saveDatabase;
        self.createDatabase = createDatabase;
        self.filter = filterDatabase;
        
        // Load initial data
        getAllDatabases();
        
        //----------------------
        // Internal functions 
        //----------------------
        
        function selectDatabase(database, index) {
            self.selected = angular.isNumber(database) ? self.databases[database] : database;
            self.selectedIndex = angular.isNumber(database) ? database: index;
        }
        
        function deleteDatabase($event) {
            var confirm = $mdDialog.confirm()
                                   .title('Are you sure?')
                                   .content('Are you sure want to delete this Database?')
                                   .ok('Yes')
                                   .cancel('No')
                                   .targetEvent($event);
            
            
            $mdDialog.show(confirm).then(function () {
                databaseService.destroy(self.selected.database_id).then(function (affectedRows) {
                    self.databases.splice(self.selectedIndex, 1);
                });
            }, function () { });
        }
        
        function saveDatabase($event) {
            if (self.selected != null && self.selected.database_id != null) {
                databaseService.update(self.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Success')
                            .content('Data Updated Successfully!')
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
            }
            else {
                //self.selected.database_id = new Date().getSeconds();
                databaseService.create(self.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Success')
                            .content('Data Added Successfully!')
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
            }
        }
        
        function createDatabase() {
            self.selected = {};
            self.selectedIndex = null;
        }
        
        function getAllDatabases() {
            databaseService.getDatabases().then(function (databases) {
                self.databases = [].concat(databases);
                self.selected = databases[0];
            });
        }
        
        function filterDatabase() {
            if (self.filterText == null || self.filterText == "") {
                getAllDatabases();
            }
            else {
                databaseService.getByName(self.filterText).then(function (databases) {
                    self.databases = [].concat(databases);
                    self.selected = databases[0];
                });
            }
        }
    }

})();