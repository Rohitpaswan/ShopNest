/** generate jsonwebtoken */
const jwt = require("jsonwebtoken");

const generateToken = (payload, secretKey, jwtExpiration) => {
  // type checking of paload , secret key
  
  if (typeof payload !== "object" || !payload)
    throw new Error("payload must not be null", payload);
  if (typeof secretKey !== "string" || !secretKey)
    throw new Error("Key must not be null");
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: jwtExpiration });
    return token;
  } catch (e) {
    console.error("Token signing failed", e.message);
  }
};
module.exports = generateToken;
