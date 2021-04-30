const router = require("express").Router();
const path = require("path");
// const {route, put } = require("..");
const { Workout } = require('../../models/index.js');

router.get("/api/workouts", ({ body }, res) => {
    Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", ({ body }, res) => {
    Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/:id", ({ body }, res) => {
    Workout.findOne(
        {
            _id: mongojs.ObjectId(req.params.id)
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

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("api/workouts/:id", ({ body }, res) => {
    Workout.findByIdAndUpdate(
        {
        _id: mongojs.ObjectId(req.params.id),
        },
    {
        $push: {
            exercises: body
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

router.get('api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .sort({ _id: -1})
    .limit(7)
    .then((dbWorkouts) => {
        res.json(dbWorkouts);
    })
    .catch((err) => {
        res.json(err);
    });
});

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
