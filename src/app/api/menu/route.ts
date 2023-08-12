import {
  DynamoDBClient,
  ExecuteStatementCommand,
} from '@aws-sdk/client-dynamodb';
import { Amplify } from 'aws-amplify';
import { Credentials } from 'aws-sdk';
import { NextResponse } from 'next/server';
import awsExports from '../../../aws-exports';
export const dynamic = 'force-dynamic';

Amplify.configure({ ...awsExports, ssr: true });

const credentials = new Credentials({
  accessKeyId: `${process.env.DYNAMODB_CLIENT_ID}`,
  secretAccessKey: `${process.env.DYNAMODB_SECRET}`,
});

const client = new DynamoDBClient({ region: 'us-east-1', credentials });

/**
 * Get all menu items
 *
 * @return {[items]}
 */
const GetAllMenuItems = async () => {
  console.log(Date.now());
  const command = new ExecuteStatementCommand({
    Statement: `SELECT * FROM MealOrders
    WHERE PK='ORG#1' AND BEGINS_WITH(SK, 'PRODUCT#');`,
  });

  const response = await client.send(command);

  // save form when using aws SDK JS(v3)
  // return JSON.stringify(response.Items);
  return response.Items;
};

export async function GET(request: Request) {
  // Run the async function
  const rs: any = await GetAllMenuItems();
  return NextResponse.json(rs);
}
