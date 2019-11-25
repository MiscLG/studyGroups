const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRoutes = express.Router();
const addressRoutes = express.Router();
const scheduleEntryRoutes = express.Router();
const preferencesRoutes = express.Router();
const courseRoutes = express.Router();
const studyLocationRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/study_groups_test", {
  useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

let Student = require("./student.model");
let Address = require("./address.model");
let ScheduleEntry = require("./scheduleEntry.model");
let Preferences = require("./preferences.model");
let Course = require("./course.model");
let StudyLocation = require("./studyLocation.model");

studentRoutes.route("/").get((req, res) => {
  Student.find((error, students) =>
    error ? console.log(error) : res.json(students)
  );
});

studentRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Student.findById(id, function(err, student) {
    res.json(student);
  });
});

studentRoutes.route("/update/:id").post((req, res) => {
  Student.findById(req.params.id, (err, student) => {
    if (!student) {
      res.status(404).send("data is not found");
    } else {
      student._id = req.body._id;
      student.student_name = req.body.student_name;
      student._student_address = req.body._student_address;
      student._student_schedule = req.body._student_schedule;
      student._student_preferences = req.body._student_preferences;

      student
        .save()
        .then(student => {
          res.json("Student updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

studentRoutes.route("/add").post((req, res) => {
  let student = new Student(req.body);
  student
    .save()
    .then(
      res
        .status(200)
        .json({ student: "student added successfully", id: student.id })
    )
    .catch(res.status(400).send("adding new student failed"));
});

app.use("/students", studentRoutes);

////// This section is for Address Routes

addressRoutes.route("/").get(function(req, res) {
  Address.find(function(err, addresses) {
    if (err) {
      console.log(err);
    } else {
      res.json(addresses);
    }
  });
});

addressRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Address.findById(id, function(err, address) {
    res.json(address);
  });
});

addressRoutes.route("/update/:id").post(function(req, res) {
  Address.findById(req.params.id, function(err, address) {
    if (!address) {
      res.status(404).send("data is not found");
    } else {
      address.address_name = req.body.address_name;
      address.address_street = req.body.address_street;
      address.address_city = req.body.address_city;
      address.address_zip = req.body.address_zip;

      address
        .save()
        .then(address => {
          res.json("Address updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

addressRoutes.route("/add").post(function(req, res) {
  let address = new Address(req.body);
  address
    .save()
    .then(address => {
      res
        .status(200)
        .json({ address: "address added successfully", id: address.id });
    })
    .catch(err => {
      res.status(400).send("adding new address failed");
    });
});

app.use("/addresses", addressRoutes);

////// This section is for scheduleEntry Routes

scheduleEntryRoutes.route("/").get(function(req, res) {
  ScheduleEntry.find(function(err, scheduleEntries) {
    if (err) {
      console.log(err);
    } else {
      res.json(scheduleEntries);
    }
  });
});

scheduleEntryRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  ScheduleEntry.findById(id, function(err, scheduleEntry) {
    res.json(scheduleEntry);
  });
});

scheduleEntryRoutes.route("/update/:id").post(function(req, res) {
  ScheduleEntry.findById(req.params.id, function(err, scheduleEntry) {
    if (!scheduleEntry) {
      res.status(404).send("data is not found");
    } else {
      scheduleEntry.start_time = req.body.start_time;
      scheduleEntry.end_time = req.body.end_time;
      scheduleEntry.day = req.body.day;

      scheduleEntry
        .save()
        .then(scheduleEntry => {
          res.json("Schedule Entry updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

scheduleEntryRoutes.route("/add").post(function(req, res) {
  let scheduleEntry = new ScheduleEntry(req.body);
  scheduleEntry
    .save()
    .then(scheduleEntry => {
      res
        .status(200)
        .json({ scheduleEntry: "schedule entry added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new schedule entry failed");
    });
});

app.use("/scheduleEntries", scheduleEntryRoutes);

//// This section is for studyLocation Routes
studyLocationRoutes.route("/").get(function(req, res) {
  StudyLocation.find(function(err, studyLocations) {
    if (err) {
      console.log(err);
    } else {
      res.json(studyLocations);
    }
  });
});

studyLocationRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  StudyLocation.findById(id, function(err, studyLocation) {
    res.json(studyLocation);
  });
});

studyLocationRoutes.route("/update/:id").post(function(req, res) {
  StudyLocation.findById(req.params.id, function(err, studyLocation) {
    if (!studyLocation) {
      res.status(404).send("data is not found");
    } else {
      studyLocation.studyLocation_name = req.body.studyLocation_name;
      studyLocation.studyLocation_noise_level =
        req.body.studyLocation_noise_level;
      studyLocation.studyLocation_availability =
        req.body.studyLocation_availability;
      studyLocation._studyLocation_address = req.body._studyLocation_address;
      studyLocation._studyLocation_schedule = req.body._studyLocation_schedule;

      studyLocation
        .save()
        .then(studyLocation => {
          res.json("Study Location updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

studyLocationRoutes.route("/add").post(function(req, res) {
  let studyLocation = new StudyLocation(req.body);
  studyLocation
    .save()
    .then(studyLocation => {
      res
        .status(200)
        .json({ studyLocation: "study Location added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new study location failed");
    });
});

app.use("/studyLocations", studyLocationRoutes);

//////// This section is for course Routes

courseRoutes.route("/").get(function(req, res) {
  Course.find(function(err, courses) {
    if (err) {
      console.log(err);
    } else {
      res.json(courses);
    }
  });
});

courseRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Course.findById(id, function(err, course) {
    res.json(course);
  });
});

courseRoutes.route("/update/:id").post(function(req, res) {
  Course.findById(req.params.id, function(err, course) {
    if (!course) {
      res.status(404).send("data is not found");
    } else {
      course._id = req.body._id;
      course.course_name = req.body.course_name;
      course.course_instructor_name = req.body.course_instructor_name;
      course._course_roster = req.body._course_roster;
      course._course_schedule = req.body._course_schedule;

      course
        .save()
        .then(course => {
          res.json("Course updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

courseRoutes.route("/add").post(function(req, res) {
  let course = new Course(req.body);
  course
    .save()
    .then(course => {
      res.status(200).json({ course: "course added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new course failed");
    });
});

app.use("/courses", courseRoutes);

/////// This deals with preferences routes

preferencesRoutes.route("/").get(function(req, res) {
  Preferences.find(function(err, preferences) {
    if (err) {
      console.log(err);
    } else {
      res.json(preferences);
    }
  });
});

preferencesRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Preferences.findById(id, function(err, preference) {
    res.json(preference);
  });
});

preferencesRoutes.route("/update/:id").post(function(req, res) {
  Preferences.findById(req.params.id, function(err, preferences) {
    if (!preferences) {
      res.status(404).send("data is not found");
    } else {
      preferences.preference_noise_level = req.body.preference_noise_level;
      preferences.preference_distance = req.body.preference_distance;
      preferences.preference_study_duration =
        req.body.preference_study_duration;

      preferences
        .save()
        .then(preferences => {
          res.json("Preferences updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

preferencesRoutes.route("/add").post(function(req, res) {
  let preferences = new Preferences(req.body);
  preferences
    .save()
    .then(preferences => {
      res.status(200).json({ preferences: "preferences added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new preferences failed");
    });
});

app.use("/preferences", preferencesRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
