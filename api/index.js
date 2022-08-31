const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')


router.get('/', (req, res) => {
    console.log(req.query)
    var db = new sqlite3.Database('mydb.db');
    db.serialize(function () {
        var row;
        db.all("SELECT rowid AS id, info FROM lorem", function (err, row) {
            // console.log(row.id + ": " + row.info);
            res.status(200).json({ code: 0, message: true, data: req.query })
        });
    });
    db.close();
})

module.exports = router