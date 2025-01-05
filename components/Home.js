'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateProduct from './CreateProduct'
import DeleteProduct from './DeleteProduct'
import EditProduct from './EditProduct'
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [activeTab, setActiveTab] = useState("create")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestión de Productos</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="create">Crear</TabsTrigger>
          <TabsTrigger value="delete">Eliminar</TabsTrigger>
          <TabsTrigger value="edit">Editar</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateProduct />
        </TabsContent>
        <TabsContent value="delete">
          <DeleteProduct />
        </TabsContent>
        <TabsContent value="edit">
          <EditProduct />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

