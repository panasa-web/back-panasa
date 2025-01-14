// ruta: app/productos/page.js
'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCatalog from '@/components/ProductCatalog'
import CreateProductForm from '@/components/CreateProductForm'
import Link from 'next/link'

export default function ProductosPage() {
  const [activeTab, setActiveTab] = useState("catalog")

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://i.ibb.co/85x9PHS/Dise-o-sin-t-tulo.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30 fixed" 
        />
      </div>
      <div className="relative container mx-auto px-4 py-8">
        <Link href="/" className="absolute top-4 left-4 text-blue-900 hover:underline">
          &larr; Regresar a la página principal
        </Link>
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">Gestión de Productos</h1>
        <div className="max-w-4xl mx-auto mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="justify-center">
              <TabsTrigger value="catalog">Catálogo</TabsTrigger>
              <TabsTrigger value="create">Crear Producto</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="w-full max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="catalog">
              <div className="w-full p-4 rounded-lg shadow-lg">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <ProductCatalog />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="create">
              <div className="w-full p-4 rounded-lg shadow-lg">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <CreateProductForm />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}