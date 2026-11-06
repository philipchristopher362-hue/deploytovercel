import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://StoryBook_owner:npg_QbGWmiFc1z8v@ep-holy-sound-a8x6wvu3-pooler.eastus2.azure.neon.tech/StoryBook?sslmode=require',
  },
  verbose: true,
  strict: true,
})