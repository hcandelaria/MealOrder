import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });
/**
 *
 *
 * @param {*} payload
 * @return {*}
 */
const CreateOrder = async (payload: any) => {
  // Adds payload to MealOrders
  const input = {
    TableName: 'MealOrders',
    Item: payload,
  };

  const command = new PutItemCommand(input);

  const response = await client.send(command);
  return JSON.stringify(response);
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
