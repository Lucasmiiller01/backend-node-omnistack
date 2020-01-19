module.exports = function parseStringAsArray(ArrayasString) {
  return ArrayasString.split(",").map(tech => tech.trim());
};
