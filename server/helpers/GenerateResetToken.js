const crypto = require("crypto");
const GenerateToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buffer) => {
      if (err) {
        return GenerateToken();
      } else {
        let token = buffer.toString("hex");
        resolve(token);
      }
    });
  });
};

function expiresIn(n) {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + n * 60000);
  return futureDate;
}

const getResetURL = (token, email) => {
  let URL;
  if (process.env.NODE_ENV !== "PRODUCTION") {
    URL = `http://localhost:5173/reset?href=${token}&m=${email}`;
  } else {
    URL = `https://veescloset.onrender.com/reset?href=${token}&m=${email}`;
  }

  return URL;
};

module.exports = { GenerateToken, expiresIn, getResetURL};
