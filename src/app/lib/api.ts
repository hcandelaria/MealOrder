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

  return res.json();
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

  return res.json();
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
