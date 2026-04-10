export type CatalogValueType = "preco" | "sob_consulta"

export type CatalogProduct = {
  id: string
  name: string
  description: string
  value?: string
  valueType: CatalogValueType
  categoryId: string
  imageCover?: string
  images: string[]
  createdAt: string
}

export type CatalogCategory = {
  id: string
  name: string
  visible: boolean
  order: number
}

export type CatalogData = {
  categories: CatalogCategory[]
  products: CatalogProduct[]
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim()

const defaultCategoryNames = ["Lavatórios"]

export const defaultCategories: CatalogCategory[] = defaultCategoryNames.map((name, index) => ({
  id: slugify(name),
  name,
  visible: true,
  order: index + 1,
}))

export const defaultCatalog: CatalogData = {
  categories: defaultCategories,
  products: [],
}

const normalizeCategory = (input: any, index: number): CatalogCategory | null => {
  if (!input || typeof input !== "object") return null
  const name = typeof input.name === "string" ? input.name : ""
  if (!name) return null
  const id = typeof input.id === "string" && input.id ? input.id : slugify(name) || `categoria-${index + 1}`
  const visible = typeof input.visible === "boolean" ? input.visible : true
  const order = typeof input.order === "number" && Number.isFinite(input.order) ? input.order : index + 1
  return {
    id,
    name,
    visible,
    order,
  }
}

const normalizeProduct = (input: any, index: number): CatalogProduct | null => {
  if (!input || typeof input !== "object") return null
  const name = typeof input.name === "string" ? input.name : ""
  if (!name) return null
  const id =
    typeof input.id === "string" && input.id
      ? input.id
      : slugify(name) || `produto-${index + 1}`
  const description = typeof input.description === "string" ? input.description : ""
  const valueType: CatalogValueType =
    input.valueType === "preco" || input.valueType === "sob_consulta" ? input.valueType : "sob_consulta"
  const value = typeof input.value === "string" ? input.value : ""
  const categoryId = typeof input.categoryId === "string" ? input.categoryId : ""
  const imageCover = typeof input.imageCover === "string" ? input.imageCover : ""
  const images = Array.isArray(input.images)
    ? input.images.filter((item: any) => typeof item === "string")
    : []
  if (imageCover && !images.includes(imageCover)) {
    images.unshift(imageCover)
  }
  const createdAt =
    typeof input.createdAt === "string" && input.createdAt
      ? input.createdAt
      : new Date(0).toISOString()

  return {
    id,
    name,
    description,
    value: value || undefined,
    valueType,
    categoryId,
    imageCover: imageCover || images[0],
    images,
    createdAt,
  }
}

const normalizeLegacyCatalog = (input: any[]): CatalogData => {
  const categories: CatalogCategory[] = input
    .map((item, index) => {
      if (!item || typeof item !== "object") return null
      const name = typeof item.name === "string" ? item.name : ""
      if (!name) return null
      const id = typeof item.id === "string" && item.id ? item.id : slugify(name) || `categoria-${index + 1}`
      return {
        id,
        name,
        visible: true,
        order: index + 1,
      }
    })
    .filter(Boolean) as CatalogCategory[]

  const products: CatalogProduct[] = []
  input.forEach((item, categoryIndex) => {
    if (!item || typeof item !== "object") return
    const categoryName = typeof item.name === "string" ? item.name : ""
    const categoryId =
      typeof item.id === "string" && item.id
        ? item.id
        : slugify(categoryName) || `categoria-${categoryIndex + 1}`
    const legacyProducts = Array.isArray(item.images) ? item.images : []
    legacyProducts.forEach((legacyProduct: any, productIndex: number) => {
      const name = typeof legacyProduct?.title === "string" ? legacyProduct.title : ""
      if (!name) return
      const rawValue = typeof legacyProduct?.price === "string" ? legacyProduct.price : ""
      const valueType: CatalogValueType =
        rawValue && rawValue.toLowerCase() !== "sob consulta" ? "preco" : "sob_consulta"
      const legacyImages = Array.isArray(legacyProduct?.images)
        ? legacyProduct.images
            .map((image: any) => (typeof image?.src === "string" ? image.src : null))
            .filter(Boolean)
        : []
      const legacyCover = typeof legacyProduct?.src === "string" ? legacyProduct.src : undefined
      const images = legacyCover ? [legacyCover, ...legacyImages] : legacyImages
      products.push({
        id: `${categoryId}-${productIndex + 1}`,
        name,
        description: typeof legacyProduct?.description === "string" ? legacyProduct.description : "",
        value: valueType === "preco" ? rawValue : undefined,
        valueType,
        categoryId,
        imageCover: legacyCover,
        images,
        createdAt: new Date(0).toISOString(),
      })
    })
  })

  return {
    categories: categories.length ? categories : defaultCategories,
    products,
  }
}

export const normalizeCatalog = (input: any): CatalogData => {
  if (Array.isArray(input)) {
    return normalizeLegacyCatalog(input)
  }

  if (input && typeof input === "object") {
    const rawCategories = Array.isArray(input.categories) ? input.categories : []
    const rawProducts = Array.isArray(input.products) ? input.products : []
    const categories = rawCategories
      .map((item, index) => normalizeCategory(item, index))
      .filter(Boolean) as CatalogCategory[]
    const products = rawProducts
      .map((item, index) => normalizeProduct(item, index))
      .filter(Boolean)
      .filter((product) => categories.some((category) => category.id === product.categoryId)) as CatalogProduct[]

    return {
      categories: categories.length ? categories : defaultCategories,
      products,
    }
  }

  return defaultCatalog
}

export const sortCategories = (categories: CatalogCategory[]) =>
  [...categories].sort((a, b) => a.order - b.order)
