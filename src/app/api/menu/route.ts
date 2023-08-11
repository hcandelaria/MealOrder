import {
  DynamoDBClient,
  ExecuteStatementCommand,
} from '@aws-sdk/client-dynamodb';
import { Amplify } from 'aws-amplify';
import { NextResponse } from 'next/server';
import awsExports from '../../../aws-exports';

export const dynamic = 'force-dynamic';

Amplify.configure({ ...awsExports, ssr: true });

const client = new DynamoDBClient({ region: 'us-east-1' });

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

  return JSON.stringify(response.Items);
};

export async function GET(request: Request) {
  // Run the async function
  const rs: any = await GetAllMenuItems();
  return NextResponse.json(rs);
}
