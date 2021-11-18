var mysql = require('mysql');

// Configure DB properties
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'practice'
})
// Connection establishment
mysqlConnection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// Fetch records based on query passed as parameter
exports.fetchRecords = function (sql) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, function (error, results, fields) {
            if (error) reject(err);
            resolve(results);
        });
    });
}

// Add new record based on query passed as parameter
exports.addRecords = function (sql, values) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, [values], function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
}

// Update records based on query and primary id passed as parameter
exports.updateRecords = function (sql, product, id) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, [product, id], function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
}

// Delete record based on query and primary id passed as parameter
exports.deleteRecord = function (sql, id) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, [id], function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
}