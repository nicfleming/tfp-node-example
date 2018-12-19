/**
 * @file instructors.js
 * 
 * API for TFP instructors
 */

 const { Instructor } = require("./database");
 const { handleError } = require("./errors");

 // create an instructor
 function createInstructor(req, res) {
     const newInstructor = new Instructor(req.body);

     newInstructor.save()
        .then(data => {
            const message = `New Instructor: ${JSON.stringify(data)}`;
            console.log(message);
            res.json(201, data.toObject());
        })
        .catch(handleError.bind(res));
 }

 // get all instructors
 function getAllInstructors(req, res) {
     return Instructor.find()
        .exec()
        .then(dbInstructors => {
            console.log(`Instructors retrieved: ${dbInstructors.length}`);
            if (dbInstructors.length ===0) {
                return res.status(404).json({ fellows: [] })
            }
            return res.json({ fellows: dbFellows })
        })
        .catch(handleError.bind(res));
 }

 // get one Instructor
 function getOneInstructor(req, res) {
     const id = req.params.id;

     return Instructor.findById(id)
        .exec()
        .then(dbInstructor => res.json(dbInstructor.toObject()))
        .catch(handleError.bind(res));
 }

 // edit one instructor
 function editInstructor(req, res) {
     const id = req.params.id;
     const newData = req.body;

     return Instructor.findOneAndUpdate({ _id: id }, newData, {new: true })
        .exec()
        .then(dbFellow => res.json(dbFellow.toObject()))
        .catch(handleError.bind(res));
 }

 // delete one instructor
 function deleteOneInstructor(req, res) {
     const id = req.params.id;

     return Instructor.findOneAndDelete({ _id: id })
        .exec()
        .then(dbInstructor => res.json(dbInstructor.toObject()))
        .catch(handleError.bind(res));
 }


 // initialize Instructors
 function initInstructors(app) {
     app.post("/instructors", createInstructor);
     app.put("/instructors/:id", editInstructor);
     app.get("/fellows", getAllInstructors);
     app.get("/instructors/:id", getOneInstructor);
     app.delete("/instructors/:id", deleteOneInstructor);
 }

 module.exports = initInstructors;