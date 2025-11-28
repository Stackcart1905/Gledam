// import User from '../models/user.model.js';
// import Order from '../models/order.model.js';
// import Product from '../models/productSchema.js';

// // Get owner dashboard statistics
// export const getOwnerStats = async (req, res) => {
//   try {
//     // Check if user is owner
//     const user = await User.findOne({ email: req.auth.user.email });
//     if (!user || user.role !== 'owner') {
//       return res.status(403).json({ success: false, message: 'Access denied. Owner only.' });
//     }

//     const [
//       totalUsers,
//       totalOrders,
//       totalRevenue,
//       totalProducts,
//       recentUsers,
//       recentOrders
//     ] = await Promise.all([
//       User.countDocuments(),
//       Order.countDocuments(),
//       Order.aggregate([
//         { $match: { status: 'completed' } },
//         { $group: { _id: null, total: { $sum: '$totalAmount' } } }
//       ]),
//       Product.countDocuments(),
//       User.find({}, '-password').sort({ createdAt: -1 }).limit(5),
//       Order.find()
//         .populate('userId', 'fullName email')
//         .sort({ createdAt: -1 })
//         .limit(5)
//     ]);

//     res.json({
//       success: true,
//       stats: {
//         totalUsers,
//         totalOrders,
//         totalRevenue: totalRevenue[0]?.total || 0,
//         totalProducts,
//         recentUsers,
//         recentOrders
//       }
//     });
//   } catch (error) {
//     console.error('Owner stats error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // Get user growth data for charts
// export const getUserGrowth = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.auth.user.email });
//     if (!user || user.role !== 'owner') {
//       return res.status(403).json({ success: false, message: 'Access denied. Owner only.' });
//     }

//     const userGrowth = await User.aggregate([
//       {
//         $group: {
//           _id: {
//             year: { $year: '$createdAt' },
//             month: { $month: '$createdAt' }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $sort: { '_id.year': 1, '_id.month': 1 }
//       },
//       {
//         $limit: 12
//       }
//     ]);

//     res.json({ success: true, userGrowth });
//   } catch (error) {
//     console.error('User growth error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // Get product performance data
// export const getProductPerformance = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.auth.user.email });
//     if (!user || user.role !== 'owner') {
//       return res.status(403).json({ success: false, message: 'Access denied. Owner only.' });
//     }

//     const productPerformance = await Product.aggregate([
//       {
//         $lookup: {
//           from: 'orders',
//           localField: '_id',
//           foreignField: 'items.productId',
//           as: 'orders'
//         }
//       },
//       {
//         $addFields: {
//           totalSales: { $size: '$orders' },
//           totalRevenue: { $sum: '$orders.totalAmount' }
//         }
//       },
//       {
//         $sort: { totalSales: -1 }
//       },
//       {
//         $limit: 10
//       },
//       {
//         $project: {
//           name: 1,
//           totalSales: 1,
//           totalRevenue: 1,
//           price: 1
//         }
//       }
//     ]);

//     res.json({ success: true, productPerformance });
//   } catch (error) {
//     console.error('Product performance error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // Get recent orders with details
// export const getRecentOrders = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.auth.user.email });
//     if (!user || user.role !== 'owner') {
//       return res.status(403).json({ success: false, message: 'Access denied. Owner only.' });
//     }

//     const recentOrders = await Order.find()
//       .populate('userId', 'fullName email')
//       .populate('items.productId', 'name price')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     res.json({ success: true, recentOrders });
//   } catch (error) {
//     console.error('Recent orders error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };