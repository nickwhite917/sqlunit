(function () {
    'use strict';
    var mysql = require('mysql');
    
    // Creates MySql database connection
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "database_manager"
    });
    
    angular.module('app')
        .service('databaseService', ['$q', databaseService]);
    
    function databaseService($q) {
        return {
            getDatabases: getDatabases,
            getById: getDatabaseById,
            getByName: getDatabaseByName,
            create: createDatabase,
            destroy: deleteDatabase,
            update: updateDatabase
        };
        
        function getDatabases() {
            var deferred = $q.defer();
            var query = "SELECT * FROM Databases";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        
        function getDatabaseById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM Databases WHERE database_id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        
        function getDatabaseByName(name) {
            var deferred = $q.defer();
            var query = "SELECT * FROM databases WHERE name LIKE  '" + name + "%'";
            connection.query(query, [name], function (err, rows) {
                console.log(err)
                if (err) deferred.reject(err);
                
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        
        function createDatabase(database) {
            var deferred = $q.defer();
            var query = "INSERT INTO databases SET ?";
            connection.query(query, database, function (err, res) {
                console.log(err)
                if (err) deferred.reject(err);
                console.log(res)
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        
        function deleteDatabase(id) {
            var deferred = $q.defer();
            var query = "DELETE FROM databases WHERE database_id = ?";
            connection.query(query, [id], function (err, res) {
                if (err) deferred.reject(err);
                console.log(res);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        }
        
        function updateDatabase(database) {
            var deferred = $q.defer();
            var query = "UPDATE databases SET name = ? WHERE database_id = ?";
            connection.query(query, [database.name, database.database_id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();