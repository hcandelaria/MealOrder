import { Client } from 'cassandra-driver';

async function GetAllMenus() {
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
  // const rs = await client.execute('SELECT * FROM system.local');
  // getting error
  const rs = await client.execute('SELECT * FROM mealorder.menu');
  // console.log(`Your cluster returned ${rs.rowLength} row(s)`);
  await client.shutdown();
  // return rs.rows;
  return JSON.stringify(rs.rows);
}


export async function GET(request: Request) {
  // Run the async function
  const rs:any = await GetAllMenus();
  return new Response(rs);
}