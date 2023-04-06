/**
 * Get all menu items
 *
 * @return {*}
 */
export const getAllMenuItems = async () => {
  const res = await fetch('/api/menu/', { next: { revalidate: 10 } });
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(`Error ${res.status} post data`);
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
  const res = await fetch('/api/servicedate', { next: { revalidate: 10 } });

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
    },
    body: JSON.stringify(payload),
  });
  console.log(res);
  if (!res.ok) {
    console.log(`Error ${res.status} creating data`);
    return null;
  }

  const data = await res.json();

  return data;
};
