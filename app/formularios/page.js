'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormulariosList from '@/components/FormulariosList/FormulariosList'

export default function FormulariosPage() {
  const [activeTab, setActiveTab] = useState("cotizaAqui")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Gestión de Formularios</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="cotizaAqui">Cotiza Aquí</TabsTrigger>
          <TabsTrigger value="contactanos">Contáctanos</TabsTrigger>
          <TabsTrigger value="reclamaAqui">Reclama Aquí</TabsTrigger>
        </TabsList>
        <TabsContent value="cotizaAqui">
          <FormulariosList type="cotizaAqui" />
        </TabsContent>
        <TabsContent value="contactanos">
          <FormulariosList type="contactanos" />
        </TabsContent>
        <TabsContent value="reclamaAqui">
          <FormulariosList type="reclamaAqui" />
        </TabsContent>
      </Tabs>
    </div>
  )
}