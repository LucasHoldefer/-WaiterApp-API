// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../../database');

class CategoriesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  async create({ name, icon }: { name: string, icon: string }) {
    const [row] = await db.query(
      `
    INSERT INTO categories(name, icon)
    VALUES($1, $2)
    RETURNING *`,
      [name, icon],
    );
    return row;
  }


}

module.exports = new CategoriesRepository();
export {};
