import {
  DynamoDBClient,
  ExecuteStatementCommand,
} from '@aws-sdk/client-dynamodb';
export const dynamic = 'force-dynamic';

const client = new DynamoDBClient({ region: 'us-east-1' });

/**
 * Get all menu items
 *
 * @return {[items]}
 */
const GetAllMenuItems = async () => {
  const command = new ExecuteStatementCommand({
    Statement: `SELECT * FROM MealOrders
    WHERE PK='ORG#1' AND BEGINS_WITH(SK, 'PRODUCT#');`,
  });

  const response = await client.send(command);
  return JSON.stringify(response.Items);
};

export async function GET(request: Request) {
  // Run the async function
  const rs: any = await GetAllMenuItems();
  return new Response(rs);
}
