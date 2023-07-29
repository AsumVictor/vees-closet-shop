const sendShopToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.status(statusCode).cookie("shop_token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendShopToken;
