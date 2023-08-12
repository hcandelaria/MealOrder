export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return new Response(`Hello! the current time is ${Date.now()}`);
}
