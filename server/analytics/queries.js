const today = new Date();
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

const startOfWeek = new Date();
startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); 
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date();
endOfWeek.setDate(startOfWeek.getDate() + 6); 
endOfWeek.setHours(23, 59, 59, 999);


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

const currentWeekSales = [
  {
    $match: {
      createdAt: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
      paymentStatus: "paid",
    },
  },
  {
    $group: {
      _id: null,
      weekSales: { $sum: "$charges.items_cost" },
    },
  },
];

const currentMonthSales = [
  {
    $match: {
      createdAt: {
        $gte: startOfMonth, 
        $lte: endOfMonth  
      },
      paymentStatus: "paid" 
    }
  },
  {
    $group: {
      _id: null,
      monthlySales: { $sum: "$charges.items_cost" }
    }
  }
]

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
