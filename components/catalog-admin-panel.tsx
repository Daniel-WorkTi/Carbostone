"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Boxes,
  PlusCircle,
  Shapes,
  Settings,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Trash2,
  Filter,
  ImageIcon,
  Tag,
  Pencil,
  Save,
  CircleHelp,
  GripVertical,
  X,
  ListFilter,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  defaultCatalog,
  normalizeCatalog,
  slugify,
  sortCategories,
  type CatalogCategory,
  type CatalogData,
  type CatalogProduct,
  type CatalogValueType,
} from "@/lib/catalogo"

type AdminView = "produtos" | "novo" | "categorias" | "config"

const fetchCatalog = async () => {
  const response = await fetch("/api/catalogo", { cache: "no-store" })
  if (!response.ok) throw new Error("Erro ao carregar catálogo")
  const data = await response.json()
  return normalizeCatalog(data)
}

const saveCatalog = async (data: CatalogData) => {
  await fetch("/api/catalogo", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

const createId = (prefix: string) => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}`
}

export function CatalogAdminPanel() {
  const [catalog, setCatalog] = useState<CatalogData>(defaultCatalog)
  const [isReady, setIsReady] = useState(false)
  const [view, setView] = useState<AdminView>("produtos")
  const buttonPrimary = "bg-black text-white hover:bg-black/85 border border-black"
  const buttonOutline = "border-black text-black hover:bg-black hover:text-white"
  const buttonGhost = "text-black hover:bg-black/10 hover:text-black"
  const infoText = "text-black/60 hover:text-black"
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    description: "",
    valueType: "sob_consulta" as CatalogValueType,
    value: "",
    categoryId: "",
    imageCover: "",
    images: [] as string[],
    createdAt: "",
  })
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [categoryForm, setCategoryForm] = useState("")
  const [confirmDelete, setConfirmDelete] = useState<{
    productId: string
    name: string
  } | null>(null)
  const [confirmCategoryDelete, setConfirmCategoryDelete] = useState<{
    categoryId: string
    name: string
  } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [quickCategoryId, setQuickCategoryId] = useState<string | null>(null)
  const [quickForm, setQuickForm] = useState({
    id: "",
    name: "",
    description: "",
    valueType: "sob_consulta" as CatalogValueType,
    value: "",
    categoryId: "",
    imageCover: "",
    images: [] as string[],
  })
  const [quickExistingId, setQuickExistingId] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [dragCategoryId, setDragCategoryId] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null)
  const [productSearch, setProductSearch] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({})
  const [addToCategoryId, setAddToCategoryId] = useState<string | null>(null)
  const [addProductSearch, setAddProductSearch] = useState("")

  const orderedCategories = useMemo(
    () => sortCategories(catalog.categories),
    [catalog.categories],
  )

  const categoryNameMap = useMemo(
    () => new Map(catalog.categories.map((category) => [category.id, category.name])),
    [catalog.categories],
  )

  const filteredProducts = useMemo(() => {
    const query = productSearch.trim().toLowerCase()
    if (!query) return catalog.products
    return catalog.products.filter((product) => {
      const categoryName = categoryNameMap.get(product.categoryId) || ""
      return (
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        categoryName.toLowerCase().includes(query)
      )
    })
  }, [catalog.products, productSearch, categoryNameMap])

  const allSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((product) => selectedProducts[product.id])

  const filteredAddProducts = useMemo(() => {
    if (!addToCategoryId) return []
    const query = addProductSearch.trim().toLowerCase()
    return catalog.products.filter((product) => {
      if (product.categoryId === addToCategoryId) return false
      if (!query) return true
      const categoryName = categoryNameMap.get(product.categoryId) || ""
      return (
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        categoryName.toLowerCase().includes(query)
      )
    })
  }, [catalog.products, addToCategoryId, addProductSearch, categoryNameMap])

  const groupedProducts = useMemo(() => {
    const groups: Record<string, CatalogProduct[]> = {}
    catalog.products.forEach((product) => {
      if (!groups[product.categoryId]) {
        groups[product.categoryId] = []
      }
      groups[product.categoryId].push(product)
    })
    return groups
  }, [catalog.products])

  const updateCatalog = (next: CatalogData | ((current: CatalogData) => CatalogData)) => {
    setCatalog((current) => {
      const resolved = typeof next === "function" ? next(current) : next
      if (isReady) {
        saveCatalog(resolved).catch(() => {})
      }
      return resolved
    })
  }

  const resetProductForm = () => {
    setProductForm({
      id: createId("produto"),
      name: "",
      description: "",
      valueType: "sob_consulta",
      value: "",
      categoryId: orderedCategories[0]?.id || "",
      imageCover: "",
      images: [],
      createdAt: "",
    })
    setEditingProductId(null)
  }

  useEffect(() => {
    fetchCatalog()
      .then((data) => setCatalog(data))
      .catch(() => {})
      .finally(() => setIsReady(true))
  }, [])

  useEffect(() => {
    if (productForm.categoryId || orderedCategories.length === 0) return
    setProductForm((prev) => ({ ...prev, categoryId: orderedCategories[0].id }))
  }, [orderedCategories, productForm.categoryId])

  const handleSubmitProduct = () => {
    const name = productForm.name.trim()
    const description = productForm.description.trim()
    if (!name || !productForm.categoryId) return

    const valueType = productForm.valueType
    const value =
      valueType === "preco" ? productForm.value.trim() : ""
    const product: CatalogProduct = {
      id: productForm.id || createId("produto"),
      name,
      description,
      value: value || undefined,
      valueType,
      categoryId: productForm.categoryId,
      imageCover: productForm.imageCover || productForm.images[0],
      images: productForm.images,
      createdAt: editingProductId && productForm.createdAt ? productForm.createdAt : new Date().toISOString(),
    }

    updateCatalog((current) => {
      const nextProducts = editingProductId
        ? current.products.map((item) => (item.id === editingProductId ? product : item))
        : [...current.products, product]
      return {
        ...current,
        products: nextProducts,
      }
    })

    resetProductForm()
    setView("produtos")
  }

  const startEditProduct = (product: CatalogProduct) => {
    setEditingProductId(product.id)
    setProductForm({
      id: product.id,
      name: product.name,
      description: product.description,
      valueType: product.valueType,
      value: product.value || "",
      categoryId: product.categoryId,
      imageCover: product.imageCover || "",
      images: product.images || [],
      createdAt: product.createdAt,
    })
    setView("novo")
  }

  const confirmRemoveProduct = () => {
    if (!confirmDelete) return
    updateCatalog((current) => ({
      ...current,
      products: current.products.filter((product) => product.id !== confirmDelete.productId),
    }))
    setConfirmDelete(null)
  }

  const handleCreateCategory = () => {
    const name = categoryForm.trim()
    if (!name) return
    updateCatalog((current) => {
      const exists = current.categories.some(
        (category) => category.name.toLowerCase() === name.toLowerCase(),
      )
      if (exists) return current
      const nextOrder = current.categories.length + 1
      return {
        ...current,
        categories: [
          ...current.categories,
          {
            id: slugify(name) || createId("categoria"),
            name,
            visible: true,
            order: nextOrder,
          },
        ],
      }
    })
    setCategoryForm("")
  }

  const updateCategory = (categoryId: string, changes: Partial<CatalogCategory>) => {
    updateCatalog((current) => ({
      ...current,
      categories: current.categories.map((category) =>
        category.id === categoryId ? { ...category, ...changes } : category,
      ),
    }))
  }

  const InfoTip = ({ text }: { text: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className={infoText} aria-label={text}>
          <CircleHelp className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>{text}</TooltipContent>
    </Tooltip>
  )

  useEffect(() => {
    if (productForm.id) return
    setProductForm((prev) => ({ ...prev, id: createId("produto") }))
  }, [productForm.id])

  const handleUploadImages = async (
    files: FileList | null,
    targetId: string,
    onUploaded: (urls: string[]) => void,
  ) => {
    if (!files || files.length === 0) return
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    if (!cloudName || !uploadPreset) {
      window.alert("Cloudinary não configurado. Verifique as variáveis de ambiente.")
      return
    }
    setIsUploading(true)
    try {
      const uploads = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", uploadPreset)
        formData.append("folder", `catalogo/${targetId}`)
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
          method: "POST",
          body: formData,
        })
        if (!response.ok) {
          throw new Error("Falha no upload da imagem.")
        }
        const data = await response.json()
        return data.secure_url as string
      })
      const urls = await Promise.all(uploads)
      onUploaded(urls)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = (url: string) => {
    setProductForm((prev) => {
      const nextImages = prev.images.filter((image) => image !== url)
      const nextCover = prev.imageCover === url ? nextImages[0] || "" : prev.imageCover
      return {
        ...prev,
        images: nextImages,
        imageCover: nextCover,
      }
    })
  }

  const handleSetCover = (url: string) => {
    setProductForm((prev) => ({ ...prev, imageCover: url }))
  }

  const handleQuickRemoveImage = (url: string) => {
    setQuickForm((prev) => {
      const nextImages = prev.images.filter((image) => image !== url)
      const nextCover = prev.imageCover === url ? nextImages[0] || "" : prev.imageCover
      return {
        ...prev,
        images: nextImages,
        imageCover: nextCover,
      }
    })
  }

  const handleQuickSetCover = (url: string) => {
    setQuickForm((prev) => ({ ...prev, imageCover: url }))
  }

  const startQuickAdd = (categoryId: string) => {
    setQuickCategoryId(categoryId)
    setQuickExistingId("")
    setQuickForm({
      id: createId("produto"),
      name: "",
      description: "",
      valueType: "sob_consulta",
      value: "",
      categoryId,
      imageCover: "",
      images: [],
    })
  }

  const handleQuickSubmit = () => {
    const name = quickForm.name.trim()
    if (!name || !quickForm.categoryId) return
    const value =
      quickForm.valueType === "preco" ? quickForm.value.trim() : ""
    const product: CatalogProduct = {
      id: quickForm.id || createId("produto"),
      name,
      description: quickForm.description.trim(),
      value: value || undefined,
      valueType: quickForm.valueType,
      categoryId: quickForm.categoryId,
      imageCover: quickForm.imageCover || quickForm.images[0],
      images: quickForm.images,
      createdAt: new Date().toISOString(),
    }

    updateCatalog((current) => ({
      ...current,
      products: [...current.products, product],
    }))
    setQuickCategoryId(null)
  }

  const handleQuickAddExisting = () => {
    if (!quickExistingId || !quickCategoryId) return
    updateCatalog((current) => ({
      ...current,
      products: current.products.map((product) =>
        product.id === quickExistingId ? { ...product, categoryId: quickCategoryId } : product,
      ),
    }))
    setQuickExistingId("")
  }

  const handleAddExistingToCategory = (productId: string, categoryId: string) => {
    updateCatalog((current) => ({
      ...current,
      products: current.products.map((product) =>
        product.id === productId ? { ...product, categoryId } : product,
      ),
    }))
  }

  const handleExportCatalog = () => {
    const ordered = sortCategories(catalog.categories)
    const grouped = ordered.map((category) => ({
      id: category.id,
      name: category.name,
      visible: category.visible,
      order: category.order,
      products: catalog.products
        .filter((product) => product.categoryId === category.id)
        .map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          valueType: product.valueType,
          value: product.value || "",
          images: product.images,
          imageCover: product.imageCover || "",
          createdAt: product.createdAt,
        })),
    }))

    const payload = {
      exportedAt: new Date().toISOString(),
      totals: {
        categories: catalog.categories.length,
        products: catalog.products.length,
      },
      categories: grouped,
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "catalogo-export.json"
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const downloadCsv = (filename: string, rows: string[][]) => {
    const escapeValue = (value: string) => `"${value.replace(/"/g, '""')}"`
    const content = rows.map((row) => row.map(escapeValue).join(";")).join("\n")
    const blob = new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const handleExportCsv = () => {
    const ordered = sortCategories(catalog.categories)
    const categoryRows: string[][] = [
      ["id", "nome", "visivel", "ordem"],
      ...ordered.map((category) => [
        category.id,
        category.name,
        category.visible ? "1" : "0",
        String(category.order),
      ]),
    ]

    const categoryNameMap = new Map(ordered.map((category) => [category.id, category.name]))
    const productRows: string[][] = [
      [
        "id",
        "nome",
        "descricao",
        "tipo_valor",
        "valor",
        "categoria_id",
        "categoria_nome",
        "imagem_capa",
        "imagens",
        "data_criacao",
      ],
      ...catalog.products.map((product) => [
        product.id,
        product.name,
        product.description || "",
        product.valueType,
        product.value || "",
        product.categoryId,
        categoryNameMap.get(product.categoryId) || "",
        product.imageCover || "",
        product.images.join(" | "),
        product.createdAt,
      ]),
    ]

    downloadCsv("categorias.csv", categoryRows)
    downloadCsv("produtos.csv", productRows)
  }

  const handleRemoveCategory = () => {
    if (!confirmCategoryDelete) return
    updateCatalog((current) => {
      const nextCategories = current.categories.filter(
        (category) => category.id !== confirmCategoryDelete.categoryId,
      )
      const nextProducts = current.products.filter(
        (product) => product.categoryId !== confirmCategoryDelete.categoryId,
      )
      return {
        ...current,
        categories: nextCategories,
        products: nextProducts,
      }
    })
    setConfirmCategoryDelete(null)
  }

  const handleReorderCategories = (targetId: string) => {
    if (!dragCategoryId || dragCategoryId === targetId) return
    updateCatalog((current) => {
      const ordered = sortCategories(current.categories)
      const fromIndex = ordered.findIndex((category) => category.id === dragCategoryId)
      const toIndex = ordered.findIndex((category) => category.id === targetId)
      if (fromIndex === -1 || toIndex === -1) return current
      const next = [...ordered]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      const updated = next.map((category, idx) => ({
        ...category,
        order: idx + 1,
      }))
      return {
        ...current,
        categories: updated,
      }
    })
    setDragCategoryId(null)
  }

  return (
    <section className="py-8 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-lg border border-black/10 bg-white p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Dashboard
            </p>
            <Button
              variant={view === "produtos" ? "default" : "ghost"}
              className={`w-full justify-start ${view === "produtos" ? buttonPrimary : buttonGhost}`}
              onClick={() => setView("produtos")}
            >
              <Boxes className="mr-2 size-4" />
              Produtos
            </Button>
            <Button
              variant={view === "novo" ? "default" : "ghost"}
              className={`w-full justify-start ${view === "novo" ? buttonPrimary : buttonGhost}`}
              onClick={() => {
                resetProductForm()
                setView("novo")
              }}
            >
              <PlusCircle className="mr-2 size-4" />
              Novo Produto
            </Button>
            <Button
              variant={view === "categorias" ? "default" : "ghost"}
              className={`w-full justify-start ${view === "categorias" ? buttonPrimary : buttonGhost}`}
              onClick={() => setView("categorias")}
            >
              <Shapes className="mr-2 size-4" />
              Categorias
            </Button>
            <Button
              variant={view === "config" ? "default" : "ghost"}
              className={`w-full justify-start ${view === "config" ? buttonPrimary : buttonGhost}`}
              onClick={() => setView("config")}
            >
              <Settings className="mr-2 size-4" />
              Configurações
            </Button>
          </aside>

          <div className="space-y-6">
            {view === "produtos" && (
              <Card className="p-6 space-y-6 bg-white text-black border-black/10">
                <div>
                  <h2 className="text-2xl font-light">Produtos cadastrados</h2>
                  <p className="text-sm text-muted-foreground">
                    Lista única com pesquisa e seleção.
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-[1fr_auto] items-center">
                  <Input
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="Pesquisar por ID, nome ou categoria..."
                  />
                  <div className="flex items-center gap-3 text-xs">
                    <ListFilter className="size-4 text-blue-600" />
                    <CheckCircle className="size-4 text-green-600" />
                    <XCircle className="size-4 text-red-600" />
                  </div>
                </div>
                <div className="rounded-md border">
                  <div className="grid grid-cols-[32px_72px_1fr_160px_120px_120px] items-center gap-3 border-b bg-black/5 px-3 py-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(event) => {
                        const checked = event.target.checked
                        const next: Record<string, boolean> = {}
                        filteredProducts.forEach((product) => {
                          next[product.id] = checked
                        })
                        setSelectedProducts(next)
                      }}
                    />
                    <span>Imagem</span>
                    <span>Nome / ID</span>
                    <span>Categoria</span>
                    <span>Valor</span>
                    <span>Ações</span>
                  </div>
                  <div className="divide-y">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="grid grid-cols-[32px_72px_1fr_160px_120px_120px] items-center gap-3 px-3 py-3 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={!!selectedProducts[product.id]}
                          onChange={() =>
                            setSelectedProducts((prev) => ({
                              ...prev,
                              [product.id]: !prev[product.id],
                            }))
                          }
                        />
                        <div className="h-12 w-16 overflow-hidden rounded-md border bg-muted">
                          <img
                            src={product.imageCover || product.images?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.id}</p>
                        </div>
                        <div className="text-xs">
                          {categoryNameMap.get(product.categoryId) || product.categoryId}
                        </div>
                        <div className="text-xs font-semibold">
                          {product.valueType === "sob_consulta"
                            ? "Sob consulta"
                            : product.value || "Sob consulta"}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className={buttonOutline}
                            onClick={() => startEditProduct(product)}
                          >
                            <Pencil className="mr-1 size-4" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className={buttonPrimary}
                            onClick={() =>
                              setConfirmDelete({ productId: product.id, name: product.name })
                            }
                          >
                            <Trash2 className="mr-1 size-4" />
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                    {filteredProducts.length === 0 && (
                      <div className="px-3 py-6 text-sm text-muted-foreground">
                        Nenhum produto encontrado.
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {view === "novo" && (
              <div className="rounded-2xl bg-black/80 p-4">
                <Card className="p-6 space-y-6 bg-white text-black border-black/10">
                <div>
                  <h2 className="text-2xl font-light">
                    {editingProductId ? "Editar produto" : "Cadastrar produto"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Preencha os campos e salve.
                  </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="produto-nome">Nome do produto</Label>
                    <Input
                      id="produto-nome"
                      value={productForm.name}
                      onChange={(event) =>
                        setProductForm((prev) => ({ ...prev, name: event.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="produto-descricao">Descrição</Label>
                    <Textarea
                      id="produto-descricao"
                      value={productForm.description}
                      onChange={(event) =>
                        setProductForm((prev) => ({ ...prev, description: event.target.value }))
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="produto-imagens">
                      <span className="inline-flex items-center gap-2">
                        <ImageIcon className="size-4" />
                        Imagens do produto
                      </span>
                    </Label>
                    <Input
                      id="produto-imagens"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(event) =>
                        handleUploadImages(event.target.files, productForm.id, (urls) =>
                          setProductForm((prev) => ({
                            ...prev,
                            images: [...prev.images, ...urls],
                            imageCover: prev.imageCover || urls[0] || "",
                          })),
                        )
                      }
                    />
                    {isUploading && (
                      <p className="text-xs text-muted-foreground">A fazer upload das imagens...</p>
                    )}
                    {productForm.images.length > 0 && (
                      <div className="grid gap-2">
                        <p className="text-xs text-muted-foreground">Defina a imagem principal:</p>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {productForm.images.map((url) => (
                            <div key={url} className="rounded-md border overflow-hidden">
                              <div className="aspect-video bg-muted">
                                <img src={url} alt="Preview" className="h-full w-full object-cover" />
                              </div>
                              <div className="flex items-center justify-between gap-2 p-2 text-xs">
                                <button
                                  type="button"
                                  className="text-primary"
                                  onClick={() => handleSetCover(url)}
                                >
                                  {productForm.imageCover === url ? "Capa" : "Definir capa"}
                                </button>
                                <button type="button" className="text-destructive" onClick={() => handleRemoveImage(url)}>
                                  Remover
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label>Tipo de valor</Label>
                    <div className="flex flex-wrap gap-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="tipo-valor"
                          checked={productForm.valueType === "preco"}
                          onChange={() =>
                            setProductForm((prev) => ({ ...prev, valueType: "preco" }))
                          }
                        />
                        Preço fixo
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="tipo-valor"
                          checked={productForm.valueType === "sob_consulta"}
                          onChange={() =>
                            setProductForm((prev) => ({ ...prev, valueType: "sob_consulta" }))
                          }
                        />
                        Sob consulta
                      </label>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="produto-valor">Valor</Label>
                    <Input
                      id="produto-valor"
                      type="number"
                      disabled={productForm.valueType === "sob_consulta"}
                      value={productForm.value}
                      onChange={(event) =>
                        setProductForm((prev) => ({ ...prev, value: event.target.value }))
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="produto-categoria">Categoria</Label>
                    <select
                      id="produto-categoria"
                      className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                      value={productForm.categoryId}
                      onChange={(event) =>
                        setProductForm((prev) => ({ ...prev, categoryId: event.target.value }))
                      }
                    >
                      {orderedCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button className={buttonPrimary} onClick={handleSubmitProduct}>
                      <Save className="mr-2 size-4" />
                      {editingProductId ? "Salvar alterações" : "Salvar produto"}
                    </Button>
                    {editingProductId && (
                      <Button variant="outline" className={buttonOutline} onClick={resetProductForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                  </div>
                  <div className="rounded-lg border border-black/10 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      Preview
                    </p>
                    <div className="rounded-md border overflow-hidden">
                      <div className="h-40 bg-muted">
                        <img
                          src={productForm.imageCover || productForm.images?.[0] || "/placeholder.svg"}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium">
                          {productForm.name || "Nome do produto"}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {productForm.description || "Descrição do produto..."}
                        </p>
                        <p className="mt-2 text-xs font-semibold">
                          {productForm.valueType === "sob_consulta"
                            ? "Sob consulta"
                            : productForm.value || "Sob consulta"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </Card>
              </div>
            )}

            {view === "categorias" && (
              <Card className="p-6 space-y-6 bg-white text-black border-black/10">
                <div>
                  <h2 className="text-2xl font-light">Categorias</h2>
                  <p className="text-sm text-muted-foreground">
                    Edite o nome, oculte no site, reordene (arrastar) ou elimine. Eliminar remove também todos os
                    produtos dessa categoria.
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="nova-categoria">Nova categoria</Label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      id="nova-categoria"
                      value={categoryForm}
                      onChange={(event) => setCategoryForm(event.target.value)}
                      placeholder="Ex: Revestimentos"
                    />
                    <Button className={buttonPrimary} onClick={handleCreateCategory}>
                      <Tag className="mr-2 size-4" />
                      Criar
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="categoria-filtro">
                    <span className="inline-flex items-center gap-2">
                      <Filter className="size-4" />
                      Filtrar categorias
                    </span>
                  </Label>
                  <Input
                    id="categoria-filtro"
                    value={categoryFilter}
                    onChange={(event) => setCategoryFilter(event.target.value)}
                    placeholder="Digite para filtrar..."
                  />
                </div>
                <div className="space-y-2">
                  {orderedCategories
                    .filter((category) =>
                      category.name.toLowerCase().includes(categoryFilter.trim().toLowerCase()) ||
                      category.id.toLowerCase().includes(categoryFilter.trim().toLowerCase()),
                    )
                    .map((category) => {
                      const productCount = catalog.products.filter((p) => p.categoryId === category.id).length
                      const isEditing = editingCategory?.id === category.id
                      return (
                        <div
                          key={category.id}
                          draggable={!isEditing}
                          onDragStart={() => setDragCategoryId(category.id)}
                          onDragEnd={() => setDragCategoryId(null)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleReorderCategories(category.id)}
                          className="flex flex-col gap-3 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex min-w-0 flex-1 items-start gap-2">
                            <button
                              type="button"
                              className="mt-1 cursor-grab text-muted-foreground active:cursor-grabbing"
                              aria-label="Arrastar para reordenar"
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <GripVertical className="size-5" />
                            </button>
                            <div className="min-w-0 flex-1">
                              {isEditing ? (
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                  <Input
                                    value={editingCategory.name}
                                    onChange={(e) =>
                                      setEditingCategory((prev) =>
                                        prev ? { ...prev, name: e.target.value } : prev,
                                      )
                                    }
                                    className="max-w-md"
                                    placeholder="Nome da categoria"
                                  />
                                  <div className="flex flex-wrap gap-2">
                                    <Button
                                      size="sm"
                                      className={buttonPrimary}
                                      onClick={() => {
                                        const n = editingCategory.name.trim()
                                        if (!n) return
                                        updateCategory(editingCategory.id, { name: n })
                                        setEditingCategory(null)
                                      }}
                                    >
                                      Guardar
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className={buttonOutline}
                                      onClick={() => setEditingCategory(null)}
                                    >
                                      Cancelar
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-medium">{category.name}</span>
                                    {!category.visible && (
                                      <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-900">
                                        Oculta no site
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                                    id: {category.id} · {productCount} produto{productCount === 1 ? "" : "s"}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          {!isEditing && (
                            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                className={buttonOutline}
                                title={category.visible ? "Ocultar no catálogo público" : "Mostrar no catálogo"}
                                onClick={() =>
                                  updateCategory(category.id, { visible: !category.visible })
                                }
                              >
                                {category.visible ? (
                                  <>
                                    <EyeOff className="mr-1 size-4" />
                                    Ocultar
                                  </>
                                ) : (
                                  <>
                                    <Eye className="mr-1 size-4" />
                                    Mostrar
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className={buttonOutline}
                                onClick={() => setEditingCategory({ id: category.id, name: category.name })}
                              >
                                <Pencil className="mr-1 size-4" />
                                Editar nome
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className={buttonOutline}
                                onClick={() =>
                                  addToCategoryId === category.id
                                    ? setAddToCategoryId(null)
                                    : setAddToCategoryId(category.id)
                                }
                              >
                                {addToCategoryId === category.id ? (
                                  <>
                                    <X className="mr-1 size-4" />
                                    Fechar
                                  </>
                                ) : (
                                  <>
                                    <PlusCircle className="mr-1 size-4" />
                                    Adicionar produto
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={() =>
                                  setConfirmCategoryDelete({ categoryId: category.id, name: category.name })
                                }
                              >
                                <Trash2 className="mr-1 size-4" />
                                Eliminar
                              </Button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
                {addToCategoryId && (
                  <div className="rounded-md border p-4 space-y-3 bg-black/5">
                    <p className="text-sm font-medium">
                      Adicionar produtos em: {categoryNameMap.get(addToCategoryId) || addToCategoryId}
                    </p>
                    <Input
                      value={addProductSearch}
                      onChange={(event) => setAddProductSearch(event.target.value)}
                      placeholder="Pesquisar produto..."
                    />
                    <div className="max-h-72 overflow-auto border rounded-md divide-y bg-white">
                      {filteredAddProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-black/5"
                          onClick={() => handleAddExistingToCategory(product.id, addToCategoryId)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {product.id} • {categoryNameMap.get(product.categoryId) || product.categoryId}
                              </p>
                            </div>
                            <PlusCircle className="size-4 text-green-600" />
                          </div>
                        </button>
                      ))}
                      {filteredAddProducts.length === 0 && (
                        <div className="px-3 py-4 text-sm text-muted-foreground">
                          Nenhum produto encontrado.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )}

            {view === "config" && (
              <Card className="p-6 space-y-4 bg-white text-black border-black/10">
                <div>
                  <h2 className="text-2xl font-light">Configurações</h2>
                  <p className="text-sm text-muted-foreground">
                    Informações gerais do catálogo.
                  </p>
                </div>
                <div className="grid gap-2 text-sm">
                  <p>Total de categorias: {catalog.categories.length}</p>
                  <p>Total de produtos: {catalog.products.length}</p>
                  <p>Catálogo salvo automaticamente.</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className={buttonOutline} onClick={handleExportCatalog}>
                    Exportar catálogo (JSON)
                  </Button>
                  <Button
                    variant="outline"
                    className={`${buttonOutline} ml-2`}
                    onClick={handleExportCsv}
                  >
                    Exportar CSV (Excel)
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover produto?</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover "{confirmDelete?.name}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmRemoveProduct}>
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!confirmCategoryDelete} onOpenChange={() => setConfirmCategoryDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar categoria?</DialogTitle>
            <DialogDescription>
              Tem a certeza de que pretende eliminar a categoria «{confirmCategoryDelete?.name}»? Todos os produtos
              associados a esta categoria serão removidos permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmCategoryDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRemoveCategory}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
