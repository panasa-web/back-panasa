// ruta: components/Home.js
'use client'

import Link from 'next/link'
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
          Gestión de Datos Panasa
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/productos">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white border-sky-200">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                  Gestionar Productos
                </h2>
                <p className="text-sky-700">
                  Administra el catálogo de productos
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/formularios">
  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white border-sky-200">
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-blue-800 mb-3">
        Gestionar Formularios
      </h2>
      <p className="text-sky-700">
        Visualiza y administra los formularios recibidos
      </p>
    </div>
  </Card>
</Link>
        </div>
      </div>
    </main>
  )
}