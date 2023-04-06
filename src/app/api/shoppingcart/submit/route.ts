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
