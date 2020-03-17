const router = require('express').Router(); //look into this...
const Sketch = require("./sketchModel.js"); //require sketch schema

//get a list of of sketches
router.route("/sketches").get((req, res) => {
    Sketch.find()
    .then(sketches => res.json(sketches))
    .catch(err => res.status(400).json('Error: ' + err));
});


//updates a sketch privacy field
router.route("/sketches/:id").put((req, res) => {
    // //set id to parameter id
    // var id = req.params.id
    // //get privacy value from req body
    // var privacyValue = req.body.isPrivate
    // //find sketch and ONLY update privacy field
    Sketch.findByIdAndUpdate(req.params.id, 
        {
            $set: {isPrivate: req.body.isPrivate}
    })
    .then(sketch =>{
        sketch.save()
        .then(() => res.json('Sketch updated!'))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})




// router.route("/sketches/:id").put((req, res) => {
//     //find sketch by mongodb generated id
//     Sketch.findById(req.params.id)
//     .then(sketch => {
//         //negate its current privacy field value 
//         sketch.isPrivate = !sketch.isPrivate
//         sketch.save() //then save it to db
//             .then(() => res.json('Sketch updated!'))
//             .catch(err => res.status(400).json('Error: ' + err))
    
//     })
//     //return error if there is one
//     .catch(err => res.status(400).json('Error: ' + err))
// })
module.exports = router;