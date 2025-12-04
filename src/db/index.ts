/**
 * Connect to PostgreSQL Database (Supabase/Neon/Local PostgreSQL)
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (db) return db;
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString || connectionString.includes('placeholder')) {
    // If no database URL or placeholder, throw a more helpful error
    throw new Error(
      'DATABASE_URL environment variable is not set or is a placeholder. ' +
      'Please set a valid database connection string in your .env.local file. ' +
      'If you don\'t need authentication features, you can set DATABASE_URL to a dummy value ' +
      'but note that auth features will not work.'
    );
  }
  
  try {
    const client = postgres(connectionString, { prepare: false });
    db = drizzle(client, { schema });
    return db;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error(
      `Failed to connect to database. Please check your DATABASE_URL. ` +
      `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Connect to Neon Database
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-neon
 */
// import { drizzle } from 'drizzle-orm/neon-http';
// const db = drizzle(process.env.DATABASE_URL!);

/**
 * Database connection with Drizzle
 * https://orm.drizzle.team/docs/connect-overview
 *
 * Drizzle <> PostgreSQL
 * https://orm.drizzle.team/docs/get-started-postgresql
 *
 * Get Started with Drizzle and Neon
 * https://orm.drizzle.team/docs/get-started/neon-new
 *
 * Drizzle with Neon Postgres
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-neon
 *
 * Drizzle <> Neon Postgres
 * https://orm.drizzle.team/docs/connect-neon
 *
 * Drizzle with Supabase Database
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
 */
