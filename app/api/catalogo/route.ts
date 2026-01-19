import { NextResponse } from "next/server"
import { db, ensureSchema } from "@/lib/db"
import { defaultCatalog, normalizeCatalog, type CatalogData } from "@/lib/catalogo"

const readCatalog = async (): Promise<CatalogData> => {
  await ensureSchema()
  const categoriesResult = await db.execute(
    "SELECT id, name, visible, sort_order as sortOrder FROM categories ORDER BY sort_order ASC",
  )
  const categories = categoriesResult.rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    visible: !!row.visible,
    order: Number(row.sortOrder),
  }))

  const productsResult = await db.execute(
    `SELECT id, name, description, value_type, value, category_id, image_cover, created_at
     FROM products`,
  )
  const products = productsResult.rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    description: row.description || "",
    valueType: row.value_type,
    value: row.value || undefined,
    categoryId: row.category_id,
    imageCover: row.image_cover || "",
    createdAt: row.created_at,
  }))

  const imagesResult = await db.execute("SELECT product_id, url FROM product_images")
  const imagesByProduct = new Map<string, string[]>()
  imagesResult.rows.forEach((row: any) => {
    if (!imagesByProduct.has(row.product_id)) {
      imagesByProduct.set(row.product_id, [])
    }
    imagesByProduct.get(row.product_id)?.push(row.url)
  })

  const enrichedProducts = products.map((product: any) => ({
    ...product,
    images: imagesByProduct.get(product.id) || [],
  }))

  if (categories.length === 0) {
    return defaultCatalog
  }

  return normalizeCatalog({
    categories,
    products: enrichedProducts,
  })
}

const replaceCatalog = async (catalog: CatalogData) => {
  await ensureSchema()
  const tx = await db.transaction("write")
  try {
    await tx.execute("DELETE FROM product_images")
    await tx.execute("DELETE FROM products")
    await tx.execute("DELETE FROM categories")

    for (const category of catalog.categories) {
      await tx.execute({
        sql: "INSERT INTO categories (id, name, visible, sort_order) VALUES (?, ?, ?, ?)",
        args: [category.id, category.name, category.visible ? 1 : 0, category.order],
      })
    }

    for (const product of catalog.products) {
      await tx.execute({
        sql: `INSERT INTO products (id, name, description, value_type, value, category_id, image_cover, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          product.id,
          product.name,
          product.description || "",
          product.valueType,
          product.value || null,
          product.categoryId,
          product.imageCover || null,
          product.createdAt,
        ],
      })
      for (const url of product.images) {
        await tx.execute({
          sql: "INSERT INTO product_images (product_id, url) VALUES (?, ?)",
          args: [product.id, url],
        })
      }
    }
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  }
}

export async function GET() {
  const catalog = await readCatalog()
  return NextResponse.json(catalog)
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json()
    const normalized = normalizeCatalog(payload)
    await replaceCatalog(normalized)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Não foi possível gravar o catálogo." }, { status: 500 })
  }
}
