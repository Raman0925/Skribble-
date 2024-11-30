const { ApiResponse } = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");

const healthcheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "OK", "Health check passed"));
});

module.exports = { healthcheck };
