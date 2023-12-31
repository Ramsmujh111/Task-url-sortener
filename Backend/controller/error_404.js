const logger = require('../utils/Logger');
// 404 routes error handler
exports.error_404 = (_req, res) => {
  logger.error(`Error Routes not found ${404}`);
  res.status(404).json({
    status: 404,
    message: "Routes not found",
  });
};