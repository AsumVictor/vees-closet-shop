const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("x-eY5s", token, options).json({
    success: true,
    token,
  });
};

module.exports = sendToken;
