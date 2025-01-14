// ruta: app/formularios/page.js
'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormulariosList from '@/components/FormulariosList/FormulariosList'
import Link from 'next/link'

export default function FormulariosPage() {
  const [activeTab, setActiveTab] = useState("cotizaAqui")

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white relative flex items-center justify-center">
      <div className="absolute inset-0">
        <img 
          src="https://i.ibb.co/85x9PHS/Dise-o-sin-t-tulo.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30" 
        />
      </div>
      <div className="relative container mx-auto px-4 py-8">
        <Link href="/" className="absolute top-4 left-4 text-blue-900 hover:underline">
          &larr; Regresar a la página principal
        </Link>
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">Gestión de Formularios</h1>
        <div className="max-w-4xl mx-auto mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex w-full pr-8"> 
              <TabsTrigger value="cotizaAqui" className="flex-1 text-lg py-1 px-6 text-center" >Cotiza Aquí</TabsTrigger>
              <TabsTrigger value="contactanos" className="flex-1 text-lg py-1 px-6 text-center">Contáctanos</TabsTrigger>
              <TabsTrigger value="reclamaAqui" className="flex-1 text-lg py-1 px-6 text-center">Peticiones/Quejas/Reclamos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="w-full max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="cotizaAqui">
              <div className="p-4 rounded-lg shadow-lg">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <FormulariosList type="cotizaAqui" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contactanos">
              <div className="p-4 rounded-lg shadow-lg">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <FormulariosList type="contactanos" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reclamaAqui">
              <div className="p-4 rounded-lg shadow-lg">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <FormulariosList type="reclamaAqui" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}