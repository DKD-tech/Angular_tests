// Nous allons creer nos chemins correspondant à nos routes
//Avant la creation du premier routes, connectons mongoDB et etablissons la connection0
// Telechargeons mongodb et installons

const { json } = require("body-parser");
const express = require("express"); // utilisation du module express
const app = express(); // creons une application express
const bookRoute = express.Router(); // cette ligne est important
let Book = require("../models/Book");

// Ajoutons des angulartest( il peut representer des lies en exemples) sur l'interface
bookRoute.route("/add-book").post((req, res, next) => {
  Book.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
//Recuperons tous les book de l'interface
bookRoute.route("/").get((req, res) => {
  Book.find((error, data) => {
    if (error) {
      return next (error);
    } else {
      res.json(data);
    }
  });
});
//Trouver book à travers son ID
bookRoute.route("/read-book/:id").get((req, res) => {
  Book.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
//mis à jour book à travers son ID
bookRoute.route("/update-book/:id").put((req, res, next) => {
  Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("mis à jour en succès!");
      }
    }
  );
});
//suprrimer book à travers son ID
bookRoute.route("/delete-book/:id").delete((req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
// Exporter enfin le module ...
module.exports = bookRoute;
 
