import {
  DynamoDBClient,
  ExecuteStatementCommand,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });

/**
 * Get all menu items
 *
 * @return {[items]}
 */
const GetAllOrdersByDate = async () => {
  const command = new ExecuteStatementCommand({
    Statement: `SELECT * FROM MealOrders
    WHERE GSI1PK='ORG#1' AND BEGINS_WITH(GSI1SK, 'DATE#1#ORDER#');`,
  });

  const response = await client.send(command);
  return JSON.stringify(response.Items);
};

export async function GET(request: Request) {
  console.log('klk');
  // Run the async function
  const rs: any = await GetAllOrdersByDate();
  return new Response(rs);
}
