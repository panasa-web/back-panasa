// ruta: app/productos/page.js
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCatalog from '@/components/ProductCatalog'
import CreateProductForm from '@/components/CreateProductForm'

export default function ProductosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Gestión de Productos</h1>
      <Tabs defaultValue="catalog">
        <TabsList className="mb-4">
          <TabsTrigger value="catalog">Catálogo</TabsTrigger>
          <TabsTrigger value="create">Crear Producto</TabsTrigger>
        </TabsList>
        <TabsContent value="catalog">
          <ProductCatalog />
        </TabsContent>
        <TabsContent value="create">
          <CreateProductForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}