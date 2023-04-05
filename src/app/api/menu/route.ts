import { Client } from 'cassandra-driver';

/**
 * Get all menu items
 *
 * @return {[items]}
 */
const GetAllMenuItems = async () => {
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
  const rs = await client.execute('SELECT * FROM mealorder.item');
  // Close connection
  await client.shutdown();
  // Return results
  return JSON.stringify(rs.rows);
};

export async function GET(request: Request) {
  // Run the async function
  const rs: any = await GetAllMenuItems();
  return new Response(rs);
}
