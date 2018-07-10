"use strict";

const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
module.exports = {
  NODE_ENV: '"production"',
<<<<<<< HEAD
  BASE_API: '"http://39.105.132.61:8080/StuService"'
=======
  BASE_API: '"/StuService"'
>>>>>>> 202347628e9a817259acdce9fec25e91d5689851
};
