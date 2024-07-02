const pool = require("../pool.js");
const { users, workouts, exercises } = require("../initial-data.js");
const bcrypt = require("bcrypt");

const seed = () => {
  return pool
    .query(`DROP TABLE IF EXISTS exercises;`)
    .then(() => pool.query(`DROP TABLE IF EXISTS workouts;`))
    .then(() => pool.query(`DROP TABLE IF EXISTS users;`))
    .then(() =>
      pool.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `)
    )
    .then(() =>
      pool.query(`
      CREATE TABLE workouts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `)
    )
    .then(() =>
      pool.query(`
CREATE TABLE IF NOT EXISTS exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  reps TEXT NOT NULL,
  workout_id INT,
  user_id INT,
  FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
    `)
    )
    .then(() => {
      const userPromises = users.map(({ username, password }) => {
        return bcrypt.hash(password, 10).then((hashedPassword) => {
          return [username, hashedPassword];
        });
      });

      return Promise.all(userPromises);
    })
    .then((userValues) => {
      return pool.query(`INSERT INTO users (username, password) VALUES ?`, [
        userValues,
      ]);
    })
    .then(() => {
      const workoutValues = workouts.map(({ title, summary, user_id }) => {
        return [title, summary, user_id];
      });

      return pool.query(
        `INSERT INTO workouts (title, summary, user_id) VALUES ?`,
        [workoutValues]
      );
    })
    .then(() => {
      const exercisesValues = exercises.map(({ title, reps, workout_id,user_id }) => {
        return [title, reps, workout_id,user_id];
      });

      return pool.query(
        `INSERT INTO exercises (title, reps, workout_id,user_id) VALUES ?`,
        [exercisesValues]
      );
    })
    .then(() => {
      // console.log("Database seeded successfully!");
    })
    .catch((error) => {
      console.error("Error seeding database:", error);
    })
    .finally(() => {});
};

module.exports = seed;
