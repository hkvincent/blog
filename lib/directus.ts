import { createDirectus, rest, staticToken } from '@directus/sdk';
const client = createDirectus(process.env.NEXT_PUBLIC_API_URL as string)
  .with(staticToken(process.env.ADMIN_TOKEN as string)).with(rest());;

export default client;
