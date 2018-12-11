/**
 * @file errors.js
 *
 * Define error handling and I guess some logging too
 */

/**
 * Common handler for errors returned from Mongoose inside express routes
 */
const handleError = (err) => {
  console.error(err);
  return this.status(500).json({error});
};

/**
 * Middelware for logging our endpoints.
 *
 * next() allows the next handler to run.
 */
const logEndpointHits = (req, res, next) => {
  console.log(`Endpoint hit: ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = { handleError, logEndpointHits }