import { createClient } from "@libsql/client"

const dbUrl = process.env.TURSO_DATABASE_URL
if (!dbUrl) {
  throw new Error("TURSO_DATABASE_URL não está configurado.")
}

const db = createClient({
  url: dbUrl,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

let schemaReady: Promise<void> | null = null

const ensureSchema = () => {
  if (!schemaReady) {
    schemaReady = (async () => {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS categories (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          visible INTEGER NOT NULL DEFAULT 1,
          sort_order INTEGER NOT NULL DEFAULT 0
        );
      `)
      await db.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          value_type TEXT NOT NULL,
          value TEXT,
          category_id TEXT NOT NULL,
          image_cover TEXT,
          created_at TEXT NOT NULL,
          FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
        );
      `)
      await db.execute(`
        CREATE TABLE IF NOT EXISTS product_images (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id TEXT NOT NULL,
          url TEXT NOT NULL,
          FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        );
      `)
    })()
  }
  return schemaReady
}

export { db, ensureSchema }
