import { Client } from 'cassandra-driver';

const GetShoppingCart = async (order_id: string) => {
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
    `SELECT * FROM mealorder.shopping_cart WHERE item.shopping_cart_id="${order_id}"`
  );
  // Close connection
  await client.shutdown();
  // Return results
  return JSON.stringify(rs.rows);
};

export async function GET(request: Request) {
  // Run the async function
  const { searchParams } = new URL(request.url);
  const order_id: any = searchParams.get('id');
  const rs: any = await GetShoppingCart(order_id);
  return new Response(rs);
}
