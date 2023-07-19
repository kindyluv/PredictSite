const notFound = (req, res, next) => {
  res.status(404).send("Invalid route not found!!!!");
};

module.exports = notFound;
