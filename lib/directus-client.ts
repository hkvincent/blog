import { createDirectus } from '@directus/sdk';

const client = createDirectus(process.env.NEXT_PUBLIC_API_URL as string);

export default client;
