/**
 * @file fellows.js
 *
 * This file describes some API endpoints for TFP fellows.
 */

const { Fellow } = require("./database");
const { handleError } = require("./errors");

/**
 * Create a Fellow
 *
 * @param {Request} req
 * @param {Response} res
 */
function createFellow(req, res) {
  // Initialize a new mongoose model
  const newFellow = new Fellow(req.body);

  /**
   * Save the initialized fellow.
   *
   * Model.save() can take a callback as an argument, or you can just
   * chain a .then() on the end and it will work like a promise!
   *
   * E.g.:
   * newFellow.save(function(error, data) {
   *   const message = `New Fellow: ${JSON.stringify(data)}`;
   *   console.log(message);
   *   res.json({message});
   * });
   */
  newFellow
    .save()
    .then(data => {
      const message = `New Fellow: ${JSON.stringify(data)}`;
      console.log(message);
      res.json(201, data.toObject());
    })
    .catch(handleError.bind(res));
}

/**
 * Retrieve all Fellows
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
function getAllFellows(req, res) {
  return Fellow.find()
    .exec()
    .then(dbFellows => {
      console.log(`Fellows retrieved: ${dbFellows.length}`);
      if (dbFellows.length === 0) {
        return res.status(404).json({ fellows: [] })
      }
      return res.json({ fellows: dbFellows })
    })
    .catch(handleError.bind(res));
}

/**
 * Retrieve one Fellow
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
function getOneFellow(req, res) {
  const id = req.params.id;

  return Fellow.findById(id)
    .exec()
    .then(dbFellow => res.json(dbFellow.toObject()))
    .catch(handleError.bind(res));
}

/**
 * Edit one Fellow
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
function editFellow(req, res) {
  const id = req.params.id;
  const newData = req.body;

  return Fellow.findOneAndUpdate({ _id: id }, newData, { new: true })
    .exec()
    .then(dbFellow => res.json(dbFellow.toObject()))
    .catch(handleError.bind(res));
}

/**
 * Delete one Fellow
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
function deleteOneFellow(req, res) {
  const id = req.params.id;

  return Fellow.findOneAndDelete({ _id: id })
    .exec()
    .then(dbFellow => res.json(dbFellow.toObject()))
    .catch(handleError.bind(res));
}

function favoriteNewInstructor(req, res) {
  const fellowId = req.params.fellowId;

  return Fellow.getOneFellow({_id: fellowId})
    .populate('favoriteInstructor')
    .exec()
    .then(dbFellow => res.json(dbFellow.toObject()))
    .catch(handleError.bind(res));
  
    // if (Fellow.getOneFellow({_id: fellowId}) != null){
  //   // TODO: is this the right way to check if the fellow exists?
  //   // should i do some kind of .exec.catch thing?
  //   // then create instructor and assign id of new instructor to fellow
  //   // successful response is modified fellow object


  // }
}


/**
 * Initialize Fellows
 * @param {Express Application} app
 */
function initFellows(app) {
  app.post("/fellows", createFellow);
  app.put("/fellows/:id", editFellow);
  app.get("/fellows", getAllFellows);
  app.get("/fellows/:id", getOneFellow);
  app.delete("/fellows/:id", deleteOneFellow);
  app.post("/fellows/:fellowId/favoriteNewInstructor", favoriteNewInstructor);

}

// const fellows = [
//   {
//     name: "Arjun",
//     favoriteInstructor: "Taylor"
//   },
//   {
//     name: "Brennan",
//     favoriteInstructor: "Taylor"
//   },
//   {
//     name: "Nick",
//     favoriteInstructor: "Taylor"
//   },
//   {
//     name: "Patrick",
//     favoriteInstructor: "Taylor"
//   },
//   {
//     name: "Azzya",
//     favoriteInstructor: "Taylor"
//   },
//   {
//     name: "Kassidy",
//     favoriteInstructor: "Taylor"
//   },
//   {
//     name: "Britney",
//     favoriteInstructor: "Taylor"
//   }
// ];

module.exports = initFellows;
