const seed = require('./seed.js');
const pool = require("../pool.js")


const runSeed = () => {
  return seed()
  .then(() => {
    console.log("database has been seeded")
  })
  .catch((err) => {
    console.log("error seeding database",err)
  })
  .finally(() => {
    pool.end()
  })
};

runSeed();
