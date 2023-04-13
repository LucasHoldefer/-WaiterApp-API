//import { ohohproducts } from './../../../../app/src/mocks/products';
/* eslint-disable @typescript-eslint/no-var-requires */
const OrdersRepository = require('../repositories/OrdersRepository');
const ProductsRepository = require('../repositories/ProductsRepository');
const OrdersProductsRepository = require('../repositories/OrdersProductsRepository');

class OrderController {
  async index(request: any, response: any) {
    const orders = await OrdersRepository.findAll();

    const ordersList:any[] = [];

    for (const order of orders) {
      const orderId = order.id;
      const products = await ProductsRepository.findByOrderId({ orderId });

      ordersList.push({
        table: order.table,
        status: order.status,
        createat: order.createat,
        products: products
      });
      console.log(ordersList);
    }
    response.json(ordersList);
  }

  async store(request: any, response: any) {
    const { table, products } = request.body;
    const status = 'WAITING';
    console.log(products);

    const order = await OrdersRepository.create({ table, status });

    products.forEach(async (p: any) => {
      const order_id = order.id;
      const product = await OrdersProductsRepository.create({ order_id, p });
    });

    console.log(order.id);

    response.status(201).json(order);
  }

  async delete(request: any, response: any) {
    const orderId = request.params.orderId;

    const order = await OrdersRepository.delete({ orderId });
    response.json(order);
  }

  async update(request: any, response: any) {
    const orderId = request.params.orderId;
    const { status } = request.body;

    const order = await OrdersRepository.update({ orderId, status });
    response.json(order);
  }

  async getByCategory(request: any, response: any) {
    const category = request.params.categoryId;

    const orders = await OrdersRepository.findByCategory({ category });
    response.json(orders);
  }
}

module.exports = new OrderController();
