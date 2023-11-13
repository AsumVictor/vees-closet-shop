const startOfMonth = new Date();
startOfMonth.setHours(0, 0, 0, 0);
startOfMonth.setDate(1);

const endOfMonth = new Date(startOfMonth);

const startOfWeek = new Date();
startOfWeek.setHours(0, 0, 0, 0);
startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); 

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 7); 
const dailySales = [
  {
    $match: {
      createdAt: {
        $gte: new Date(new Date().setHours(00, 00, 00)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
      paymentStatus: {
        $eq: "paid",
      },
    },
  },
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt",
        },
      },
      dailySales: { $sum: "$charges.items_cost" },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
];

endOfMonth.setMonth(endOfMonth.getMonth() + 1); 
const currentWeekSales = [
  {
    $match: {
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
      paymentStatus: {
        $eq: "paid",
      },
    },
  },
  {
    $group: {
      _id: null,
      totalSales: { $sum: "$total_price" },
    },
  },
];

const currentMonthSales = [
  {
    $match: {
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
      paymentStatus: {
        $eq: "paid",
      },
    },
  },
  {
    $group: {
      _id: null,
      totalSales: { $sum: "$total_price" },
    },
  },
];

/*
 * Daily sale
 * Weekly Sale
 * Monthly sales
 * Sales by date
 * Sales by months
 * Sales by year
 
 -----------------------------------------
 ORDERS
 - Total pending orders
 - Total shipped orders today
 - Total shipped this week
 - Total shipped order by date

 --------------------------------------
 * Total Products in stock now
 * Total products in stock this week
 * decreasing or increasing

 */

module.exports = {
  dailySales,
  currentWeekSales,
  currentMonthSales,
};
