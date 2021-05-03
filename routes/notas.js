var express = require('express');
var router = express.Router();

// select all
router.get('/', function (req, res, next){
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM notas", function(err,rows){
            if (err && rows.length>0){
                res.json(rows);
            } else {
                res.json([])
            }
        });
    });
});

// select by ID 
function selectNoteById (){
router.get('/:id', function (req, res, next){
    pool.getConnection(function(err, connection) {
        var id = params.id;
        connection.query("SELECT * FROM produtos WHERE id='" + id + "' LIMIT 1", function (err, rows){
            if (err && rows.length>0){
                res.json(rows);
            } else {
                res.json([])
            }
        });
    });
});
}

// Isert Notes
function insertNotes(){
router.post('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var dados = req.body;
        var nota = dados.note;

        connection.query(
            "INSERT INTO notas (nota) VALUES ('"
            + nota + "')", function (err, rows) {

                if (rows.affectedRows) {
                    connection.query("SELECT * FROM notas WHERE id='" + rows.insertId
                        + "' LIMIT 1", function (err, rows) {
                            if (!err && rows.length > 0) {
                                res.json(rows);
                            } else {
                                res.json([]);
                            }
                        });
                }
            });
    });
});
}

// Delete note
router.delete('/:id', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var id = req.params.id;
        connection.query("DELETE FROM notas WHERE id='" + id +
            "'", function (err, rows) {
                if (!err) {
                    res.json({
                        "Excluído": true
                    });
                } else {
                    res.json([]);
                }
            });
    });
});

// Update note
router.put('/:id', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var dados = req.body;
        var id = req.params.id;
        var nome = dados.nome;

        connection.query(
            "UPDATE nota SET nota='" + nota +
            "'WHERE id='" + id +
            "'", function (err, rows) {

                if (rows.affectedRows) {
                    connection.query("SELECT * FROM nota WHERE id='" + id
                        + "' LIMIT 1", function (err, rows) {
                            if (!err && rows.length > 0) {
                                res.json(rows[0]);
                            } else {
                                res.json([]);
                            }
                        });
                }
            });
    });
});

module.exports = router;