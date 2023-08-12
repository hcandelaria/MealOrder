import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';

Amplify.configure({ ...awsExports, ssr: true });
/**
 * Get all menu items
 *
 * @return {*}
 */
export const getAllMenuItems = async () => {
  const res = await fetch('/api/menu/', { cache: 'no-store' });
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(`Error ${res.status} fetching data`);
    return null;
  }
  const rawData = await res.json();

  const data = rawData.map((marshallElement: any) => {
    return unmarshall(marshallElement);
  });
  return res.json();
};

/**
 * Get active service dates
 *
 * @return {*}
 */
export const getActiveServiceDates = async () => {
  const res = await fetch('/api/servicedate', { cache: 'no-store' });

  if (!res.ok) {
    console.log(`Error ${res.status} fetching data`);
    return null;
  }
  const rawData = await res.json();

  const data = rawData.map((marshallElement: any) => {
    return unmarshall(marshallElement);
  });

  return data;
};

/**
 * POST shoppingcart
 *
 * @param {payload}
 * @return {*}
 */
export const SubmitOrder = async (payload: any) => {
  const res = await fetch('/api/shoppingcart/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.log(`Error ${res.status} fetching data`);
    return null;
  }

  const data = await res.json();

  return data;
};

/**
 * Get all menu items
 *
 * @return {*}
 */
export const getAllOrders = async () => {
  const res = await fetch('/api/shoppingcart', { cache: 'no-store' });
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(`Error ${res.status} fetching data`);
    return null;
  }
  const rawData = await res.json();
  let order: Record<string, any> = { items: [] };
  const data: any = [];

  rawData.forEach((marshallElement: any) => {
    // unmarshall elements
    const element = unmarshall(marshallElement);
    // add items to order
    if (element.SK.startsWith('ITEM#')) {
      order.items.push(element);
    }
    // Add order details
    if (element.SK.startsWith('ORDER#')) {
      order = { ...order, ...element };
      data.push(order);
      order = { items: [] };
    }
  });

  return data;
};

export const UpdateOrderStatus = async (payload: any) => {
  const res = await fetch('/api/shoppingcart/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.log(`Error ${res.status} fetching data`);
  }
  const data = await res.json();
  return data;
};
