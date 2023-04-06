import { Client } from 'cassandra-driver';

/**
 *
 *
 * @param {*} payload
 * @return {*}
 */
const CreateOrder = async (payload: any) => {
  const client = new Client({
    cloud: {
      secureConnectBundle: './src/app/api/secure-connect-mealorder.zip',
    },
    credentials: {
      username: `${process.env.CLIENT_ID}`,
      password: `${process.env.CLIENT_SECRET}`,
    },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute(
    `INSERT INTO mealorder.shopping_cart JSON '${JSON.stringify(payload)}'`
  );

  // Close connection
  await client.shutdown();
  // Return results
  return JSON.stringify(rs);
};

/**
 * Get all orders
 *
 * @return {[shopping_cart]}
 */
const GetAllOrders = async () => {
  const client = new Client({
    cloud: {
      secureConnectBundle: './src/app/api/secure-connect-mealorder.zip',
    },
    credentials: {
      username: `${process.env.CLIENT_ID}`,
      password: `${process.env.CLIENT_SECRET}`,
    },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute('SELECT * FROM mealorder.shopping_cart');
  // Close connection
  await client.shutdown();
  // Return results
  return JSON.stringify(rs.rows);
};

/**
 *
 *
 * @export
 * @param {Request} request
 * @return {*}
 */
export async function POST(request: Request) {
  const payload = await request.json();
  // Run the async function
  const rs: any = await CreateOrder(payload);
  return new Response(rs);
}

/**
 *
 *
 * @export
 * @param {Request} request
 * @return {*}
 */
export async function GET(request: Request) {
  // Run the async function
  const rs: any = await GetAllOrders();
  return new Response(rs);
}
