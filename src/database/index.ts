// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'waiterapp',
});

client.connect();

exports.query = async (query: any, values: any) => {
  const { rows } = await client.query(query, values);
  return rows;
};
