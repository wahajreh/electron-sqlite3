const sqlite3 = require('sqlite3')

var db = new sqlite3.Database('mydb.db');
db.serialize(function () {
    // db.run(`
    // CREATE TABLE login
    // (
    //     loginId INT NOT NULL PRIMARY KEY, -- primary key column
    //     username_email [NVARCHAR](50) NOT NULL,
    //     password [NVARCHAR](50) NOT NULL,isActive bit,masterId int
    //     -- specify more columns here
    // );
    // GO`);


    var stmt = db.run("INSERT INTO login VALUES (1,'ali_ter','1234',1,1)");
    // for (var i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i);
    // }
    // var row;
    db.all("SELECT * FROM login ", function (err, row) {
        console.log(row);
    });
});
db.close();