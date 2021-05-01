const router = require("express").Router();
const path = require("path");
// const {route, put } = require("..");
const mongojsR = require('mongojs');
const { Workout } = require('../../models/index.js');

router.get("/workouts", ({ body }, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum:'$exercises.duration',
                },
            },
        },
    ])
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.get("/workouts/range", ({ body }, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum:'$exercises.duration',
                },
            },
        },
    ])
    .sort({_id: -1})
    .limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.get("/workouts/:id", (req, res) => {
    Workout.findOne(
        {
            _id: req.params.id
        },
    (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
});

router.post("/workouts", ( {body}, res) => {
    Workout.create(body)
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.put('/workouts/:id', ( req, res) => {
    Workout.findByIdAndUpdate(
        {
        _id: req.params.id
        },
    {
        $push: {
            exercises: req.body
        }
    },
    (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
});

// router.get('/workouts/range', (req, res) => {
//     Workout.aggregate([
//         {
//             $addFields: {
//                 totalDuration: {
//                     $sum: '$exercises.duration',
//                 },
//             },
//         },
//     ])
//     .sort({ _id: -1})
//     .limit(7)
//     .then((dbWorkouts) => {
//         res.json(dbWorkouts);
//     })
//     .catch((err) => {
//         res.json(err);
//     });
// });

// // get all
// route.get /api/workouts;
// post /api/workouts
// // get one
// api/workouts/:id

// api/workout/range 

// /exercise

// put('api/workouts/:id'

// html 
// display exercise.html
// Stats.js


module.exports = router;
