const { Order } = require("../models/orders");

async function getTrackingID() {
  let length = Math.floor(Math.random() * 5) + 8;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  let existingId = await Order.findOne({ tracking_no: result });
  if (existingId) {
    return getTrackingID();
  }
  return result;
}

module.exports = getTrackingID 
