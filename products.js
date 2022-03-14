const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsConstroller = require('../controllers/products');
// const multer = require('multer');

// const storage = multer.diskStorage({
//         destination: function(req, file, cb) {
//                 cb(null, './uploads/');
//         },
//         filename: function(req, file, cb) {
//                 cb(null, new Date().toISOString() + file.originalname);
//         }
// });

// const upload = multer({storage: storage});

const Product = require('../routes/models/product.js');

router.get('/', ProductsConstroller.products_get_all);

router.post('/', checkAuth, ProductsConstroller.products_create_product);

router.get('/:productId', ProductsConstroller.products_get_product);

router.put('/:productId', checkAuth, ProductsConstroller.products_update_product);

router.delete('/:productId', checkAuth, ProductsConstroller.products_delete);

module.exports = router;