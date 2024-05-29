const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
// const bodyParser = require("body-parser");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");

    // Now that you're connected, you can start your Express app
    app.use(
      cors({
        origin: "http://localhost:3000", // Allow requests from your React app
        credentials: true, // Allow credentials (cookies, HTTP authentication)
      })
    );
    app.use(cookieParser());
    app.use(express.json());
    // app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/", require("./routes/AuthRoutes"));
    app.use("/users", require("./routes/UserRoutes"));
    app.use("/workouts", require("./routes/WorkoutRoutes"));
    app.use("/messages", require("./routes/MessageRoutes"))
    app.use("/", require("./routes/Chat"));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();
