// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../../database');

class ProductsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM products ORDER BY name');
    return rows;
  }

  async create({ name, description, price, imagePath, category }: { name: string, description: string, price: number, imagePath: string, category: string }) {
    console.log(name, description, price, imagePath, category);
    const [row] = await db.query(
      `
    INSERT INTO products(name, description, price, imagePath, category_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`,
      [name, description, price, imagePath, category],
    );
    return row;
  }

  async findByCategory({ category }: { category: string }) {
    const rows = await db.query('SELECT * FROM products WHERE category_id = $1', [category]);
    return rows;
  }

  async findByOrderId({ orderId }: { orderId: string}) {
    const rows = await db.query(`
    SELECT name, description, imagePath, price
    FROM products
    INNER JOIN orders_products ON orders_products.product_id = products.id
    WHERE orders_products.order_id = $1
    `, [orderId]);

    return rows;
  }


}

module.exports = new ProductsRepository();
export {};
