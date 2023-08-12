import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { Amplify } from 'aws-amplify';
import { Credentials } from 'aws-sdk';
import awsExports from '../../../../aws-exports';

export const dynamic = 'force-dynamic';

Amplify.configure({ ...awsExports, ssr: true });

const credentials = new Credentials({
  accessKeyId: `${process.env.DYNAMODB_CLIENT_ID}`,
  secretAccessKey: `${process.env.DYNAMODB_SECRET}`,
});

const client = new DynamoDBClient({ region: 'us-east-1', credentials });

/**
 *
 *
 * @param {*} payload
 * @return {*}
 */
const CreateOrder = async (payload: any) => {
  // Adds payload to MealOrders

  const input = payload.map((orderItem: any) => {
    const itemRequest = {
      Item: orderItem,
    };
    return { PutRequest: itemRequest };
  });

  const command = new BatchWriteItemCommand({
    RequestItems: {
      ['MealOrders']: input,
    },
  });

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
