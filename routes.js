const router = require('express').Router(); //look into this...
const Sketch = require("./sketchModel.js"); //require sketch schema


//simple find and update endpoints////
// GET /sketches
// router.route("/sketches").get(...
// router.route("/sketches/:id").put(....
// Cassie Tarakajian2:56 PM
// route.route("/sketches").post(...
// router.route("/sketches/:id").delete(...
// Cassie Tarakajian2:57 PM
// router.route("/sketches/:id").get(....
//find and return all sketches 


router.route("/").get((req, res) => {
    Sketch.find()
    .then(sketches => res.json(sketches))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates all sketches 
router.route("/update/:id").put((req, res) => {
    //find sketch by mongodb generated id
    Sketch.findById(req.params.id)
    .then(sketch => {
        //negate its current privacy field value 
        sketch.isPrivate = !sketch.isPrivate
        sketch.save() //then save it to db
            .then(() => res.json('Sketch updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
    
    })
    //return error if there is one
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;