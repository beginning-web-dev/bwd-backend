const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3d";

module.exports = {
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
