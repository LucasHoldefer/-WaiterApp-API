/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();

const uplaod = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

const CategoryController = require('./app/controllers/CategoryController');
const ProductController = require('./app/controllers/ProductController');
const OrderController = require('./app/controllers/OrderController');

// List categories
//router.get('/categories', listCategories);
router.get('/categories', CategoryController.index);

// Create category
//router.post('/categories', createCategory);
router.post('/categories', CategoryController.store);

// List products
//router.get('/products', listProducts);
router.get('/products', ProductController.index);

// Create product
//router.post('/products', uplaod.single('image'), createProduct);
router.post('/products', uplaod.single('image'), ProductController.store);

// Create product by category
//router.get('/categories/:categoryId/products', listProductsByCategory);
router.get('/categories/:categoryId/products', ProductController.getByCategory);

// List orders
//router.get('/orders', listOrders);
router.get('/orders', OrderController.index);

// Create order
//router.post('/orders', createOrder);
router.post('/orders', OrderController.store);

// Change order status
//router.patch('/orders/:orderId', changeOrderStatus);
router.patch('/orders/:orderId', OrderController.update);

// Delete/cancel order
router.delete('/orders/:orderId', OrderController.delete);
//router.delete('/orders/:orderId', cancelOrder);

