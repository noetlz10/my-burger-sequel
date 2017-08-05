// Pull in the Burger Model
var db = require("../models");
var log = require("loglevel").getLogger("burgers_controller");

module.exports = function(app) {
    //Retrieve the list of burgers in the database
    app.get("/", function(req, res) {
        log.debug("___ENTER GET /___");

        db.Burger.findAll()
            .then(function(data) {
                var hbsObject = {
                    burger: data
                };
                console.log(hbsObject);
                res.render('index', hbsObject);
            })
            .catch(function(err) {
                log.error("ERR = " + err);
                res.json({ status: "ERROR", message: err });
            });
    });

    //Create a new burger entry
    app.post("/burger", function(req, res) {
        log.debug("___ENTER POST /burger___");

        db.Burger.create(req.body)
            .then(function(burger) {
                res.redirect("/");
            })
            .catch(function(err) {
                log.error("ERR =" + err);
                res.json({ status: "ERROR", message: err });
            });
    });

    // Update an existing burger entry
    app.put("/burger/:id", function(req, res) {
        log.debug("___ENTER PUT /burger:id___");
        log.debug("id = " + req.params.id);

        db.Burger.update({ devoured: true }, {
                where: {
                    id: req.params.id
                }
            }).then(function(burger) {
                res.redirect('/');
            })
            .catch(function(err) {
                log.error("ERR = " + err);
                res.json({ status: "ERROR", message: err });
            });
    });

};