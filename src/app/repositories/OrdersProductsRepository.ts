// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../../database');

class OrdersProductsRepository {

  async create({ order_id, p }: { order_id: string, p: any}) {
    const [row] = await db.query(
      `
      INSERT INTO orders_products(order_id, product_id, quantity)
      VALUES($1, $2, $3)
      RETURNING *`,
      [order_id, p.product, p.quantity]
    );
    return row;
  }


}

module.exports = new OrdersProductsRepository();
export {};
