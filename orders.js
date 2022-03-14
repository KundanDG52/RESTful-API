const mongoose = require('mongoose');
const Order = require("../routes/models/order");
const Product = require("../routes/models/product");

exports.orders_get_all = async (req, res, next) => {
        try {
                const docs = await Order.find()
                        .select("product qunatity _id")
                        .populate('product', 'name')
                        .exec()
                return res.status(200).json({
                        count: docs.length,
                        orders: docs.map(doc => {
                                return {
                                        _id: doc._id,
                                        product: doc.product,
                                        quantity: doc.quantity,
                                        request: {
                                                type: "GET",
                                                url: "http://localhost:3000/orders/" + doc._id
                                        }
                                };
                        })
                });
        } catch (err) {
                return res.status(500).json({
                        error: err
                });
        }
}
//         .then(docs =>{
//                 res.status(200).json({
//                         count: docs.length,
//                         orders: docs.map(doc =>{
//                                 return {
//                                         _id: doc._id,
//                                         product: doc.product,
//                                         quantity: doc.quantity,
//                                         request: {
//                                                 type: "GET",
//                                                 url: "http://localhost:3000/orders/" + doc._id
//                                         }
//                                 };
//                         })
//                 });
//         })
//         .catch(err =>{
//                 res.status(500).json({
//                         error: err
//                 });
//         });
// };

exports.orders_create_order = async (req, res, next) => {
        try {
                const product = await Product.findById(req.body.productId)
                if (!product) {
                        console.log('Product not found');
                        return res.status(404).json({
                                message: "Product not found"
                        });
                }
                const order = new Order({
                        _id: mongoose.Types.ObjectId(),
                        quantity: req.body.quantity,
                        product: req.body.productId
                })
                const result = await order.save()
                res.status(201).json({
                        message: 'Order stored',
                        createdOrder: {
                                _id: result._id,
                                product: result.product,
                        },
                        request: {
                                type: 'GET',
                                url: 'http://localhost:3000/orders/' + result._id
                        }
                });
        } catch (err) {
                return res.status(500).json({
                        error: err
                })
        }
}


//         .then(product =>{
//                 if (!product){
//                         console.log('Product not found');
//                         return res.status(404).json({
//                                 message: "Product not found"
//                         });
//                 }
//                 const order = new Order({
//                         _id: mongoose.Types.ObjectId(),
//                         quantity: req.body.quantity,
//                         product: req.body.productId
//                 })
//                 return order 
//                 .save()
//                 .then(result =>{
//                         console.log(result);
//                         res.status(201).json({
//                                 message: 'Order stored',
//                                 createdOrder: {
//                                         _id: result._id,
//                                         product: result.product,
//                                 },
//                                 request: {
//                                         type: 'GET',
//                                         url: 'http://localhost:3000/orders/' + result._id
//                                 }
//                         });
//                 });
//         })
//         .catch(err =>{
//                 console.log(err);
//                 return res.status(500).json({
//                         error: err
//                 });
//         });
// };

exports.orders_get_order = async (req, res, next) => {
        try {
                const order = await Order.findById(req.params.orderId)
                        .populate('product')
                        .exec()
                if (!order) {
                        return res.status(404).json({
                                message: 'Order not found'
                        })
                }
                res.status(200).json({
                        order: order,
                        request: {
                                type: 'GET',
                                url: 'http://localhost:3000/orders'
                        }
                });
        } catch (err) {
                res.status(500).json({
                        error: err
                });
        }
}


//         .then(order => {
//                 if (!order) {
//                         return res.status(404).json({
//                                 message: 'Order not found'
//                         })
//                 }
//                 res.status(200).json({
//                         order: order,
//                         request: {
//                                 type: 'GET',
//                                 url: 'http://localhost:3000/orders'
//                         }
//                 });
//         })
//         .catch(err =>{
//                 res.status(500).json({
//                         error: err
//                 });
//         });
// };

exports.orders_delete_order = async (req, res, next) => {
        try {
                const result = await Order.remove({
                                _id: req.params.orderId
                        })
                        .exec()
                res.status(200).json({
                        message: 'Order deleted',
                        request: {
                                type: 'POST',
                                url: 'http://localhost:3000/orders',
                                body: {
                                        productId: "ID",
                                        quantity: "Number"
                                }
                        }
                });
        } catch (err) {
                res.status(500).json({
                        error: err
                });
        }
}

//         .then(result =>{
//                 res.status(200).json({
//                         message: 'Order deleted',
//                         request: {
//                                 type: 'POST',
//                                 url: 'http://localhost:3000/orders',
//                                 body: { productId: "ID", quantity: "Number" }
//                 }
//         });
// })
//         .catch(err =>{
//                 res.status(500).json({
//                         error: err
//                 });
//         });
// };

// module.exports = {
//         orders_get_all: orders_get_all,
//         orders_get_order: orders_get_order,
//         orders_create_order: orders_create_order,
//         orders_delete_order: orders_delete_order
// 

// router.get('/', async (req, res, next) =>{
//         const response = await Product.find().exec();
//         console.log(response );
//      res.status(200).json(response );
// });