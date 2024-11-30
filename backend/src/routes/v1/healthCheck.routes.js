const { healthcheck } = require("../../controller/healthcheck.controller");
const express = require("express");
const router = express.Router();

router.route("/").get(healthcheck);

module.exports = { router };
