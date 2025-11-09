import { z } from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

if (!configProject.success) {
  console.error('❌ Invalid environment variables:');
  console.error(JSON.stringify(configProject.error.format(), null, 2));
  
  // Only throw in runtime, not during build
  // During build, we'll use placeholders that will be replaced by Vercel env vars
  if (typeof window !== 'undefined') {
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
  }
  
  console.warn('⚠️ Environment variables not set. Using placeholders for build.');
}

const envConfig = configProject.success 
  ? configProject.data 
  : {
      NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
      NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || '',
    };

export default envConfig;
