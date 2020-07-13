const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "suivi-cv",
  password: "reversez",
  port: 5432,
});
// const pool = new Pool({
//   user: "sogfnjyt",
//   host:
//     "postgres://sogfnjyt:0EWuiAq3SHWrPlmj-si1kmNwinkejrvA@kandula.db.elephantsql.com:5432/sogfnjyt",
//   database: "sogfnjyt",
//   password: "0EWuiAq3SHWrPlmj-si1kmNwinkejrvA",
//   port: 5432,
// });

module.exports = pool;
