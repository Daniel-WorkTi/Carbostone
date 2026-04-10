import { createClient, type Client } from "@libsql/client"

let dbInstance: Client | null = null

/** Só cria o cliente quando necessário (build sem .env não falha na importação). */
export function getDb(): Client {
  if (dbInstance) return dbInstance
  const dbUrl = process.env.TURSO_DATABASE_URL
  if (!dbUrl) {
    throw new Error("TURSO_DATABASE_URL não está configurado.")
  }
  dbInstance = createClient({
    url: dbUrl,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  return dbInstance
}

export const db = new Proxy({} as Client, {
  get(_target, prop, receiver) {
    const client = getDb()
    const value = Reflect.get(client as object, prop, receiver)
    return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(client) : value
  },
})

let schemaReady: Promise<void> | null = null

export const ensureSchema = () => {
  const database = getDb()
  if (!schemaReady) {
    schemaReady = (async () => {
      await database.execute(`
        CREATE TABLE IF NOT EXISTS categories (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          visible INTEGER NOT NULL DEFAULT 1,
          sort_order INTEGER NOT NULL DEFAULT 0
        );
      `)
      await database.execute(`
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
      await database.execute(`
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
