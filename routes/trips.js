var express = require('express');
var router = express.Router();

require('../models/connection');
const Trip = require('../models/trips');

const { capitalizeFirstLetter } = require('../modules/capitalizeFirstLetter');

// Route pour afficher l'ensemble des trajets
router.get('/', (req, res) => {
  Trip.find()
  .then(data => {
    res.json({ allTrips: data });
  })
  .catch(err => {
    res.status(500).json({ message: "Erreur dans la récupération des trajets", error: err })
  });
});


// Route pour afficher un trajet en fonction du départ et de la date
router.get('/search', (req, res) => {
  const departure =  capitalizeFirstLetter(req.query.departure.trim());
  const date =  req.query.date;
  const arrival =  capitalizeFirstLetter(req.query.arrival.trim())
  
  // Vérifiez que les paramètres requis sont présents
  if (!departure || !date || !arrival) {
    return res.status(400).json({ message: "Il nous manque une information pour faire la recherche" });
  }

  // Assurez-vous que la date est au format Date
  const formattedDate = new Date(date); 
  if (isNaN(formattedDate)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  Trip.find({
    departure: departure,
    date: { $gte: formattedDate, $lt: new Date(formattedDate.getTime() + 24 * 60 * 60 * 1000) }, // Chercher les trajets d'une journée
    arrival: arrival
  })
  .then(data => {
    if (data.length > 0) {
      res.json({ foundTrips: data }); // Renvoie tous les trajets trouvés
    } else {
      res.status(404).json({ message: "Il n'y a pas de voyages à cette date" }); // Aucune correspondance trouvée
    }
  })
  .catch(err => {
    res.status(500).json({ error: "Server error", details: err }); // Gestion des erreurs
  });
});


// Route pour rechercher par id
router.get('/trips/:id', (req, res) => {
  const tripId = req.params.id;

  Trip.findById(tripId)
    .then(trip => {
      if (trip) {
        res.json(trip);  // Renvoie un objet JSON valide
      } else {
        res.status(404).json({ message: "Le voyage n'a pas été trouvé" });  // Message d'erreur en JSON
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Erreur serveur", details: err });  // En cas d'erreur, renvoie un JSON
    });
});

// Route pour supprimer les trajets.
router.delete('/trips', (req, res) => {
  Trip.deleteMany().then(() => {
    Trip.find().then(data => {
      res.json({ allTrips: data });
    })
  });
});

module.exports = router;
