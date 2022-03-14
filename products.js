const mongoose = require("mongoose");
const product = require("../routes/models/product");
const Product = require("../routes/models/product");

exports.products_get_all = async (req, res, next) => {
        try {
                const docs = await Product.find()
                        .select("name price _id")
                        .exec()
                const response = {
                        count: docs.length,
                        products: docs.map(doc => {
                                return {
                                        name: doc.name,
                                        price: doc.price,
                                        _id: doc._id,
                                        request: {
                                                type: "GET",
                                                url: "http://localhost:3000/products/" + doc._id
                                        }
                                };
                        })
                };
                res.status(200).json(response);
        } catch (err) {
                res.status(500).json({
                        error: err
                });
        }
}



//           .then(docs => {
//             const response = {
//               count: docs.length,
//               products: docs.map(doc => {
//                 return {
//                   name: doc.name,
//                   price: doc.price,
//                   _id: doc._id,
//                   request: {
//                     type: "GET",
//                     url: "http://localhost:3000/products/" + doc._id
//                   }
//                 };
//               })
//             };
//             //   if (docs.length >= 0) {
//             res.status(200).json(response);
//             //   } else {
//             //       res.status(404).json({
//             //           message: 'No entries found'
//             //       });
//             //   }
//           })
//           .catch(err => {
//             console.log(err);
//             res.status(500).json({
//               error: err
//             });
//           });
//       }; 

exports.products_create_product = async (req, res, next) => {
        try {
                const product = await new Product({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        price: req.body.price
                });
                console.log(req.body);
                product.save()
                res.status(201).json({
                        message: 'Created product successfully',
                        createProduct: {
                                name: product.name,
                                price: product.price,
                                _id: product._id,
                                url: "http://localhost:3000/products/" + product._id
                        }
                })
                console.log();
        } catch (err) {
                res.status(500).json({
                        error: err
                })
        }
}

//         .then(result=>{
//                 console.log(result);
//                 res.status(201).json({
//                         message: 'Created product successfully',
//                         createProduct: {
//                                 name : result.name,
//                                 price: result.price,
//                                 _id: result._id,
//                                 url: "http://localhost:3000/products/" + result._id
//                         }
//         })
// })
//         .catch(err => {
//                 console.log(err)
//                 res.status(500).json({
//                         error: err
//                 })
//         });
// };

exports.products_get_product = async (req, res, next) => {
        try {
                const response = await Product.findById(req.params.productId)
                        .select('name price _id')
                        .exec()
                        console.log(response);
                if (response) {
                        res.status(200).json({
                                product: response,
                                request: {
                                        type: 'GET',
                                        url: "http://localhost:3000/products/"
                                }
                        });
                } else {
                        res.status(404).json({
                                message: 'No valid entry found for provided ID'
                        });
                }
        } catch (err) {
                console.log(err)
                res.status(500).json({
                        error: err
                })
        }
}
// .then(doc =>{
//         console.log('From database',doc);
//         if (doc) {
//                 res.status(200).json({
//                         product: doc,
//                         request:{
//                                 type:'GET',
//                                 url:"http://localhost:3000/products/" 
//                         }
//                 });
//         }else {
//                 res.status(404).json({message: 'No valid entry found for provided ID'});
//         }        
// })
// .catch(err => {
//         console.log(err)
//         res.status(500).json({
//                 error: err
//         })
// })


exports.products_update_product = async (req, res, next) => {
        try {
                const id = await req.params.productId;
                const updateOps = {};
                for (const ops of req.body) {
                        updateOps[ops.propName] = ops.value;
                }
                Product.updateOne({
                                _id: id
                        }, {
                                $set: updateOps
                        })
                        .exec().then(id => {
                                res.status(200).json({
                                        message: 'Product updated',
                                        request: {
                                                type: 'GET',
                                                url: "http://localhost:3000/products/" + id
                                        }
                                })
                        })
        } catch (err) {
                console.log(err);
                res.statusbar(500).json({
                        error: err
                });
        }
}
//         .then(result=>{
//                 res.status(200).json({
//                         message: 'Product updated',
//                         request:{
//                                 type:'GET',
//                                 url: "http://localhost:3000/products/" + id
//                         }
//                 })
//         })
//         .catch(err =>{
//                 console.log(err);
//                 res.statusbar(500).json({
//                         error: err
//                 });
//         });
// };

exports.products_delete = async (req, res, next) => {
        try {
                const id = await req.params.productId;
                Product.remove({
                                _id: id
                        })
                        .exec()
                res.status(200).json({
                        message: 'Product deleted',
                        request: {
                                type: 'POST',
                                url: "http://localhost:3000/products/",
                                body: {
                                        name: 'String',
                                        price: 'Number'
                                }
                        }
                });
        } catch (error) {
                console.log(err);
                res.status(500).json({
                        error: err
                });
        }
}





//         .then(result => {
//                 res.status(200).json({
//                         message: 'Product deleted',
//                         request: {
//                                 type: 'POST',
//                                 url: "http://localhost:3000/products/",
//                                 body: { name: 'String', price: 'Number' }
//                         }
//                 });
//         })
//         .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                         error: err
//                 });
//         });
// }; 