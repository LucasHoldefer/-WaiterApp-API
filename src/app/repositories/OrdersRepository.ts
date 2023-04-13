// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../../database');

class OrdersRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM orders
    `);
    // INNER JOIN orders_products ON orders.id = orders_products.order_id
    // INNER JOIN products ON orders_products.product_id = products.id
    return rows;
  }

  async create({ table, status }: { table: string, status: string }) {
    const [row] = await db.query(
      `
      INSERT INTO orders("table", "status")
      VALUES($1, $2)
      RETURNING *`,
      [table, status]
    );
    return row;
  }

  async delete({ orderId }: { orderId: string}) {
    const [row1] = await db.query(
      'DELETE FROM orders_products WHERE order_id = $1;', [orderId]
    );
    const [row] = await db.query(
      `
      DELETE FROM orders WHERE id = $1
      RETURNING *`,
      [orderId]
    );
    return row;
  }

  async update({ orderId, status }: { orderId: string, status: string}) {
    const [row] = await db.query(
      `
      UPDATE orders SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, orderId]
    );

    return row;
  }
}

module.exports = new OrdersRepository();
export {};
