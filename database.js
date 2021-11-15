const mysql = require("mysql2");
// Create connections
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "magneexdb",
  password: "zolk9897"
});

// Create database
// connection.query("CREATE DATABASE magneexdb",
// function(err, results) {
//   if(err) console.log(err);
//   else console.log("База данных создана");
// });

// Create tables
// sql =  `CREATE TABLE IF NOT EXISTS project (
//         idproject int NOT NULL AUTO_INCREMENT,
//         project_name varchar(45) DEFAULT NULL,
//         project_monday varchar(45) DEFAULT NULL,
//         project_tuesday varchar(45) DEFAULT NULL,
//         project_wednesday varchar(45) DEFAULT NULL,
//         project_thursday varchar(45) DEFAULT NULL,
//         project_friday varchar(45) DEFAULT NULL,
//         project_saturday varchar(45) DEFAULT NULL,
//         project_sunday varchar(45) DEFAULT NULL,
//         PRIMARY KEY (idproject)
//         ) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
//         CREATE TABLE IF NOT EXISTS users (
//         idusers int NOT NULL AUTO_INCREMENT,
//         name varchar(45) DEFAULT NULL,
//         PRIMARY KEY (idusers),
//         UNIQUE KEY idusers_UNIQUE (idusers)
//         )ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

// connection.query(sql, function(err, results) {
//     if(err) console.log(err);
//     else console.log("Таблица создана");
// });

//EXPORTS
module.exports.connection = connection  