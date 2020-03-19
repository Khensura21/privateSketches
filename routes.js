const router = require('express').Router(); //look into this...
const Sketch = require("./sketchModel"); //require sketch schema

const handle_create_error = require("./utils/error_handling");


//create a sketch of of sketches
router.route("/sketches").post((req, res) => {
    const receivedSketch = {
        name: "workPlease.js",
        isPrivate: true,
    };
    Sketch.create(receivedSketch, (err, newSketch) => {
        handle_create_error(err);
        console.log(newSketch);
    })

    .catch(err => res.status(400).json('Error: ' + err));
});



//get a list of of sketches
router.route("/sketches").get((req, res) => {
    Sketch.find()
    .then(sketches => res.json(sketches))
    .catch(err => res.status(400).json("Error: " + err))
});


//updates a sketch privacy field
router.route("/sketches/:id").put((req, res) => {
    // //set id to request parameter id
    var id = req.params.id

    // //get privacy value from req body
    var privacyValue = req.body.isPrivate

    // //find sketch and ONLY update privacy field
    res.send("Hello Sketches")
    Sketch.findByIdAndUpdate(id, 
        {
         $set: {isPrivate: privacyValue}
    },{
        new: true
    })
    .then(sketch => {
        sketch.save()
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})


//this version updates the

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