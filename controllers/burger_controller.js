// Pull in the Burger Model
var db = require("../models");
var log = require("loglevel").getLogger("burger_controller");

module.exports = function(app) {
    //Retrieve the list of burgers in the database
    app.get("/", function(req, res) {
        log.debug("___ENTER GET /___");

        db.Burgers.findAll()
            .then(function(data) {
                var hbsObject = {
                    burgers: data
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
    app.post("/burgers", function(req, res) {
        log.debug("___ENTER POST /burgers___");

        db.Burgers.create(req.body)
            .then(function(burger) {
                res.redirect("/");
            })
            .catch(function(err) {
                log.error("ERR =" + err);
                res.json({ status: "ERROR", message: err });
            });
    });

    // Update an existing burger entry
    app.put("/burgers/:id", function(req, res) {
        log.debug("___ENTER PUT /burgers:id___");
        log.debug("id = " + req.params.id);

        db.Burgers.update({ devoured: true }, {
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