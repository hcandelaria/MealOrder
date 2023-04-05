import { Client } from 'cassandra-driver';

const GetAvailableItems = async () => {
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

  // Execute query
  const rs = await client.execute(
    "SELECT * FROM mealorder.item WHERE status='active'"
  );
  //Close connection
  client.shutdown();
  //Return results
  return JSON.stringify(rs.rows);
};

export async function GET(request: Request) {
  // Run the async function to get data
  const rs: any = await GetAvailableItems();
  return new Response(rs);
}
